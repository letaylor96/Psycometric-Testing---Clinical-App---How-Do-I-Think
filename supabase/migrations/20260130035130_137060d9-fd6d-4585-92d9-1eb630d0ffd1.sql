-- Add permissive SELECT policy that requires authentication
CREATE POLICY "Require authentication for purchases"
ON public.purchases
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);