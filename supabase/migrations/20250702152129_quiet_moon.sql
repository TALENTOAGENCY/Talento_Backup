/*
  # Create storage bucket for candidate files

  1. Storage Setup
    - Create `candidate-files` bucket for CV uploads
    - Configure bucket to be private (not publicly accessible)
    - Set up RLS policies for secure file access

  2. Security
    - Allow anonymous users to upload files (for candidate applications)
    - Allow authenticated users to read files
    - Restrict file access to authorized users only
*/

-- Create the storage bucket for candidate files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'candidate-files',
  'candidate-files',
  false,
  5242880, -- 5MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Allow anonymous users to upload files (for candidate applications)
CREATE POLICY "Allow anonymous upload to candidate-files"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'candidate-files');

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated upload to candidate-files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'candidate-files');

-- Allow authenticated users to read files
CREATE POLICY "Allow authenticated read from candidate-files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'candidate-files');

-- Allow service role to manage all files (for admin purposes)
CREATE POLICY "Allow service role full access to candidate-files"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'candidate-files');