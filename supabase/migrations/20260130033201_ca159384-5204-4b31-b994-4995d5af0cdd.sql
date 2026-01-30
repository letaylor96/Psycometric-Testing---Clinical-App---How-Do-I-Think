-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow CV uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow CV reads" ON storage.objects;

-- Create user-isolated INSERT policy
-- Files must be uploaded to a path starting with the user's ID
CREATE POLICY "Users can upload their own CVs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'cv-uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create user-isolated SELECT policy
-- Users can only read files in their own folder
CREATE POLICY "Users can read their own CVs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'cv-uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create user-isolated DELETE policy for cleanup
CREATE POLICY "Users can delete their own CVs"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'cv-uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create user-isolated UPDATE policy
CREATE POLICY "Users can update their own CVs"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'cv-uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'cv-uploads' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);