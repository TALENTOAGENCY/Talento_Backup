/*
  # Create tables for candidate applications and contact forms

  1. New Tables
    - `candidate_applications`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `citizenship` (text)
      - `phone` (text)
      - `email` (text)
      - `main_role` (text)
      - `business_sector` (text)
      - `job_title` (text)
      - `current_employer` (text)
      - `linkedin_url` (text)
      - `cv_file_path` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `contact_forms`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text)
      - `company` (text, nullable)
      - `message` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage data
*/

CREATE TABLE IF NOT EXISTS candidate_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  citizenship text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  main_role text NOT NULL,
  business_sector text NOT NULL,
  job_title text NOT NULL,
  current_employer text NOT NULL,
  linkedin_url text NOT NULL,
  cv_file_path text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE candidate_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since these are contact forms)
-- In production, you might want to restrict these further
CREATE POLICY "Allow public insert on candidate_applications"
  ON candidate_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on contact_forms"
  ON contact_forms
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all data (for admin purposes)
CREATE POLICY "Allow authenticated read on candidate_applications"
  ON candidate_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read on contact_forms"
  ON contact_forms
  FOR SELECT
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_candidate_applications_updated_at
  BEFORE UPDATE ON candidate_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_forms_updated_at
  BEFORE UPDATE ON contact_forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();