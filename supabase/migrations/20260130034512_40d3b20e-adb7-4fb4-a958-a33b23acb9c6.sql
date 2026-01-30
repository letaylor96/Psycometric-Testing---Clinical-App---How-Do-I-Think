-- First, handle any potential duplicates by keeping only the most recent completed purchase per user/assessment
WITH duplicates AS (
  SELECT user_id, assessment_type, 
         array_agg(id ORDER BY 
           CASE WHEN status = 'completed' THEN 0 ELSE 1 END,
           created_at DESC
         ) as ids
  FROM purchases
  GROUP BY user_id, assessment_type
  HAVING count(*) > 1
)
DELETE FROM purchases
WHERE id IN (
  SELECT unnest(ids[2:]) FROM duplicates
);

-- Add unique constraint to prevent duplicate purchases
ALTER TABLE public.purchases 
ADD CONSTRAINT purchases_user_assessment_unique 
UNIQUE (user_id, assessment_type);