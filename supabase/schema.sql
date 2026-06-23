-- ============================================================
-- MindWork — Schema Completo (Supabase / PostgreSQL)
-- ============================================================

-- ===================== ENUMS =====================

CREATE TYPE plano_type AS ENUM ('starter', 'pro', 'enterprise');
CREATE TYPE ciclo_type AS ENUM ('semanal', 'quinzenal', 'mensal');
CREATE TYPE role_type AS ENUM ('super_admin', 'admin_rh', 'funcionario', 'psicologo');
CREATE TYPE escala_type AS ENUM ('phq9', 'gad7', 'maslach');
CREATE TYPE risco_type AS ENUM ('baixo', 'moderado', 'alto', 'severo');
CREATE TYPE alerta_status_type AS ENUM ('novo', 'visualizado', 'encaminhado');
CREATE TYPE referral_status_type AS ENUM ('pendente', 'contatado', 'concluido');

-- ===================== TABELAS =====================

-- Organizações (empresas clientes)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  plano plano_type NOT NULL DEFAULT 'starter',
  codigo_convite TEXT UNIQUE NOT NULL DEFAULT upper(substring(md5(random()::text) from 1 for 6)),
  ciclo_checkin ciclo_type NOT NULL DEFAULT 'quinzenal',
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Perfis de usuário (vinculados ao auth.users do Supabase)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  role role_type NOT NULL DEFAULT 'funcionario',
  nome TEXT NOT NULL,
  email TEXT,
  cargo TEXT,
  departamento TEXT,
  codigo_anonimo TEXT NOT NULL DEFAULT upper(substring(md5(random()::text || now()::text) from 1 for 8)),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices para profiles
CREATE INDEX idx_profiles_org_id ON profiles(org_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_codigo_anonimo ON profiles(codigo_anonimo);

-- Check-ins (respostas de escalas)
CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  tipo_escala escala_type NOT NULL,
  respostas JSONB NOT NULL DEFAULT '[]'::jsonb,
  pontuacao_total INTEGER NOT NULL DEFAULT 0,
  nivel_risco risco_type NOT NULL DEFAULT 'baixo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices para checkins
CREATE INDEX idx_checkins_employee_id ON checkins(employee_id);
CREATE INDEX idx_checkins_org_id ON checkins(org_id);
CREATE INDEX idx_checkins_created_at ON checkins(created_at DESC);
CREATE INDEX idx_checkins_nivel_risco ON checkins(nivel_risco);

-- Alertas de risco
CREATE TABLE risk_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  employee_codigo_anonimo TEXT NOT NULL,
  departamento TEXT,
  nivel_risco risco_type NOT NULL,
  escala_origem escala_type NOT NULL,
  pontuacao INTEGER NOT NULL DEFAULT 0,
  status alerta_status_type NOT NULL DEFAULT 'novo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices para risk_alerts
CREATE INDEX idx_risk_alerts_org_id ON risk_alerts(org_id);
CREATE INDEX idx_risk_alerts_status ON risk_alerts(status);
CREATE INDEX idx_risk_alerts_created_at ON risk_alerts(created_at DESC);

-- Encaminhamentos para psicólogo
CREATE TABLE psychologist_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_codigo_anonimo TEXT NOT NULL,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  status referral_status_type NOT NULL DEFAULT 'pendente',
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices para psychologist_referrals
CREATE INDEX idx_referrals_org_id ON psychologist_referrals(org_id);
CREATE INDEX idx_referrals_status ON psychologist_referrals(status);

-- ===================== VIEWS (para Dashboard RH anonimizado) =====================

-- Resumo de risco por organização (agregado)
CREATE OR REPLACE VIEW v_risk_summary AS
SELECT
  c.org_id,
  c.nivel_risco,
  COUNT(*) AS total,
  ROUND(
    COUNT(*)::numeric / NULLIF(SUM(COUNT(*)) OVER (PARTITION BY c.org_id), 0) * 100,
    1
  ) AS percentual
FROM checkins c
WHERE c.created_at >= NOW() - INTERVAL '30 days'
GROUP BY c.org_id, c.nivel_risco;

-- Risco por departamento
CREATE OR REPLACE VIEW v_department_risk AS
SELECT
  c.org_id,
  p.departamento,
  c.nivel_risco,
  COUNT(*) AS total,
  ROUND(AVG(c.pontuacao_total), 1) AS pontuacao_media
FROM checkins c
JOIN profiles p ON c.employee_id = p.id
WHERE c.created_at >= NOW() - INTERVAL '30 days'
  AND p.departamento IS NOT NULL
GROUP BY c.org_id, p.departamento, c.nivel_risco;

-- Tendência temporal (por semana)
CREATE OR REPLACE VIEW v_trend_data AS
SELECT
  c.org_id,
  DATE_TRUNC('week', c.created_at) AS semana,
  c.tipo_escala,
  ROUND(AVG(c.pontuacao_total), 1) AS pontuacao_media,
  COUNT(*) AS total_respostas,
  ROUND(
    COUNT(*) FILTER (WHERE c.nivel_risco IN ('alto', 'severo'))::numeric /
    NULLIF(COUNT(*), 0) * 100,
    1
  ) AS pct_risco_elevado
FROM checkins c
GROUP BY c.org_id, DATE_TRUNC('week', c.created_at), c.tipo_escala
ORDER BY semana DESC;

-- Taxa de adesão
CREATE OR REPLACE VIEW v_adherence_rate AS
SELECT
  o.id AS org_id,
  o.nome AS org_nome,
  COUNT(DISTINCT p.id) AS total_funcionarios,
  COUNT(DISTINCT c.employee_id) AS responderam,
  ROUND(
    COUNT(DISTINCT c.employee_id)::numeric / NULLIF(COUNT(DISTINCT p.id), 0) * 100,
    1
  ) AS taxa_adesao
FROM organizations o
LEFT JOIN profiles p ON p.org_id = o.id AND p.role = 'funcionario'
LEFT JOIN checkins c ON c.employee_id = p.id AND c.created_at >= NOW() - INTERVAL '30 days'
GROUP BY o.id, o.nome;

-- ===================== FUNCTIONS =====================

-- Função para criar alerta automaticamente quando check-in tem risco alto/severo
CREATE OR REPLACE FUNCTION fn_create_risk_alert()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.nivel_risco IN ('alto', 'severo') THEN
    INSERT INTO risk_alerts (org_id, employee_codigo_anonimo, departamento, nivel_risco, escala_origem, pontuacao)
    SELECT
      NEW.org_id,
      p.codigo_anonimo,
      p.departamento,
      NEW.nivel_risco,
      NEW.tipo_escala,
      NEW.pontuacao_total
    FROM profiles p
    WHERE p.id = NEW.employee_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER tr_checkin_risk_alert
  AFTER INSERT ON checkins
  FOR EACH ROW
  EXECUTE FUNCTION fn_create_risk_alert();

-- Função para atualizar updated_at em referrals
CREATE OR REPLACE FUNCTION fn_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_referral_updated
  BEFORE UPDATE ON psychologist_referrals
  FOR EACH ROW
  EXECUTE FUNCTION fn_update_timestamp();
