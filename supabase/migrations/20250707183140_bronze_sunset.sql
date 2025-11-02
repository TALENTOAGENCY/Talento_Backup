/*
  # Fix contact forms RLS policies

  1. Security Updates
    - Drop existing policies that may be conflicting
    - Create new clear policies for contact form submissions
    - Ensure anonymous users can insert contact forms
    - Ensure authenticated users can read contact forms

  2. Changes
    - Allow anonymous (public) users to insert contact forms
    - Allow authenticated users to read all contact forms
    - Maintain RLS security while fixing the insertion issue
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated read on contact_forms" ON contact_forms;
DROP POLICY IF EXISTS "Allow public insert on contact_forms" ON contact_forms;

-- Create new policies with clear permissions
CREATE POLICY "Enable insert for anonymous users on contact_forms"
  ON contact_forms
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users on contact_forms"
  ON contact_forms
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users on contact_forms"
  ON contact_forms
  FOR SELECT
  TO authenticated
  USING (true);