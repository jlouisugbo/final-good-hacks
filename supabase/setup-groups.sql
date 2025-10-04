-- Create groups table
CREATE TABLE IF NOT EXISTS groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to validate group codes (for signup)
CREATE POLICY "Anyone can validate group codes" ON groups
  FOR SELECT
  USING (true);

-- Insert dummy access codes
INSERT INTO groups (code, name, description) VALUES
  ('IGA2025', 'IGA Academy 2025', 'Main cohort for 2025'),
  ('YOUTH2025', 'Youth Empowerment 2025', 'Youth-focused learning group'),
  ('LEADERS25', 'Future Leaders Program', 'Leadership development cohort'),
  ('ENTREPRE25', 'Young Entrepreneurs', 'Entrepreneurship track'),
  ('TECH2025', 'Tech Innovators', 'Technology and innovation group'),
  ('CREATORS25', 'Creative Minds', 'Arts and creativity cohort'),
  ('SCHOLARS25', 'Academic Scholars', 'Academic excellence program'),
  ('CHANGEMAKERS', 'Community Changemakers', 'Community leadership group'),
  ('DEMO2025', 'Demo Group', 'For testing and demonstrations'),
  ('PILOT2025', 'Pilot Program', 'Pilot test group')
ON CONFLICT (code) DO NOTHING;
