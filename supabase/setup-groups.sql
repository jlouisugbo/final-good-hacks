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
  ('IGA2024', 'IGA Academy 2024', 'Main cohort for 2024'),
  ('YOUTH2024', 'Youth Empowerment 2024', 'Youth-focused learning group'),
  ('LEADERS24', 'Future Leaders Program', 'Leadership development cohort'),
  ('ENTREPRE24', 'Young Entrepreneurs', 'Entrepreneurship track'),
  ('TECH2024', 'Tech Innovators', 'Technology and innovation group'),
  ('CREATORS24', 'Creative Minds', 'Arts and creativity cohort'),
  ('SCHOLARS24', 'Academic Scholars', 'Academic excellence program'),
  ('CHANGEMAKERS', 'Community Changemakers', 'Community leadership group'),
  ('DEMO2024', 'Demo Group', 'For testing and demonstrations'),
  ('PILOT2024', 'Pilot Program', 'Pilot test group')
ON CONFLICT (code) DO NOTHING;
