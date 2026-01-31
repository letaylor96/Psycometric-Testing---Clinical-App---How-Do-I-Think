import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Brain, Heart, Zap, Activity, ChevronDown, ChevronUp, Check, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface WeeklyCheckInProps {
  className?: string;
}

interface CheckInData {
  mental_clarity: number;
  focus_quality: number;
  emotional_load: number;
  energy_level: number;
  reflection_note: string;
}

const defaultCheckIn: CheckInData = {
  mental_clarity: 3,
  focus_quality: 3,
  emotional_load: 3,
  energy_level: 3,
  reflection_note: '',
};

const checkInQuestions = [
  { key: 'mental_clarity' as const, label: 'Mental Clarity', icon: Brain, description: 'How clear is your thinking today?' },
  { key: 'focus_quality' as const, label: 'Focus Quality', icon: Activity, description: 'How easily can you concentrate?' },
  { key: 'emotional_load' as const, label: 'Emotional Load', icon: Heart, description: 'How much emotional weight are you carrying?', inverted: true },
  { key: 'energy_level' as const, label: 'Energy Level', icon: Zap, description: 'How energized do you feel?' },
];

const scaleLabels: Record<number, string> = {
  1: 'Very Low',
  2: 'Low',
  3: 'Moderate',
  4: 'High',
  5: 'Very High',
};

export const WeeklyCheckIn = ({ className }: WeeklyCheckInProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [checkIn, setCheckIn] = useState<CheckInData>(defaultCheckIn);
  const [hasCompletedToday, setHasCompletedToday] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Check if user has already completed today's check-in
  useEffect(() => {
    const checkTodayCompletion = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('cognitive_checkins')
          .select('*')
          .eq('user_id', user.id)
          .eq('checkin_date', today)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          setHasCompletedToday(true);
          setCheckIn({
            mental_clarity: data.mental_clarity || 3,
            focus_quality: data.focus_quality || 3,
            emotional_load: data.emotional_load || 3,
            energy_level: data.energy_level || 3,
            reflection_note: data.reflection_note || '',
          });
        }
      } catch (error) {
        console.error('Error checking today\'s check-in:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkTodayCompletion();
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save your check-in.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('cognitive_checkins')
        .upsert({
          user_id: user.id,
          checkin_date: today,
          mental_clarity: checkIn.mental_clarity,
          focus_quality: checkIn.focus_quality,
          emotional_load: checkIn.emotional_load,
          energy_level: checkIn.energy_level,
          reflection_note: checkIn.reflection_note || null,
        }, {
          onConflict: 'user_id,checkin_date'
        });

      if (error) throw error;

      setHasCompletedToday(true);
      toast({
        title: 'Check-in saved',
        description: 'Your cognitive check-in has been recorded.',
      });
    } catch (error) {
      console.error('Error saving check-in:', error);
      toast({
        title: 'Error saving check-in',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateValue = (key: keyof CheckInData, value: number | string) => {
    setCheckIn(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("", className)}
    >
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
          <Calendar className="w-4 h-4 text-emerald-500" />
        </div>
        <h3 className="font-display font-semibold text-lg">Cognitive Check-In</h3>
        {hasCompletedToday && (
          <span className="ml-auto px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium flex items-center gap-1">
            <Check className="w-3 h-3" />
            Completed Today
          </span>
        )}
      </div>
      
      <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="w-5 h-5 text-emerald-500" />
            Daily Micro-Reflection
          </CardTitle>
          <CardDescription>
            Track your cognitive state over time. One minute, powerful insights.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Quick Summary */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-4">
                  {checkInQuestions.map(q => {
                    const value = checkIn[q.key] as number;
                    const Icon = q.icon;
                    return (
                      <div key={q.key} className="flex items-center gap-1.5">
                        <Icon className={cn(
                          "w-4 h-4",
                          value >= 4 ? "text-emerald-500" : value <= 2 ? "text-amber-500" : "text-muted-foreground"
                        )} />
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    );
                  })}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Collapse
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      {hasCompletedToday ? 'Update' : 'Log Check-In'}
                    </>
                  )}
                </Button>
              </div>
              
              {/* Expanded Form */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden space-y-6"
                  >
                    {checkInQuestions.map(q => {
                      const Icon = q.icon;
                      const value = checkIn[q.key] as number;
                      return (
                        <div key={q.key} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-emerald-500" />
                              <span className="font-medium text-sm">{q.label}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {scaleLabels[value]}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{q.description}</p>
                          <Slider
                            value={[value]}
                            min={1}
                            max={5}
                            step={1}
                            onValueChange={([v]) => updateValue(q.key, v)}
                            className="w-full"
                          />
                        </div>
                      );
                    })}
                    
                    {/* Reflection Note */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Quick Reflection (optional)
                      </label>
                      <p className="text-xs text-muted-foreground">
                        What felt mentally heavy today? What helped?
                      </p>
                      <Textarea
                        value={checkIn.reflection_note}
                        onChange={(e) => updateValue('reflection_note', e.target.value)}
                        placeholder="Today I noticed..."
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                    
                    {/* Save Button */}
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          {hasCompletedToday ? 'Update Check-In' : 'Save Check-In'}
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
