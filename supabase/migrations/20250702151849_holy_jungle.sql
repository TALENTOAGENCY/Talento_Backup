/*
  # Fix candidate application RLS policy

  1. Changes
    - Update the RLS policy for candidate_applications to allow anonymous users to insert
    - This matches the contact_forms policy which works correctly

  2. Security
    - Anonymous users can only insert (submit applications)
    - Authenticated users can still read all data for admin purposes
*/

-- Drop the existing policy that requires authenticated users for insert
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON candidate_applications;

-- Create new policy that allows anonymous users to insert
CREATE POLICY "Allow anonymous insert on candidate_applications"
  ON candidate_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert (for admin purposes)
CREATE POLICY "Allow authenticated insert on candidate_applications"
  ON candidate_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);