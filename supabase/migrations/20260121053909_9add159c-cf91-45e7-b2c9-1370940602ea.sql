-- Create storage bucket for CV uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('cv-uploads', 'cv-uploads', false);

-- Allow authenticated users to upload their CVs (we'll use anon for simplicity)
CREATE POLICY "Allow CV uploads"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'cv-uploads');

-- Allow reading own uploads
CREATE POLICY "Allow CV reads"
ON storage.objects
FOR SELECT
USING (bucket_id = 'cv-uploads');