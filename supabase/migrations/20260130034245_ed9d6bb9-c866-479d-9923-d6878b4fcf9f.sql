-- Add RLS policies to prevent users from manipulating free assessment records
-- Only backend services (edge functions with service_role) can INSERT/UPDATE/DELETE

-- Deny INSERT for all authenticated users (edge functions use service_role which bypasses RLS)
CREATE POLICY "Deny direct inserts to free_assessments"
ON public.free_assessments
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Deny UPDATE for all authenticated users
CREATE POLICY "Deny updates to free_assessments"
ON public.free_assessments
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

-- Deny DELETE for all authenticated users
CREATE POLICY "Deny deletes from free_assessments"
ON public.free_assessments
FOR DELETE
TO authenticated
USING (false);