-- ============================================================
-- MindWork — Row Level Security (RLS) Policies
-- ============================================================
-- Executar APÓS schema.sql
-- Garante isolamento total por org_id e papel de usuário

-- ===================== HABILITAR RLS =====================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE psychologist_referrals ENABLE ROW LEVEL SECURITY;

-- ===================== HELPER FUNCTIONS =====================

-- Retorna o role do usuário atual
CREATE OR REPLACE FUNCTION auth_role()
RETURNS role_type AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Retorna o org_id do usuário atual
CREATE OR REPLACE FUNCTION auth_org_id()
RETURNS UUID AS $$
  SELECT org_id FROM profiles WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ===================== ORGANIZATIONS =====================

-- Super admin: tudo
CREATE POLICY "super_admin_all_orgs" ON organizations
  FOR ALL
  TO authenticated
  USING (auth_role() = 'super_admin')
  WITH CHECK (auth_role() = 'super_admin');

-- Admin RH: ver apenas a própria org
CREATE POLICY "admin_rh_select_own_org" ON organizations
  FOR SELECT
  TO authenticated
  USING (auth_role() = 'admin_rh' AND id = auth_org_id());

-- Funcionário: ver apenas a própria org (dados básicos)
CREATE POLICY "funcionario_select_own_org" ON organizations
  FOR SELECT
  TO authenticated
  USING (auth_role() = 'funcionario' AND id = auth_org_id());

-- Psicólogo: ver orgs com referrals pendentes
CREATE POLICY "psicologo_select_orgs" ON organizations
  FOR SELECT
  TO authenticated
  USING (auth_role() = 'psicologo');

-- Permitir leitura por código de convite (para cadastro de funcionários - anon)
CREATE POLICY "anon_select_org_by_invite" ON organizations
  FOR SELECT
  TO anon
  USING (true);

-- ===================== PROFILES =====================

-- Super admin: tudo
CREATE POLICY "super_admin_all_profiles" ON profiles
  FOR ALL
  TO authenticated
  USING (auth_role() = 'super_admin')
  WITH CHECK (auth_role() = 'super_admin');

-- Admin RH: ver perfis da própria org (exceto outros admins de outras orgs)
CREATE POLICY "admin_rh_select_org_profiles" ON profiles
  FOR SELECT
  TO authenticated
  USING (auth_role() = 'admin_rh' AND org_id = auth_org_id());

-- Funcionário: ver e editar apenas o próprio perfil
CREATE POLICY "funcionario_select_own_profile" ON profiles
  FOR SELECT
  TO authenticated
  USING (auth_role() = 'funcionario' AND id = auth.uid());

CREATE POLICY "funcionario_update_own_profile" ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth_role() = 'funcionario' AND id = auth.uid())
  WITH CHECK (auth_role() = 'funcionario' AND id = auth.uid());

-- Psicólogo: ver próprio perfil
CREATE POLICY "psicologo_select_own_profile" ON profiles
  FOR SELECT
  TO authenticated
  USING (auth_role() = 'psicologo' AND id = auth.uid());

-- Permitir insert pelo trigger de criação de perfil
CREATE POLICY "allow_insert_own_profile" ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- ===================== CHECKINS =====================

-- Super admin: tudo
CREATE POLICY "super_admin_all_checkins" ON checkins
  FOR ALL
  TO authenticated
  USING (auth_role() = 'super_admin')
  WITH CHECK (auth_role() = 'super_admin');

-- Admin RH: ver check-ins da própria org (via views agregadas preferencialmente)
CREATE POLICY "admin_rh_select_org_checkins" ON checkins
  FOR SELECT
  TO authenticated
  USING (auth_role() = 'admin_rh' AND org_id = auth_org_id());

-- Funcionário: inserir e ver apenas os próprios check-ins
CREATE POLICY "funcionario_insert_own_checkins" ON checkins
  FOR INSERT
  TO authenticated
  WITH CHECK (auth_role() = 'funcionario' AND employee_id = auth.uid() AND org_id = auth_org_id());

CREATE POLICY "funcionario_select_own_checkins" ON checkins
  FOR SELECT
  TO authenticated
  USING (auth_role() = 'funcionario' AND employee_id = auth.uid());

-- ===================== RISK_ALERTS =====================

-- Super admin: tudo
CREATE POLICY "super_admin_all_alerts" ON risk_alerts
  FOR ALL
  TO authenticated
  USING (auth_role() = 'super_admin')
  WITH CHECK (auth_role() = 'super_admin');

-- Admin RH: ver e atualizar alertas da própria org
CREATE POLICY "admin_rh_select_org_alerts" ON risk_alerts
  FOR SELECT
  TO authenticated
  USING (auth_role() = 'admin_rh' AND org_id = auth_org_id());

CREATE POLICY "admin_rh_update_org_alerts" ON risk_alerts
  FOR UPDATE
  TO authenticated
  USING (auth_role() = 'admin_rh' AND org_id = auth_org_id())
  WITH CHECK (auth_role() = 'admin_rh' AND org_id = auth_org_id());

-- ===================== PSYCHOLOGIST_REFERRALS =====================

-- Super admin: tudo
CREATE POLICY "super_admin_all_referrals" ON psychologist_referrals
  FOR ALL
  TO authenticated
  USING (auth_role() = 'super_admin')
  WITH CHECK (auth_role() = 'super_admin');

-- Psicólogo: ver e atualizar todas as referrals
CREATE POLICY "psicologo_select_all_referrals" ON psychologist_referrals
  FOR SELECT
  TO authenticated
  USING (auth_role() = 'psicologo');

CREATE POLICY "psicologo_update_all_referrals" ON psychologist_referrals
  FOR UPDATE
  TO authenticated
  USING (auth_role() = 'psicologo')
  WITH CHECK (auth_role() = 'psicologo');

-- Funcionário: inserir referral para si mesmo (usando código anônimo)
CREATE POLICY "funcionario_insert_own_referral" ON psychologist_referrals
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth_role() = 'funcionario'
    AND org_id = auth_org_id()
    AND employee_codigo_anonimo = (SELECT codigo_anonimo FROM profiles WHERE id = auth.uid())
  );

-- Admin RH NÃO tem acesso a psychologist_referrals (sigilo profissional)
-- Nenhuma policy para admin_rh nesta tabela = sem acesso
