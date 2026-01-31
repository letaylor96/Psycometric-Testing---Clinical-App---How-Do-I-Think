-- Create table for storing saved assessment answers and results
CREATE TABLE public.saved_assessments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    assessment_type TEXT NOT NULL, -- 'iq', 'personality', 'neurodivergent', 'depth'
    name TEXT, -- Optional user-provided name for the session
    answers JSONB NOT NULL, -- Array of answers or answer objects
    results JSONB, -- Calculated results object
    framework TEXT, -- For depth psychology: 'freud', 'jung', 'nietzsche'
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    
    -- Index for quick user lookups
    CONSTRAINT valid_assessment_type CHECK (assessment_type IN ('iq', 'personality', 'neurodivergent', 'depth'))
);

-- Enable Row Level Security
ALTER TABLE public.saved_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own saved assessments" 
ON public.saved_assessments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved assessments" 
ON public.saved_assessments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved assessments" 
ON public.saved_assessments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved assessments" 
ON public.saved_assessments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_saved_assessments_updated_at
BEFORE UPDATE ON public.saved_assessments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for efficient querying by user and type
CREATE INDEX idx_saved_assessments_user_type ON public.saved_assessments(user_id, assessment_type);

-- Add a comment explaining this is a premium feature
COMMENT ON TABLE public.saved_assessments IS 'Premium feature: Stores user assessment answers and results for future reference and comparison';