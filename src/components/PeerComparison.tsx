import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, TrendingUp, GraduationCap, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  analyzePeerComparison, 
  PeerComparisonResult, 
  getAgeGroupLabel, 
  getEducationLabel 
} from '@/lib/peerComparisonIntelligence';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { cn } from '@/lib/utils';

interface PeerComparisonProps {
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
  className?: string;
}

const PercentileBar = ({ percentile, label }: { percentile: number; label: string }) => {
  const getColor = (p: number) => {
    if (p >= 85) return 'bg-emerald-500';
    if (p >= 70) return 'bg-primary';
    if (p >= 50) return 'bg-blue-500';
    if (p >= 30) return 'bg-amber-500';
    return 'bg-muted-foreground';
  };
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{percentile}th</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentile}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn('h-full rounded-full', getColor(percentile))}
        />
      </div>
    </div>
  );
};

export const PeerComparison = ({
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
  className
}: PeerComparisonProps) => {
  const [ageGroup, setAgeGroup] = useState('25-34');
  const [educationBand, setEducationBand] = useState('bachelors');
  
  const result: PeerComparisonResult = analyzePeerComparison(
    iqResults,
    personalityResults,
    adhdResults,
    cognitiveStyleResults,
    ageGroup,
    educationBand
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("", className)}
    >
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Peer & Percentile Comparison
              </CardTitle>
              <CardDescription className="mt-1">
                See how your thinking compares to people like you.
              </CardDescription>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Overall Percentile */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Overall Cognitive Percentile
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-display text-5xl font-bold text-blue-500">
                {result.overallPercentile}
              </span>
              <span className="text-xl text-blue-400">th</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Top {100 - result.overallPercentile}% globally
            </p>
          </div>
          
          {/* Age & Education Selectors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1.5">
                <Calendar className="w-3 h-3" />
                Age Group
              </label>
              <Select value={ageGroup} onValueChange={setAgeGroup}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-24">{getAgeGroupLabel('18-24')}</SelectItem>
                  <SelectItem value="25-34">{getAgeGroupLabel('25-34')}</SelectItem>
                  <SelectItem value="35-44">{getAgeGroupLabel('35-44')}</SelectItem>
                  <SelectItem value="45-54">{getAgeGroupLabel('45-54')}</SelectItem>
                  <SelectItem value="55-64">{getAgeGroupLabel('55-64')}</SelectItem>
                  <SelectItem value="65+">{getAgeGroupLabel('65+')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1.5">
                <GraduationCap className="w-3 h-3" />
                Education
              </label>
              <Select value={educationBand} onValueChange={setEducationBand}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high_school">{getEducationLabel('high_school')}</SelectItem>
                  <SelectItem value="some_college">{getEducationLabel('some_college')}</SelectItem>
                  <SelectItem value="bachelors">{getEducationLabel('bachelors')}</SelectItem>
                  <SelectItem value="masters">{getEducationLabel('masters')}</SelectItem>
                  <SelectItem value="doctorate">{getEducationLabel('doctorate')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Cohort Info */}
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-center">
            <p className="text-xs text-muted-foreground">
              Cognitive Style Cohort: <span className="font-semibold text-foreground">{result.cognitiveStyleCohort}</span>
            </p>
          </div>
          
          {/* All Comparisons */}
          {result.comparisons.map((comparison, i) => (
            <motion.div
              key={comparison.metric}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-muted/30 border border-border"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">{comparison.metric}</span>
                <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                  {comparison.category}
                </span>
              </div>
              
              <div className="space-y-3">
                <PercentileBar 
                  percentile={comparison.globalPercentile} 
                  label="Global" 
                />
                <PercentileBar 
                  percentile={comparison.ageMatchedPercentile} 
                  label={`Age-Matched (${getAgeGroupLabel(ageGroup)})`} 
                />
                <PercentileBar 
                  percentile={comparison.educationMatchedPercentile} 
                  label={`Education-Matched (${getEducationLabel(educationBand)})`} 
                />
                <PercentileBar 
                  percentile={comparison.cohortPercentile} 
                  label={`Cognitive Cohort (${result.cognitiveStyleCohort})`} 
                />
              </div>
              
              <p className="text-xs text-muted-foreground mt-3 italic">
                {comparison.interpretation}
              </p>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};
