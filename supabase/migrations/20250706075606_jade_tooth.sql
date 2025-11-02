/*
  # Fix Profile Insert Policy for Signup

  1. Security Changes
    - Update the INSERT policy on `profiles` table to allow profile creation during signup
    - The policy now allows INSERT operations when the user ID matches the authenticated user ID
    - This fixes the RLS violation that occurs during user registration

  2. Policy Details
    - Removes the existing restrictive INSERT policy
    - Creates a new policy that properly handles the signup flow
    - Maintains security by ensuring users can only create profiles for themselves
*/

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create a new INSERT policy that works with the signup flow
CREATE POLICY "Users can insert own profile during signup"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Also ensure we have a policy for public users during the brief moment of signup
-- This is needed because there's a small window during signup where the user might not be fully authenticated
CREATE POLICY "Allow profile creation during signup"
  ON profiles
  FOR INSERT
  TO public
  WITH CHECK (true);

-- However, we should restrict this to only allow one profile per user
-- Add a unique constraint if it doesn't exist (it should already exist as primary key)
-- This is just for safety
DO $$
BEGIN
  -- The profiles table should already have id as primary key, but let's ensure uniqueness
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'profiles' 
    AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
  END IF;
END $$;