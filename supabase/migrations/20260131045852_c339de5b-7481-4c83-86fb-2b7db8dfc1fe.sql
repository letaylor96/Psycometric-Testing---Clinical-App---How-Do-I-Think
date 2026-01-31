-- Create table for cognitive check-ins
CREATE TABLE public.cognitive_checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  checkin_date DATE NOT NULL DEFAULT CURRENT_DATE,
  -- Micro-reflection responses (1-5 scale)
  mental_clarity INTEGER CHECK (mental_clarity >= 1 AND mental_clarity <= 5),
  focus_quality INTEGER CHECK (focus_quality >= 1 AND focus_quality <= 5),
  emotional_load INTEGER CHECK (emotional_load >= 1 AND emotional_load <= 5),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 5),
  -- Optional pattern task score (0-100)
  pattern_task_score INTEGER CHECK (pattern_task_score >= 0 AND pattern_task_score <= 100),
  -- Free-text reflection
  reflection_note TEXT,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  -- Prevent duplicate check-ins per day per user
  CONSTRAINT unique_user_daily_checkin UNIQUE (user_id, checkin_date)
);

-- Enable Row Level Security
ALTER TABLE public.cognitive_checkins ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own check-ins" 
ON public.cognitive_checkins 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own check-ins" 
ON public.cognitive_checkins 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own check-ins" 
ON public.cognitive_checkins 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create index for efficient querying by user and date
CREATE INDEX idx_cognitive_checkins_user_date ON public.cognitive_checkins (user_id, checkin_date DESC);