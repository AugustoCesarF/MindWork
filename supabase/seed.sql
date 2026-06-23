-- ============================================================
-- MindWork — Seed Data para Demonstração
-- ============================================================
-- Executar APÓS schema.sql e rls-policies.sql
-- ATENÇÃO: Este seed cria dados fictícios para demonstração.
-- Os usuários de auth devem ser criados via Supabase Dashboard ou API.
-- Este script popula apenas as tabelas de dados.
-- ============================================================

-- ===================== ORGANIZAÇÕES =====================

INSERT INTO organizations (id, nome, cnpj, plano, codigo_convite, ciclo_checkin, created_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'TechNova Soluções', '12.345.678/0001-90', 'pro', 'TECH01', 'quinzenal', NOW() - INTERVAL '90 days'),
  ('22222222-2222-2222-2222-222222222222', 'Construtora Horizonte', '98.765.432/0001-10', 'starter', 'HORIZ2', 'mensal', NOW() - INTERVAL '60 days'),
  ('33333333-3333-3333-3333-333333333333', 'Clínica Bem Viver', '55.555.555/0001-55', 'enterprise', 'BEMVI3', 'semanal', NOW() - INTERVAL '45 days');

-- ===================== PERFIS (sem auth.users - serão criados via app) =====================
-- NOTA: Para o seed funcionar com auth, os IDs abaixo devem corresponder a users criados no Supabase Auth.
-- Em modo demo, podemos inserir diretamente na tabela profiles desabilitando a FK temporariamente,
-- ou criar os users via API.

-- Para uso em apresentações, vamos criar os perfis com IDs fixos.
-- Administradores RH
INSERT INTO profiles (id, org_id, role, nome, email, cargo, departamento, codigo_anonimo, created_at) VALUES
  ('aaaa0001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'admin_rh', 'Carlos Silva', 'admin@technova.com', 'Diretor de RH', 'RH', 'ADM00001', NOW() - INTERVAL '90 days'),
  ('aaaa0002-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'admin_rh', 'Fernanda Costa', 'admin@horizonte.com', 'Gerente de Pessoas', 'RH', 'ADM00002', NOW() - INTERVAL '60 days'),
  ('aaaa0003-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', 'admin_rh', 'Dr. Ricardo Mendes', 'admin@bemviver.com', 'Diretor Clínico', 'Administração', 'ADM00003', NOW() - INTERVAL '45 days');

-- Psicóloga
INSERT INTO profiles (id, org_id, role, nome, email, cargo, departamento, codigo_anonimo, created_at) VALUES
  ('bbbb0001-0000-0000-0000-000000000001', NULL, 'psicologo', 'Maria Luiza Santos', 'psicologo@mindwork.com', 'Psicóloga Clínica - CRP 06/123456', NULL, 'PSI00001', NOW() - INTERVAL '90 days');

-- Super Admin
INSERT INTO profiles (id, org_id, role, nome, email, cargo, departamento, codigo_anonimo, created_at) VALUES
  ('cccc0001-0000-0000-0000-000000000001', NULL, 'super_admin', 'Admin MindWork', 'superadmin@mindwork.com', 'Administrador', NULL, 'SUP00001', NOW() - INTERVAL '90 days');

-- ===================== FUNCIONÁRIOS - TechNova (45 funcionários) =====================

INSERT INTO profiles (id, org_id, role, nome, email, cargo, departamento, codigo_anonimo, created_at) VALUES
  ('f0010001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-001', NULL, NULL, 'Engenharia', 'TN2A8F01', NOW() - INTERVAL '85 days'),
  ('f0010002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-002', NULL, NULL, 'Engenharia', 'TN3B9G02', NOW() - INTERVAL '85 days'),
  ('f0010003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-003', NULL, NULL, 'Engenharia', 'TN4C1H03', NOW() - INTERVAL '84 days'),
  ('f0010004-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-004', NULL, NULL, 'Engenharia', 'TN5D2J04', NOW() - INTERVAL '84 days'),
  ('f0010005-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-005', NULL, NULL, 'Engenharia', 'TN6E3K05', NOW() - INTERVAL '83 days'),
  ('f0010006-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-006', NULL, NULL, 'Engenharia', 'TN7F4L06', NOW() - INTERVAL '83 days'),
  ('f0010007-0000-0000-0000-000000000007', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-007', NULL, NULL, 'Engenharia', 'TN8G5M07', NOW() - INTERVAL '82 days'),
  ('f0010008-0000-0000-0000-000000000008', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-008', NULL, NULL, 'Engenharia', 'TN9H6N08', NOW() - INTERVAL '82 days'),
  ('f0010009-0000-0000-0000-000000000009', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-009', NULL, NULL, 'Produto', 'TN1J7P09', NOW() - INTERVAL '81 days'),
  ('f0010010-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-010', NULL, NULL, 'Produto', 'TN2K8Q10', NOW() - INTERVAL '81 days'),
  ('f0010011-0000-0000-0000-000000000011', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-011', NULL, NULL, 'Produto', 'TN3L9R11', NOW() - INTERVAL '80 days'),
  ('f0010012-0000-0000-0000-000000000012', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-012', NULL, NULL, 'Produto', 'TN4M1S12', NOW() - INTERVAL '80 days'),
  ('f0010013-0000-0000-0000-000000000013', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-013', NULL, NULL, 'Produto', 'TN5N2T13', NOW() - INTERVAL '79 days'),
  ('f0010014-0000-0000-0000-000000000014', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-014', NULL, NULL, 'Comercial', 'TN6P3U14', NOW() - INTERVAL '79 days'),
  ('f0010015-0000-0000-0000-000000000015', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-015', NULL, NULL, 'Comercial', 'TN7Q4V15', NOW() - INTERVAL '78 days'),
  ('f0010016-0000-0000-0000-000000000016', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-016', NULL, NULL, 'Comercial', 'TN8R5W16', NOW() - INTERVAL '78 days'),
  ('f0010017-0000-0000-0000-000000000017', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-017', NULL, NULL, 'Comercial', 'TN9S6X17', NOW() - INTERVAL '77 days'),
  ('f0010018-0000-0000-0000-000000000018', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-018', NULL, NULL, 'Comercial', 'TN1T7Y18', NOW() - INTERVAL '77 days'),
  ('f0010019-0000-0000-0000-000000000019', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-019', NULL, NULL, 'RH', 'TN2U8Z19', NOW() - INTERVAL '76 days'),
  ('f0010020-0000-0000-0000-000000000020', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-020', NULL, NULL, 'RH', 'TN3V9A20', NOW() - INTERVAL '76 days'),
  ('f0010021-0000-0000-0000-000000000021', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-021', NULL, NULL, 'Financeiro', 'TN4W1B21', NOW() - INTERVAL '75 days'),
  ('f0010022-0000-0000-0000-000000000022', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-022', NULL, NULL, 'Financeiro', 'TN5X2C22', NOW() - INTERVAL '75 days'),
  ('f0010023-0000-0000-0000-000000000023', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-023', NULL, NULL, 'Financeiro', 'TN6Y3D23', NOW() - INTERVAL '74 days'),
  ('f0010024-0000-0000-0000-000000000024', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-024', NULL, NULL, 'Suporte', 'TN7Z4E24', NOW() - INTERVAL '74 days'),
  ('f0010025-0000-0000-0000-000000000025', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-025', NULL, NULL, 'Suporte', 'TN8A5F25', NOW() - INTERVAL '73 days'),
  ('f0010026-0000-0000-0000-000000000026', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-026', NULL, NULL, 'Suporte', 'TN9B6G26', NOW() - INTERVAL '73 days'),
  ('f0010027-0000-0000-0000-000000000027', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-027', NULL, NULL, 'Suporte', 'TN1C7H27', NOW() - INTERVAL '72 days'),
  ('f0010028-0000-0000-0000-000000000028', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-028', NULL, NULL, 'Suporte', 'TN2D8J28', NOW() - INTERVAL '72 days'),
  ('f0010029-0000-0000-0000-000000000029', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-029', NULL, NULL, 'Marketing', 'TN3E9K29', NOW() - INTERVAL '71 days'),
  ('f0010030-0000-0000-0000-000000000030', '11111111-1111-1111-1111-111111111111', 'funcionario', 'Func. TN-030', NULL, NULL, 'Marketing', 'TN4F1L30', NOW() - INTERVAL '71 days');

-- ===================== FUNCIONÁRIOS - Construtora Horizonte (30 funcionários) =====================

INSERT INTO profiles (id, org_id, role, nome, email, cargo, departamento, codigo_anonimo, created_at) VALUES
  ('f0020001-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-001', NULL, NULL, 'Obras', 'CH2A8F01', NOW() - INTERVAL '55 days'),
  ('f0020002-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-002', NULL, NULL, 'Obras', 'CH3B9G02', NOW() - INTERVAL '55 days'),
  ('f0020003-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-003', NULL, NULL, 'Obras', 'CH4C1H03', NOW() - INTERVAL '54 days'),
  ('f0020004-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-004', NULL, NULL, 'Obras', 'CH5D2J04', NOW() - INTERVAL '54 days'),
  ('f0020005-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-005', NULL, NULL, 'Obras', 'CH6E3K05', NOW() - INTERVAL '53 days'),
  ('f0020006-0000-0000-0000-000000000006', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-006', NULL, NULL, 'Obras', 'CH7F4L06', NOW() - INTERVAL '53 days'),
  ('f0020007-0000-0000-0000-000000000007', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-007', NULL, NULL, 'Obras', 'CH8G5M07', NOW() - INTERVAL '52 days'),
  ('f0020008-0000-0000-0000-000000000008', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-008', NULL, NULL, 'Obras', 'CH9H6N08', NOW() - INTERVAL '52 days'),
  ('f0020009-0000-0000-0000-000000000009', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-009', NULL, NULL, 'Engenharia', 'CH1J7P09', NOW() - INTERVAL '51 days'),
  ('f0020010-0000-0000-0000-000000000010', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-010', NULL, NULL, 'Engenharia', 'CH2K8Q10', NOW() - INTERVAL '51 days'),
  ('f0020011-0000-0000-0000-000000000011', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-011', NULL, NULL, 'Engenharia', 'CH3L9R11', NOW() - INTERVAL '50 days'),
  ('f0020012-0000-0000-0000-000000000012', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-012', NULL, NULL, 'Administrativo', 'CH4M1S12', NOW() - INTERVAL '50 days'),
  ('f0020013-0000-0000-0000-000000000013', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-013', NULL, NULL, 'Administrativo', 'CH5N2T13', NOW() - INTERVAL '49 days'),
  ('f0020014-0000-0000-0000-000000000014', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-014', NULL, NULL, 'Administrativo', 'CH6P3U14', NOW() - INTERVAL '49 days'),
  ('f0020015-0000-0000-0000-000000000015', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-015', NULL, NULL, 'Segurança', 'CH7Q4V15', NOW() - INTERVAL '48 days'),
  ('f0020016-0000-0000-0000-000000000016', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-016', NULL, NULL, 'Segurança', 'CH8R5W16', NOW() - INTERVAL '48 days'),
  ('f0020017-0000-0000-0000-000000000017', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-017', NULL, NULL, 'Segurança', 'CH9S6X17', NOW() - INTERVAL '47 days'),
  ('f0020018-0000-0000-0000-000000000018', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-018', NULL, NULL, 'Financeiro', 'CH1T7Y18', NOW() - INTERVAL '47 days'),
  ('f0020019-0000-0000-0000-000000000019', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-019', NULL, NULL, 'Financeiro', 'CH2U8Z19', NOW() - INTERVAL '46 days'),
  ('f0020020-0000-0000-0000-000000000020', '22222222-2222-2222-2222-222222222222', 'funcionario', 'Func. CH-020', NULL, NULL, 'RH', 'CH3V9A20', NOW() - INTERVAL '46 days');

-- ===================== FUNCIONÁRIOS - Clínica Bem Viver (20 funcionários) =====================

INSERT INTO profiles (id, org_id, role, nome, email, cargo, departamento, codigo_anonimo, created_at) VALUES
  ('f0030001-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-001', NULL, NULL, 'Atendimento', 'BV2A8F01', NOW() - INTERVAL '40 days'),
  ('f0030002-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-002', NULL, NULL, 'Atendimento', 'BV3B9G02', NOW() - INTERVAL '40 days'),
  ('f0030003-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-003', NULL, NULL, 'Atendimento', 'BV4C1H03', NOW() - INTERVAL '39 days'),
  ('f0030004-0000-0000-0000-000000000004', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-004', NULL, NULL, 'Atendimento', 'BV5D2J04', NOW() - INTERVAL '39 days'),
  ('f0030005-0000-0000-0000-000000000005', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-005', NULL, NULL, 'Enfermagem', 'BV6E3K05', NOW() - INTERVAL '38 days'),
  ('f0030006-0000-0000-0000-000000000006', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-006', NULL, NULL, 'Enfermagem', 'BV7F4L06', NOW() - INTERVAL '38 days'),
  ('f0030007-0000-0000-0000-000000000007', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-007', NULL, NULL, 'Enfermagem', 'BV8G5M07', NOW() - INTERVAL '37 days'),
  ('f0030008-0000-0000-0000-000000000008', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-008', NULL, NULL, 'Enfermagem', 'BV9H6N08', NOW() - INTERVAL '37 days'),
  ('f0030009-0000-0000-0000-000000000009', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-009', NULL, NULL, 'Médico', 'BV1J7P09', NOW() - INTERVAL '36 days'),
  ('f0030010-0000-0000-0000-000000000010', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-010', NULL, NULL, 'Médico', 'BV2K8Q10', NOW() - INTERVAL '36 days'),
  ('f0030011-0000-0000-0000-000000000011', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-011', NULL, NULL, 'Médico', 'BV3L9R11', NOW() - INTERVAL '35 days'),
  ('f0030012-0000-0000-0000-000000000012', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-012', NULL, NULL, 'Administrativo', 'BV4M1S12', NOW() - INTERVAL '35 days'),
  ('f0030013-0000-0000-0000-000000000013', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-013', NULL, NULL, 'Administrativo', 'BV5N2T13', NOW() - INTERVAL '34 days'),
  ('f0030014-0000-0000-0000-000000000014', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-014', NULL, NULL, 'Administrativo', 'BV6P3U14', NOW() - INTERVAL '34 days'),
  ('f0030015-0000-0000-0000-000000000015', '33333333-3333-3333-3333-333333333333', 'funcionario', 'Func. BV-015', NULL, NULL, 'Limpeza', 'BV7Q4V15', NOW() - INTERVAL '33 days');

-- ===================== CHECK-INS - TechNova (distribuição realista) =====================
-- Ciclo 1: ~8 semanas atrás
-- Ciclo 2: ~6 semanas atrás  
-- Ciclo 3: ~4 semanas atrás
-- Ciclo 4: ~2 semanas atrás (atual)

-- Ciclo 1 - TechNova - PHQ-9 (8 semanas atrás)
INSERT INTO checkins (id, employee_id, org_id, tipo_escala, respostas, pontuacao_total, nivel_risco, created_at) VALUES
  (gen_random_uuid(), 'f0010001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,1,0,1,0,0,1,0,0]', 3, 'baixo', NOW() - INTERVAL '56 days'),
  (gen_random_uuid(), 'f0010002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,1,1,2,1,0,1,0,0]', 7, 'baixo', NOW() - INTERVAL '56 days'),
  (gen_random_uuid(), 'f0010003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'phq9', '[2,2,1,2,1,1,2,1,0]', 12, 'moderado', NOW() - INTERVAL '55 days'),
  (gen_random_uuid(), 'f0010004-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,0,1,1,0,0,0,0,0]', 2, 'baixo', NOW() - INTERVAL '55 days'),
  (gen_random_uuid(), 'f0010005-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,2,2,2,1,1,1,1,0]', 11, 'moderado', NOW() - INTERVAL '55 days'),
  (gen_random_uuid(), 'f0010006-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,1,0,0,1,0,0,0,0]', 2, 'baixo', NOW() - INTERVAL '54 days'),
  (gen_random_uuid(), 'f0010009-0000-0000-0000-000000000009', '11111111-1111-1111-1111-111111111111', 'phq9', '[2,3,2,3,2,2,3,2,1]', 20, 'severo', NOW() - INTERVAL '54 days'),
  (gen_random_uuid(), 'f0010010-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,1,1,1,0,0,1,0,0]', 5, 'baixo', NOW() - INTERVAL '54 days'),
  (gen_random_uuid(), 'f0010014-0000-0000-0000-000000000014', '11111111-1111-1111-1111-111111111111', 'phq9', '[2,2,2,2,2,1,2,1,0]', 14, 'moderado', NOW() - INTERVAL '53 days'),
  (gen_random_uuid(), 'f0010015-0000-0000-0000-000000000015', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,0,0,1,0,0,0,0,0]', 1, 'baixo', NOW() - INTERVAL '53 days'),
  (gen_random_uuid(), 'f0010019-0000-0000-0000-000000000019', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,1,2,1,1,0,1,0,0]', 7, 'baixo', NOW() - INTERVAL '53 days'),
  (gen_random_uuid(), 'f0010021-0000-0000-0000-000000000021', '11111111-1111-1111-1111-111111111111', 'phq9', '[2,2,3,2,1,2,2,1,1]', 16, 'alto', NOW() - INTERVAL '53 days'),
  (gen_random_uuid(), 'f0010024-0000-0000-0000-000000000024', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,1,1,2,1,0,1,0,0]', 7, 'baixo', NOW() - INTERVAL '52 days'),
  (gen_random_uuid(), 'f0010025-0000-0000-0000-000000000025', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,0,0,0,0,0,0,0,0]', 0, 'baixo', NOW() - INTERVAL '52 days'),
  (gen_random_uuid(), 'f0010029-0000-0000-0000-000000000029', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,1,1,1,1,1,1,0,0]', 7, 'baixo', NOW() - INTERVAL '52 days');

-- Ciclo 2 - TechNova - GAD-7 (6 semanas atrás)
INSERT INTO checkins (id, employee_id, org_id, tipo_escala, respostas, pontuacao_total, nivel_risco, created_at) VALUES
  (gen_random_uuid(), 'f0010001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'gad7', '[0,0,1,0,0,0,0]', 1, 'baixo', NOW() - INTERVAL '42 days'),
  (gen_random_uuid(), 'f0010002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'gad7', '[1,1,1,1,0,1,0]', 5, 'moderado', NOW() - INTERVAL '42 days'),
  (gen_random_uuid(), 'f0010003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'gad7', '[2,2,2,2,1,1,1]', 11, 'alto', NOW() - INTERVAL '42 days'),
  (gen_random_uuid(), 'f0010005-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'gad7', '[1,2,1,1,1,1,1]', 8, 'moderado', NOW() - INTERVAL '41 days'),
  (gen_random_uuid(), 'f0010007-0000-0000-0000-000000000007', '11111111-1111-1111-1111-111111111111', 'gad7', '[0,0,0,1,0,0,0]', 1, 'baixo', NOW() - INTERVAL '41 days'),
  (gen_random_uuid(), 'f0010009-0000-0000-0000-000000000009', '11111111-1111-1111-1111-111111111111', 'gad7', '[3,3,3,3,2,3,3]', 20, 'severo', NOW() - INTERVAL '41 days'),
  (gen_random_uuid(), 'f0010010-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', 'gad7', '[0,1,1,0,0,0,0]', 2, 'baixo', NOW() - INTERVAL '40 days'),
  (gen_random_uuid(), 'f0010012-0000-0000-0000-000000000012', '11111111-1111-1111-1111-111111111111', 'gad7', '[1,1,1,1,1,1,1]', 7, 'moderado', NOW() - INTERVAL '40 days'),
  (gen_random_uuid(), 'f0010014-0000-0000-0000-000000000014', '11111111-1111-1111-1111-111111111111', 'gad7', '[2,2,1,2,1,1,1]', 10, 'alto', NOW() - INTERVAL '40 days'),
  (gen_random_uuid(), 'f0010016-0000-0000-0000-000000000016', '11111111-1111-1111-1111-111111111111', 'gad7', '[0,0,0,0,0,0,0]', 0, 'baixo', NOW() - INTERVAL '39 days'),
  (gen_random_uuid(), 'f0010019-0000-0000-0000-000000000019', '11111111-1111-1111-1111-111111111111', 'gad7', '[1,0,1,1,0,0,1]', 4, 'baixo', NOW() - INTERVAL '39 days'),
  (gen_random_uuid(), 'f0010021-0000-0000-0000-000000000021', '11111111-1111-1111-1111-111111111111', 'gad7', '[2,3,2,2,2,2,2]', 15, 'severo', NOW() - INTERVAL '39 days'),
  (gen_random_uuid(), 'f0010024-0000-0000-0000-000000000024', '11111111-1111-1111-1111-111111111111', 'gad7', '[1,1,0,1,0,0,0]', 3, 'baixo', NOW() - INTERVAL '38 days'),
  (gen_random_uuid(), 'f0010026-0000-0000-0000-000000000026', '11111111-1111-1111-1111-111111111111', 'gad7', '[1,1,1,1,1,1,0]', 6, 'moderado', NOW() - INTERVAL '38 days'),
  (gen_random_uuid(), 'f0010028-0000-0000-0000-000000000028', '11111111-1111-1111-1111-111111111111', 'gad7', '[0,0,1,0,0,1,0]', 2, 'baixo', NOW() - INTERVAL '38 days'),
  (gen_random_uuid(), 'f0010030-0000-0000-0000-000000000030', '11111111-1111-1111-1111-111111111111', 'gad7', '[1,1,1,2,1,1,1]', 8, 'moderado', NOW() - INTERVAL '38 days');

-- Ciclo 3 - TechNova - Maslach (4 semanas atrás)
INSERT INTO checkins (id, employee_id, org_id, tipo_escala, respostas, pontuacao_total, nivel_risco, created_at) VALUES
  (gen_random_uuid(), 'f0010001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'maslach', '[1,1,0,0,0,0,1,1,0]', 4, 'baixo', NOW() - INTERVAL '28 days'),
  (gen_random_uuid(), 'f0010002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'maslach', '[2,2,1,1,1,0,1,1,1]', 10, 'moderado', NOW() - INTERVAL '28 days'),
  (gen_random_uuid(), 'f0010003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'maslach', '[3,3,2,2,1,1,2,2,1]', 17, 'moderado', NOW() - INTERVAL '27 days'),
  (gen_random_uuid(), 'f0010004-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'maslach', '[0,1,0,0,0,0,0,0,0]', 1, 'baixo', NOW() - INTERVAL '27 days'),
  (gen_random_uuid(), 'f0010005-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'maslach', '[2,2,2,1,2,1,2,2,1]', 15, 'moderado', NOW() - INTERVAL '27 days'),
  (gen_random_uuid(), 'f0010009-0000-0000-0000-000000000009', '11111111-1111-1111-1111-111111111111', 'maslach', '[4,4,3,3,3,2,3,3,3]', 28, 'severo', NOW() - INTERVAL '26 days'),
  (gen_random_uuid(), 'f0010011-0000-0000-0000-000000000011', '11111111-1111-1111-1111-111111111111', 'maslach', '[1,1,1,0,0,0,1,0,0]', 4, 'baixo', NOW() - INTERVAL '26 days'),
  (gen_random_uuid(), 'f0010014-0000-0000-0000-000000000014', '11111111-1111-1111-1111-111111111111', 'maslach', '[3,3,2,2,2,1,2,2,2]', 19, 'alto', NOW() - INTERVAL '26 days'),
  (gen_random_uuid(), 'f0010017-0000-0000-0000-000000000017', '11111111-1111-1111-1111-111111111111', 'maslach', '[1,2,1,0,1,0,1,1,0]', 7, 'baixo', NOW() - INTERVAL '25 days'),
  (gen_random_uuid(), 'f0010020-0000-0000-0000-000000000020', '11111111-1111-1111-1111-111111111111', 'maslach', '[0,0,0,0,0,0,0,0,0]', 0, 'baixo', NOW() - INTERVAL '25 days'),
  (gen_random_uuid(), 'f0010021-0000-0000-0000-000000000021', '11111111-1111-1111-1111-111111111111', 'maslach', '[3,4,3,2,3,2,3,3,2]', 25, 'alto', NOW() - INTERVAL '25 days'),
  (gen_random_uuid(), 'f0010024-0000-0000-0000-000000000024', '11111111-1111-1111-1111-111111111111', 'maslach', '[1,1,1,0,0,0,1,0,0]', 4, 'baixo', NOW() - INTERVAL '24 days'),
  (gen_random_uuid(), 'f0010029-0000-0000-0000-000000000029', '11111111-1111-1111-1111-111111111111', 'maslach', '[2,1,1,1,1,0,1,1,1]', 9, 'baixo', NOW() - INTERVAL '24 days');

-- Ciclo 4 - TechNova - PHQ-9 (2 semanas atrás - ciclo atual)
INSERT INTO checkins (id, employee_id, org_id, tipo_escala, respostas, pontuacao_total, nivel_risco, created_at) VALUES
  (gen_random_uuid(), 'f0010001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,0,0,1,0,0,0,0,0]', 1, 'baixo', NOW() - INTERVAL '14 days'),
  (gen_random_uuid(), 'f0010002-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,1,2,2,1,1,1,1,0]', 10, 'moderado', NOW() - INTERVAL '14 days'),
  (gen_random_uuid(), 'f0010003-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,2,1,2,1,1,1,1,0]', 10, 'moderado', NOW() - INTERVAL '13 days'),
  (gen_random_uuid(), 'f0010005-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'phq9', '[2,2,2,2,1,1,2,1,0]', 13, 'moderado', NOW() - INTERVAL '13 days'),
  (gen_random_uuid(), 'f0010006-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,0,0,0,1,0,0,0,0]', 1, 'baixo', NOW() - INTERVAL '13 days'),
  (gen_random_uuid(), 'f0010007-0000-0000-0000-000000000007', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,1,1,1,0,0,0,0,0]', 3, 'baixo', NOW() - INTERVAL '12 days'),
  (gen_random_uuid(), 'f0010009-0000-0000-0000-000000000009', '11111111-1111-1111-1111-111111111111', 'phq9', '[2,3,2,3,2,2,2,2,1]', 19, 'alto', NOW() - INTERVAL '12 days'),
  (gen_random_uuid(), 'f0010010-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,1,0,1,0,0,1,0,0]', 3, 'baixo', NOW() - INTERVAL '12 days'),
  (gen_random_uuid(), 'f0010012-0000-0000-0000-000000000012', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,1,1,1,1,0,1,0,0]', 6, 'baixo', NOW() - INTERVAL '11 days'),
  (gen_random_uuid(), 'f0010014-0000-0000-0000-000000000014', '11111111-1111-1111-1111-111111111111', 'phq9', '[2,2,2,3,2,1,2,1,1]', 16, 'alto', NOW() - INTERVAL '11 days'),
  (gen_random_uuid(), 'f0010016-0000-0000-0000-000000000016', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,0,0,0,0,0,0,0,0]', 0, 'baixo', NOW() - INTERVAL '11 days'),
  (gen_random_uuid(), 'f0010017-0000-0000-0000-000000000017', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,1,0,1,0,0,1,0,0]', 4, 'baixo', NOW() - INTERVAL '10 days'),
  (gen_random_uuid(), 'f0010019-0000-0000-0000-000000000019', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,1,1,1,0,0,0,0,0]', 3, 'baixo', NOW() - INTERVAL '10 days'),
  (gen_random_uuid(), 'f0010021-0000-0000-0000-000000000021', '11111111-1111-1111-1111-111111111111', 'phq9', '[2,2,3,2,2,2,2,1,1]', 17, 'alto', NOW() - INTERVAL '10 days'),
  (gen_random_uuid(), 'f0010024-0000-0000-0000-000000000024', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,0,1,1,0,0,0,0,0]', 3, 'baixo', NOW() - INTERVAL '9 days'),
  (gen_random_uuid(), 'f0010025-0000-0000-0000-000000000025', '11111111-1111-1111-1111-111111111111', 'phq9', '[0,0,0,1,0,0,0,0,0]', 1, 'baixo', NOW() - INTERVAL '9 days'),
  (gen_random_uuid(), 'f0010026-0000-0000-0000-000000000026', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,1,1,1,1,0,1,0,0]', 6, 'baixo', NOW() - INTERVAL '9 days'),
  (gen_random_uuid(), 'f0010029-0000-0000-0000-000000000029', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,1,1,1,0,1,1,0,0]', 6, 'baixo', NOW() - INTERVAL '8 days'),
  (gen_random_uuid(), 'f0010030-0000-0000-0000-000000000030', '11111111-1111-1111-1111-111111111111', 'phq9', '[1,2,1,1,1,0,1,0,0]', 7, 'baixo', NOW() - INTERVAL '8 days');

-- ===================== CHECK-INS - Construtora Horizonte =====================

INSERT INTO checkins (id, employee_id, org_id, tipo_escala, respostas, pontuacao_total, nivel_risco, created_at) VALUES
  (gen_random_uuid(), 'f0020001-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'phq9', '[2,2,2,3,2,1,2,2,0]', 16, 'alto', NOW() - INTERVAL '30 days'),
  (gen_random_uuid(), 'f0020002-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'phq9', '[1,1,1,2,1,0,1,0,0]', 7, 'baixo', NOW() - INTERVAL '30 days'),
  (gen_random_uuid(), 'f0020003-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'phq9', '[0,0,1,1,0,0,0,0,0]', 2, 'baixo', NOW() - INTERVAL '29 days'),
  (gen_random_uuid(), 'f0020005-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', 'phq9', '[3,3,3,3,2,2,3,2,1]', 22, 'severo', NOW() - INTERVAL '29 days'),
  (gen_random_uuid(), 'f0020006-0000-0000-0000-000000000006', '22222222-2222-2222-2222-222222222222', 'phq9', '[1,1,1,1,0,0,1,0,0]', 5, 'baixo', NOW() - INTERVAL '29 days'),
  (gen_random_uuid(), 'f0020008-0000-0000-0000-000000000008', '22222222-2222-2222-2222-222222222222', 'phq9', '[2,2,1,2,1,1,1,1,0]', 11, 'moderado', NOW() - INTERVAL '28 days'),
  (gen_random_uuid(), 'f0020009-0000-0000-0000-000000000009', '22222222-2222-2222-2222-222222222222', 'phq9', '[0,1,0,1,0,0,0,0,0]', 2, 'baixo', NOW() - INTERVAL '28 days'),
  (gen_random_uuid(), 'f0020010-0000-0000-0000-000000000010', '22222222-2222-2222-2222-222222222222', 'phq9', '[1,1,2,2,1,1,1,1,0]', 10, 'moderado', NOW() - INTERVAL '28 days'),
  (gen_random_uuid(), 'f0020012-0000-0000-0000-000000000012', '22222222-2222-2222-2222-222222222222', 'phq9', '[0,0,0,0,0,0,0,0,0]', 0, 'baixo', NOW() - INTERVAL '27 days'),
  (gen_random_uuid(), 'f0020015-0000-0000-0000-000000000015', '22222222-2222-2222-2222-222222222222', 'phq9', '[2,2,2,2,1,1,2,1,0]', 13, 'moderado', NOW() - INTERVAL '27 days'),
  (gen_random_uuid(), 'f0020018-0000-0000-0000-000000000018', '22222222-2222-2222-2222-222222222222', 'phq9', '[0,1,0,1,0,0,0,0,0]', 2, 'baixo', NOW() - INTERVAL '27 days'),
  (gen_random_uuid(), 'f0020020-0000-0000-0000-000000000020', '22222222-2222-2222-2222-222222222222', 'phq9', '[1,1,1,1,1,0,1,0,0]', 6, 'baixo', NOW() - INTERVAL '27 days');

-- Ciclo recente Horizonte
INSERT INTO checkins (id, employee_id, org_id, tipo_escala, respostas, pontuacao_total, nivel_risco, created_at) VALUES
  (gen_random_uuid(), 'f0020001-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'gad7', '[2,2,2,3,2,2,2]', 15, 'severo', NOW() - INTERVAL '7 days'),
  (gen_random_uuid(), 'f0020002-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'gad7', '[0,1,1,0,0,0,0]', 2, 'baixo', NOW() - INTERVAL '7 days'),
  (gen_random_uuid(), 'f0020003-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'gad7', '[0,0,0,1,0,0,0]', 1, 'baixo', NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), 'f0020005-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', 'gad7', '[3,3,2,3,2,2,3]', 18, 'severo', NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), 'f0020008-0000-0000-0000-000000000008', '22222222-2222-2222-2222-222222222222', 'gad7', '[1,1,2,1,1,1,1]', 8, 'moderado', NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), 'f0020010-0000-0000-0000-000000000010', '22222222-2222-2222-2222-222222222222', 'gad7', '[1,1,1,1,0,1,0]', 5, 'moderado', NOW() - INTERVAL '5 days'),
  (gen_random_uuid(), 'f0020012-0000-0000-0000-000000000012', '22222222-2222-2222-2222-222222222222', 'gad7', '[0,0,0,0,0,0,0]', 0, 'baixo', NOW() - INTERVAL '5 days'),
  (gen_random_uuid(), 'f0020015-0000-0000-0000-000000000015', '22222222-2222-2222-2222-222222222222', 'gad7', '[2,1,1,2,1,1,1]', 9, 'moderado', NOW() - INTERVAL '5 days'),
  (gen_random_uuid(), 'f0020017-0000-0000-0000-000000000017', '22222222-2222-2222-2222-222222222222', 'gad7', '[1,0,1,1,0,1,0]', 4, 'baixo', NOW() - INTERVAL '5 days');

-- ===================== CHECK-INS - Clínica Bem Viver =====================

INSERT INTO checkins (id, employee_id, org_id, tipo_escala, respostas, pontuacao_total, nivel_risco, created_at) VALUES
  (gen_random_uuid(), 'f0030001-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'maslach', '[3,3,3,2,2,1,2,2,2]', 20, 'alto', NOW() - INTERVAL '21 days'),
  (gen_random_uuid(), 'f0030002-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', 'maslach', '[2,2,1,1,0,0,1,1,1]', 9, 'baixo', NOW() - INTERVAL '21 days'),
  (gen_random_uuid(), 'f0030003-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', 'maslach', '[1,1,1,0,0,0,0,1,0]', 4, 'baixo', NOW() - INTERVAL '20 days'),
  (gen_random_uuid(), 'f0030005-0000-0000-0000-000000000005', '33333333-3333-3333-3333-333333333333', 'maslach', '[3,4,3,2,3,2,3,3,2]', 25, 'alto', NOW() - INTERVAL '20 days'),
  (gen_random_uuid(), 'f0030006-0000-0000-0000-000000000006', '33333333-3333-3333-3333-333333333333', 'maslach', '[2,2,2,1,1,1,2,1,1]', 13, 'moderado', NOW() - INTERVAL '20 days'),
  (gen_random_uuid(), 'f0030007-0000-0000-0000-000000000007', '33333333-3333-3333-3333-333333333333', 'maslach', '[4,4,4,3,3,3,4,4,3]', 32, 'severo', NOW() - INTERVAL '19 days'),
  (gen_random_uuid(), 'f0030009-0000-0000-0000-000000000009', '33333333-3333-3333-3333-333333333333', 'maslach', '[1,1,0,0,0,0,0,0,0]', 2, 'baixo', NOW() - INTERVAL '19 days'),
  (gen_random_uuid(), 'f0030010-0000-0000-0000-000000000010', '33333333-3333-3333-3333-333333333333', 'maslach', '[2,2,2,1,1,1,1,1,1]', 12, 'moderado', NOW() - INTERVAL '19 days'),
  (gen_random_uuid(), 'f0030012-0000-0000-0000-000000000012', '33333333-3333-3333-3333-333333333333', 'maslach', '[0,0,0,0,0,0,0,0,0]', 0, 'baixo', NOW() - INTERVAL '18 days'),
  (gen_random_uuid(), 'f0030014-0000-0000-0000-000000000014', '33333333-3333-3333-3333-333333333333', 'maslach', '[1,2,1,1,0,0,1,1,0]', 7, 'baixo', NOW() - INTERVAL '18 days');

-- Ciclo recente Bem Viver
INSERT INTO checkins (id, employee_id, org_id, tipo_escala, respostas, pontuacao_total, nivel_risco, created_at) VALUES
  (gen_random_uuid(), 'f0030001-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'phq9', '[2,2,2,2,1,1,2,1,0]', 13, 'moderado', NOW() - INTERVAL '7 days'),
  (gen_random_uuid(), 'f0030002-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', 'phq9', '[0,1,0,1,0,0,0,0,0]', 2, 'baixo', NOW() - INTERVAL '7 days'),
  (gen_random_uuid(), 'f0030005-0000-0000-0000-000000000005', '33333333-3333-3333-3333-333333333333', 'phq9', '[2,3,2,3,2,2,2,2,1]', 19, 'alto', NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), 'f0030006-0000-0000-0000-000000000006', '33333333-3333-3333-3333-333333333333', 'phq9', '[1,1,1,2,1,0,1,0,0]', 7, 'baixo', NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), 'f0030007-0000-0000-0000-000000000007', '33333333-3333-3333-3333-333333333333', 'phq9', '[3,3,3,3,2,3,3,2,2]', 24, 'severo', NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), 'f0030009-0000-0000-0000-000000000009', '33333333-3333-3333-3333-333333333333', 'phq9', '[0,0,0,0,0,0,0,0,0]', 0, 'baixo', NOW() - INTERVAL '5 days'),
  (gen_random_uuid(), 'f0030011-0000-0000-0000-000000000011', '33333333-3333-3333-3333-333333333333', 'phq9', '[1,1,2,1,1,1,1,0,0]', 8, 'baixo', NOW() - INTERVAL '5 days'),
  (gen_random_uuid(), 'f0030013-0000-0000-0000-000000000013', '33333333-3333-3333-3333-333333333333', 'phq9', '[1,1,1,1,0,0,1,0,0]', 5, 'baixo', NOW() - INTERVAL '5 days'),
  (gen_random_uuid(), 'f0030015-0000-0000-0000-000000000015', '33333333-3333-3333-3333-333333333333', 'phq9', '[2,2,2,2,2,1,2,1,1]', 15, 'alto', NOW() - INTERVAL '4 days');

-- ===================== ALERTAS DE RISCO =====================
-- Criados manualmente para seed (em produção, o trigger os cria automaticamente)

INSERT INTO risk_alerts (id, org_id, employee_codigo_anonimo, departamento, nivel_risco, escala_origem, pontuacao, status, created_at) VALUES
  -- TechNova
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN1J7P09', 'Produto', 'severo', 'phq9', 20, 'visualizado', NOW() - INTERVAL '54 days'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN4W1B21', 'Financeiro', 'alto', 'phq9', 16, 'encaminhado', NOW() - INTERVAL '53 days'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN1J7P09', 'Produto', 'severo', 'gad7', 20, 'visualizado', NOW() - INTERVAL '41 days'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN4W1B21', 'Financeiro', 'severo', 'gad7', 15, 'visualizado', NOW() - INTERVAL '39 days'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN6P3U14', 'Comercial', 'alto', 'gad7', 10, 'novo', NOW() - INTERVAL '40 days'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN1J7P09', 'Produto', 'severo', 'maslach', 28, 'novo', NOW() - INTERVAL '26 days'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN6P3U14', 'Comercial', 'alto', 'maslach', 19, 'novo', NOW() - INTERVAL '26 days'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN4W1B21', 'Financeiro', 'alto', 'maslach', 25, 'novo', NOW() - INTERVAL '25 days'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN1J7P09', 'Produto', 'alto', 'phq9', 19, 'novo', NOW() - INTERVAL '12 days'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN6P3U14', 'Comercial', 'alto', 'phq9', 16, 'novo', NOW() - INTERVAL '11 days'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'TN4W1B21', 'Financeiro', 'alto', 'phq9', 17, 'novo', NOW() - INTERVAL '10 days'),
  -- Horizonte
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'CH2A8F01', 'Obras', 'alto', 'phq9', 16, 'visualizado', NOW() - INTERVAL '30 days'),
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'CH6E3K05', 'Obras', 'severo', 'phq9', 22, 'encaminhado', NOW() - INTERVAL '29 days'),
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'CH2A8F01', 'Obras', 'severo', 'gad7', 15, 'novo', NOW() - INTERVAL '7 days'),
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 'CH6E3K05', 'Obras', 'severo', 'gad7', 18, 'novo', NOW() - INTERVAL '6 days'),
  -- Bem Viver
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'BV6E3K05', 'Enfermagem', 'alto', 'maslach', 25, 'visualizado', NOW() - INTERVAL '20 days'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'BV8G5M07', 'Enfermagem', 'severo', 'maslach', 32, 'encaminhado', NOW() - INTERVAL '19 days'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'BV2A8F01', 'Atendimento', 'alto', 'maslach', 20, 'novo', NOW() - INTERVAL '21 days'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'BV6E3K05', 'Enfermagem', 'alto', 'phq9', 19, 'novo', NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'BV8G5M07', 'Enfermagem', 'severo', 'phq9', 24, 'novo', NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 'BV7Q4V15', 'Limpeza', 'alto', 'phq9', 15, 'novo', NOW() - INTERVAL '4 days');

-- ===================== ENCAMINHAMENTOS PARA PSICÓLOGO =====================

INSERT INTO psychologist_referrals (id, employee_codigo_anonimo, org_id, status, observacoes, created_at, updated_at) VALUES
  (gen_random_uuid(), 'TN1J7P09', '11111111-1111-1111-1111-111111111111', 'contatado', 'Paciente apresenta sinais de esgotamento severo. Agendada primeira sessão para avaliação.', NOW() - INTERVAL '50 days', NOW() - INTERVAL '48 days'),
  (gen_random_uuid(), 'TN4W1B21', '11111111-1111-1111-1111-111111111111', 'concluido', 'Acompanhamento de 4 sessões realizado. Paciente apresentou melhora significativa com técnicas de gestão de estresse.', NOW() - INTERVAL '45 days', NOW() - INTERVAL '20 days'),
  (gen_random_uuid(), 'CH6E3K05', '22222222-2222-2222-2222-222222222222', 'contatado', 'Primeiro contato realizado. Funcionário relata alta pressão no setor de obras.', NOW() - INTERVAL '25 days', NOW() - INTERVAL '23 days'),
  (gen_random_uuid(), 'BV8G5M07', '33333333-3333-3333-3333-333333333333', 'pendente', NULL, NOW() - INTERVAL '18 days', NOW() - INTERVAL '18 days'),
  (gen_random_uuid(), 'TN1J7P09', '11111111-1111-1111-1111-111111111111', 'pendente', NULL, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
  (gen_random_uuid(), 'BV6E3K05', '33333333-3333-3333-3333-333333333333', 'pendente', NULL, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days');
