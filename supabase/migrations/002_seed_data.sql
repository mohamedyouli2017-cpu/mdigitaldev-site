-- ============================================================
-- MDigitalDev Admin Dashboard — Demo Seed Data
-- Run AFTER 001_admin_schema.sql
-- ============================================================

-- ── LEADS ────────────────────────────────────────────────────
INSERT INTO leads (name, email, phone, business_type, selected_plan, project_details, budget_range, status, source, language, created_at) VALUES
  ('Ahmed Al-Rashid',   'ahmed@alhilal-restaurant.com', '+966501234567', 'Restaurant',  'business_auto_pilot', 'Need an online ordering system with WhatsApp automation for our restaurant chain.',     '$1,000 – $3,000', 'qualified',  'website',  'ar', NOW() - INTERVAL '5 days'),
  ('Sophie Dupont',     'sophie@maison-luxe.fr',        '+33612345678',  'E-commerce',  'enterprise',          'High-end fashion boutique needing full e-commerce + AI personalisation layer.',         '$3,000 – $5,000', 'contacted',  'calendly', 'fr', NOW() - INTERVAL '3 days'),
  ('Carlos Mendez',     'carlos@realty-pro.com',        '+12025551234',  'Real Estate', 'smart_starter',       'Simple landing page to capture seller leads for my real estate business.',               'Under $1,000',    'new',        'whatsapp', 'en', NOW() - INTERVAL '1 day'),
  ('Fatima Al-Zahra',   'fatima@healthplus.ma',         '+212661234567', 'Healthcare',  'business_auto_pilot', 'Patient booking + automated reminders + WhatsApp chatbot for our clinic network.',     '$1,000 – $3,000', 'won',        'website',  'ar', NOW() - INTERVAL '12 days'),
  ('James Thornton',    'james@corporatehub.co.uk',     '+447912345678', 'Corporate',   'enterprise',          'Enterprise intranet with AI document search, HR automation, and executive dashboard.',  '$5,000+',         'lost',       'email',    'en', NOW() - INTERVAL '20 days');

-- ── CLIENTS (convert won lead to client) ─────────────────────
INSERT INTO clients (lead_id, name, email, phone, company_name, plan, setup_fee_paid, setup_fee_amount, monthly_maintenance, commitment_months, start_date, end_date, status, notes) VALUES
  ((SELECT id FROM leads WHERE email = 'fatima@healthplus.ma'),
   'Fatima Al-Zahra', 'fatima@healthplus.ma', '+212661234567', 'HealthPlus Clinics', 'business_auto_pilot', TRUE,  1800.00, 297.00, 6,  '2026-02-01', '2026-08-01', 'active',  'Paying on time, very happy with the chatbot.'),
  (NULL, 'Hassan Benali',  'hassan@automaroc.ma',    '+212666543210', 'AutoMaroc',          'smart_starter',      TRUE,   497.00,  97.00,  3,  '2026-03-15', '2026-06-15', 'active',  'Small auto parts shop, simple landing page.'),
  (NULL, 'Nour Khalil',    'nour@nour-events.com',   '+212677891234', 'Nour Events',        'enterprise',         TRUE,  4800.00, 797.00, 12, '2026-01-01', '2027-01-01', 'active',  'Event management company, full AI ecosystem.');

-- ── MEETINGS ─────────────────────────────────────────────────
INSERT INTO meetings (lead_id, title, invitee_name, invitee_email, scheduled_at, duration_minutes, status, notes) VALUES
  ((SELECT id FROM leads WHERE email = 'ahmed@alhilal-restaurant.com'),
   '15-min Discovery Call', 'Ahmed Al-Rashid', 'ahmed@alhilal-restaurant.com', NOW() + INTERVAL '2 days',  15, 'scheduled', 'Interested in WhatsApp automation for ordering.'),
  ((SELECT id FROM leads WHERE email = 'sophie@maison-luxe.fr'),
   '15-min Discovery Call', 'Sophie Dupont',   'sophie@maison-luxe.fr',        NOW() + INTERVAL '4 days',  15, 'scheduled', 'Wants demo of e-commerce AI layer.'),
  (NULL, 'Monthly Check-in — HealthPlus', 'Fatima Al-Zahra', 'fatima@healthplus.ma', NOW() + INTERVAL '7 days',  30, 'scheduled', 'Monthly review — discuss Phase 2 features.'),
  ((SELECT id FROM leads WHERE email = 'carlos@realty-pro.com'),
   '15-min Discovery Call', 'Carlos Mendez',   'carlos@realty-pro.com',        NOW() - INTERVAL '2 days',  15, 'completed', 'Good call, sent proposal.'),
  (NULL, 'Onboarding Call — AutoMaroc', 'Hassan Benali', 'hassan@automaroc.ma', NOW() - INTERVAL '8 days', 60, 'completed', 'Onboarding completed, site launched.');

-- ── PAYMENTS ─────────────────────────────────────────────────
INSERT INTO payments (client_id, type, amount, currency, status, description, paid_at, due_date) VALUES
  -- HealthPlus
  ((SELECT id FROM clients WHERE email = 'fatima@healthplus.ma'), 'setup',       1800.00, 'USD', 'paid',    'Business Auto-Pilot setup fee',       '2026-02-01', '2026-02-01'),
  ((SELECT id FROM clients WHERE email = 'fatima@healthplus.ma'), 'maintenance',  297.00, 'USD', 'paid',    'Monthly maintenance — February 2026', '2026-02-28', '2026-02-28'),
  ((SELECT id FROM clients WHERE email = 'fatima@healthplus.ma'), 'maintenance',  297.00, 'USD', 'paid',    'Monthly maintenance — March 2026',    '2026-03-31', '2026-03-31'),
  ((SELECT id FROM clients WHERE email = 'fatima@healthplus.ma'), 'maintenance',  297.00, 'USD', 'paid',    'Monthly maintenance — April 2026',    '2026-04-30', '2026-04-30'),
  ((SELECT id FROM clients WHERE email = 'fatima@healthplus.ma'), 'maintenance',  297.00, 'USD', 'pending', 'Monthly maintenance — May 2026',      NULL,         '2026-05-31'),
  -- AutoMaroc
  ((SELECT id FROM clients WHERE email = 'hassan@automaroc.ma'),  'setup',        497.00, 'USD', 'paid',    'Smart Starter setup fee',             '2026-03-15', '2026-03-15'),
  ((SELECT id FROM clients WHERE email = 'hassan@automaroc.ma'),  'maintenance',   97.00, 'USD', 'paid',    'Monthly maintenance — March 2026',    '2026-03-31', '2026-03-31'),
  ((SELECT id FROM clients WHERE email = 'hassan@automaroc.ma'),  'maintenance',   97.00, 'USD', 'paid',    'Monthly maintenance — April 2026',    '2026-04-30', '2026-04-30'),
  ((SELECT id FROM clients WHERE email = 'hassan@automaroc.ma'),  'maintenance',   97.00, 'USD', 'pending', 'Monthly maintenance — May 2026',      NULL,         '2026-05-31'),
  -- Nour Events
  ((SELECT id FROM clients WHERE email = 'nour@nour-events.com'), 'setup',       4800.00, 'USD', 'paid',    'Enterprise AI Elite setup fee',       '2026-01-01', '2026-01-01'),
  ((SELECT id FROM clients WHERE email = 'nour@nour-events.com'), 'maintenance',  797.00, 'USD', 'paid',    'Monthly maintenance — Jan–Apr 2026',  '2026-04-30', '2026-04-30'),
  ((SELECT id FROM clients WHERE email = 'nour@nour-events.com'), 'maintenance',  797.00, 'USD', 'pending', 'Monthly maintenance — May 2026',      NULL,         '2026-05-31');

-- ── WORKFLOWS ────────────────────────────────────────────────
INSERT INTO workflows (name, description, client_id, status, execution_count, error_count, last_execution) VALUES
  ('HealthPlus Patient Booking', 'Automated booking confirmation + reminder via WhatsApp', (SELECT id FROM clients WHERE email = 'fatima@healthplus.ma'), 'active', 1247, 3, NOW() - INTERVAL '2 hours'),
  ('AutoMaroc Lead Capture',     'Capture website leads → Supabase → WhatsApp notify',    (SELECT id FROM clients WHERE email = 'hassan@automaroc.ma'),  'active',  342, 1, NOW() - INTERVAL '6 hours'),
  ('Nour Events CRM Sync',       'Event enquiry → CRM → auto-response + task creation',   (SELECT id FROM clients WHERE email = 'nour@nour-events.com'), 'active',  893, 0, NOW() - INTERVAL '1 hour');

-- ── TASKS ────────────────────────────────────────────────────
INSERT INTO tasks (title, description, type, priority, status, due_date, related_lead_id) VALUES
  ('Follow up with Ahmed',   'Send proposal for WhatsApp ordering system',         'lead_followup', 'high',   'todo',        NOW() + INTERVAL '1 day',  (SELECT id FROM leads WHERE email = 'ahmed@alhilal-restaurant.com')),
  ('Prepare Sophie demo',    'Record 5-min Loom of e-commerce AI personalisation', 'content',       'medium', 'in_progress', NOW() + INTERVAL '3 days', (SELECT id FROM leads WHERE email = 'sophie@maison-luxe.fr')),
  ('Invoice HealthPlus May', 'Generate and send May maintenance invoice',          'invoice',       'high',   'todo',        NOW() + INTERVAL '2 days', NULL),
  ('AutoMaroc site backup',  'Verify daily backup is running correctly',           'maintenance',   'low',    'done',        NOW() - INTERVAL '1 day',  NULL),
  ('Carlos follow-up email', 'Send follow-up 3 days after discovery call',        'lead_followup', 'medium', 'todo',        NOW() + INTERVAL '1 day',  (SELECT id FROM leads WHERE email = 'carlos@realty-pro.com'));
