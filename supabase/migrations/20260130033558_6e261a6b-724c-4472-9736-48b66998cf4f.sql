-- Add explicit RLS policies to prevent users from manipulating purchase records
-- Only backend services (edge functions with service_role) can INSERT/UPDATE/DELETE

-- Deny INSERT for all authenticated users (edge functions use service_role which bypasses RLS)
CREATE POLICY "Deny direct inserts to purchases"
ON public.purchases
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Deny UPDATE for all authenticated users
CREATE POLICY "Deny updates to purchases"
ON public.purchases
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

-- Deny DELETE for all authenticated users
CREATE POLICY "Deny deletes from purchases"
ON public.purchases
FOR DELETE
TO authenticated
USING (false);