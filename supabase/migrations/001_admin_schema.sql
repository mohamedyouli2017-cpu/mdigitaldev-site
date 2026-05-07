-- ============================================================
-- MDigitalDev Admin Dashboard — Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. LEADS ────────────────────────────────────────────────
CREATE TABLE leads (
  id               UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  name             TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  phone            TEXT,
  business_type    TEXT,
  selected_plan    TEXT        CHECK (selected_plan IN ('smart_starter','business_auto_pilot','enterprise','not_sure')),
  project_details  TEXT,
  budget_range     TEXT,
  status           TEXT        DEFAULT 'new'     CHECK (status   IN ('new','contacted','qualified','won','lost')),
  source           TEXT        DEFAULT 'website' CHECK (source   IN ('website','calendly','whatsapp','email','chatbot','other')),
  notes            TEXT,
  language         TEXT        DEFAULT 'en'      CHECK (language IN ('en','ar','fr')),
  assigned_to      TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_leads_status     ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_email      ON leads(email);

-- ── 2. CLIENTS ──────────────────────────────────────────────
CREATE TABLE clients (
  id                   UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id              UUID        REFERENCES leads(id) ON DELETE SET NULL,
  name                 TEXT        NOT NULL,
  email                TEXT        NOT NULL UNIQUE,
  phone                TEXT,
  company_name         TEXT,
  plan                 TEXT        NOT NULL CHECK (plan IN ('smart_starter','business_auto_pilot','enterprise')),
  setup_fee_paid       BOOLEAN     DEFAULT FALSE,
  setup_fee_amount     DECIMAL(10,2),
  monthly_maintenance  DECIMAL(10,2) NOT NULL,
  commitment_months    INTEGER     NOT NULL,
  start_date           DATE        NOT NULL,
  end_date             DATE,
  status               TEXT        DEFAULT 'active' CHECK (status IN ('active','paused','cancelled','completed')),
  vps_assigned         TEXT,
  workflow_ids         JSONB       DEFAULT '[]'::jsonb,
  notes                TEXT,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_plan   ON clients(plan);

-- ── 3. MEETINGS ─────────────────────────────────────────────
CREATE TABLE meetings (
  id                UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  calendly_event_id TEXT        UNIQUE,
  lead_id           UUID        REFERENCES leads(id)   ON DELETE SET NULL,
  client_id         UUID        REFERENCES clients(id) ON DELETE SET NULL,
  title             TEXT        NOT NULL,
  invitee_name      TEXT        NOT NULL,
  invitee_email     TEXT        NOT NULL,
  scheduled_at      TIMESTAMPTZ NOT NULL,
  duration_minutes  INTEGER     DEFAULT 15,
  status            TEXT        DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','cancelled','no_show','rescheduled')),
  meeting_link      TEXT,
  notes             TEXT,
  recording_url     TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_meetings_scheduled_at ON meetings(scheduled_at);
CREATE INDEX idx_meetings_status       ON meetings(status);

-- ── 4. PAYMENTS ─────────────────────────────────────────────
CREATE TABLE payments (
  id              UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id       UUID        NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  type            TEXT        NOT NULL CHECK (type IN ('setup','maintenance','addon','refund')),
  amount          DECIMAL(10,2) NOT NULL,
  currency        TEXT        DEFAULT 'USD',
  status          TEXT        DEFAULT 'pending' CHECK (status IN ('pending','paid','failed','refunded','cancelled')),
  payment_method  TEXT,
  invoice_number  TEXT,
  invoice_url     TEXT,
  description     TEXT,
  paid_at         TIMESTAMPTZ,
  due_date        DATE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_payments_client_id ON payments(client_id);
CREATE INDEX idx_payments_status    ON payments(status);
CREATE INDEX idx_payments_due_date  ON payments(due_date);

-- ── 5. CHATBOT_CONVERSATIONS ─────────────────────────────────
CREATE TABLE chatbot_conversations (
  id               UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id       TEXT        UNIQUE NOT NULL,
  visitor_id       TEXT,
  messages         JSONB       DEFAULT '[]'::jsonb,
  language         TEXT        DEFAULT 'en',
  lead_captured    BOOLEAN     DEFAULT FALSE,
  lead_id          UUID        REFERENCES leads(id) ON DELETE SET NULL,
  user_agent       TEXT,
  ip_address       TEXT,
  total_messages   INTEGER     DEFAULT 0,
  total_tokens     INTEGER     DEFAULT 0,
  cost_usd         DECIMAL(10,4) DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  ended_at         TIMESTAMPTZ
);
CREATE INDEX idx_chatbot_session_id  ON chatbot_conversations(session_id);
CREATE INDEX idx_chatbot_created_at  ON chatbot_conversations(created_at DESC);

-- ── 6. WORKFLOWS ─────────────────────────────────────────────
CREATE TABLE workflows (
  id               UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  name             TEXT        NOT NULL,
  description      TEXT,
  client_id        UUID        REFERENCES clients(id) ON DELETE CASCADE,
  n8n_workflow_id  TEXT,
  n8n_webhook_url  TEXT,
  status           TEXT        DEFAULT 'active' CHECK (status IN ('active','paused','error','archived')),
  last_execution   TIMESTAMPTZ,
  last_error       TEXT,
  execution_count  INTEGER     DEFAULT 0,
  error_count      INTEGER     DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_workflows_client_id ON workflows(client_id);
CREATE INDEX idx_workflows_status    ON workflows(status);

-- ── 7. TASKS ─────────────────────────────────────────────────
CREATE TABLE tasks (
  id                UUID        DEFAULT uuid_generate_v4() PRIMARY KEY,
  title             TEXT        NOT NULL,
  description       TEXT,
  type              TEXT        CHECK (type IN ('lead_followup','maintenance','content','meeting','invoice','other')),
  priority          TEXT        DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
  status            TEXT        DEFAULT 'todo'   CHECK (status   IN ('todo','in_progress','done','cancelled')),
  due_date          TIMESTAMPTZ,
  assigned_to       TEXT,
  related_lead_id   UUID        REFERENCES leads(id)   ON DELETE SET NULL,
  related_client_id UUID        REFERENCES clients(id) ON DELETE SET NULL,
  created_by        TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  completed_at      TIMESTAMPTZ,
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_tasks_status      ON tasks(status);
CREATE INDEX idx_tasks_due_date    ON tasks(due_date);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);

-- ── 8. EMAIL_TEMPLATES ───────────────────────────────────────
CREATE TABLE email_templates (
  id         UUID    DEFAULT uuid_generate_v4() PRIMARY KEY,
  name       TEXT    NOT NULL,
  subject    TEXT    NOT NULL,
  body       TEXT    NOT NULL,
  type       TEXT    CHECK (type IN ('welcome','followup','invoice','meeting_confirmation','lead_response','other')),
  language   TEXT    DEFAULT 'en' CHECK (language IN ('en','ar','fr')),
  variables  JSONB   DEFAULT '[]'::jsonb,
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 9. USERS (Admin Team) ────────────────────────────────────
CREATE TABLE users (
  id          TEXT    PRIMARY KEY,
  email       TEXT    NOT NULL UNIQUE,
  name        TEXT,
  role        TEXT    DEFAULT 'viewer' CHECK (role IN ('owner','admin','manager','viewer')),
  avatar_url  TEXT,
  phone       TEXT,
  preferences JSONB   DEFAULT '{"language":"ar","theme":"dark"}'::jsonb,
  last_login  TIMESTAMPTZ,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 10. ACTIVITY_LOG ─────────────────────────────────────────
CREATE TABLE activity_log (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     TEXT REFERENCES users(id) ON DELETE SET NULL,
  action      TEXT NOT NULL CHECK (action IN ('created','updated','deleted','viewed','login','logout')),
  entity_type TEXT NOT NULL,
  entity_id   TEXT,
  changes     JSONB,
  ip_address  TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_activity_user_id    ON activity_log(user_id);
CREATE INDEX idx_activity_entity     ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_created_at ON activity_log(created_at DESC);

-- ── AUTO-UPDATE updated_at ───────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at          BEFORE UPDATE ON leads           FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at        BEFORE UPDATE ON clients         FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meetings_updated_at       BEFORE UPDATE ON meetings        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at       BEFORE UPDATE ON payments        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at      BEFORE UPDATE ON workflows       FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at          BEFORE UPDATE ON tasks           FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON email_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at          BEFORE UPDATE ON users           FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
ALTER TABLE leads                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients               ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings              ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments              ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows             ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates       ENABLE ROW LEVEL SECURITY;
ALTER TABLE users                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log          ENABLE ROW LEVEL SECURITY;

-- Service role gets full access (used by Next.js server-side)
CREATE POLICY "service_leads"     ON leads                 FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_clients"   ON clients               FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_meetings"  ON meetings              FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_payments"  ON payments              FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_chatbot"   ON chatbot_conversations FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_workflows" ON workflows             FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_tasks"     ON tasks                 FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_templates" ON email_templates       FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_users"     ON users                 FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_activity"  ON activity_log         FOR ALL USING (auth.role() = 'service_role');
