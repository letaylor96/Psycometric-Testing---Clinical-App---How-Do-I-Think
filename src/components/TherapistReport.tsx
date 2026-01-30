import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { TestResults, categoryLabels } from '@/data/quizQuestions';
import { PersonalityResults, personalityTraitLabels, PersonalityTrait } from '@/data/personalityQuestions';
import { ADHDResults, adhdDomainLabels } from '@/data/adhdQuestions';
import { CognitiveStyleResults, dimensionLabels } from '@/data/cognitiveStyleQuestions';
import { FileText, Download, Copy, Check, ClipboardList, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { PremiumGate } from '@/components/PremiumGate';

interface TherapistReportProps {
  iqResults: TestResults | null;
  personalityResults: PersonalityResults | null;
  adhdResults: ADHDResults | null;
  cognitiveStyleResults: CognitiveStyleResults | null;
}

export const TherapistReport = ({
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
}: TherapistReportProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const { hasPremiumAccess } = usePremiumAccess();

  const hasAnyResults = iqResults || personalityResults || adhdResults || cognitiveStyleResults;
  
  const handleClick = () => {
    if (!hasPremiumAccess) {
      setShowPremiumGate(true);
      return;
    }
    setIsOpen(true);
  };
  
  const generateDate = () => new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const generateReport = (): string => {
    const sections: string[] = [];
    
    // Header
    sections.push('═══════════════════════════════════════════════════════════════');
    sections.push('COGNITIVE AND PERSONALITY ASSESSMENT SUMMARY');
    sections.push('For Clinical Review');
    sections.push('═══════════════════════════════════════════════════════════════');
    sections.push('');
    sections.push(`Date Generated: ${generateDate()}`);
    sections.push(`Assessment Platform: How Do I Think - Psychometric Assessment Suite`);
    sections.push('');
    sections.push('DISCLAIMER: This report is generated from self-administered online');
    sections.push('assessments and is intended for informational purposes only. Results');
    sections.push('should be interpreted by qualified mental health professionals and');
    sections.push('do not constitute a clinical diagnosis.');
    sections.push('');
    sections.push('═══════════════════════════════════════════════════════════════');
    
    // IQ Results
    if (iqResults) {
      sections.push('');
      sections.push('SECTION 1: COGNITIVE ABILITY ASSESSMENT');
      sections.push('───────────────────────────────────────────────────────────────');
      sections.push('Instrument: Pattern Recognition IQ Test (Raven\'s-style matrices)');
      sections.push(`Questions Completed: ${iqResults.totalCorrect}/${iqResults.totalQuestions}`);
      sections.push(`Time Used: ${Math.round(iqResults.timeUsed / 60)} minutes`);
      sections.push('');
      sections.push(`Estimated IQ Score: ${iqResults.iq}`);
      sections.push(`Classification: ${getIQClassification(iqResults.iq)}`);
      sections.push(`Approximate Percentile: ${getIQPercentile(iqResults.iq)}th`);
      sections.push('');
      sections.push('Domain Scores:');
      iqResults.categoryScores.forEach(cat => {
        sections.push(`  • ${categoryLabels[cat.category]}: ${cat.percentage}% (${cat.correct}/${cat.total} correct)`);
      });
      sections.push('');
      sections.push(`Primary Cognitive Strength: ${categoryLabels[iqResults.primaryStrength]}`);
      sections.push(`Divergent Thinking Profile: ${iqResults.divergentType}`);
    }

    // Personality Results
    if (personalityResults) {
      sections.push('');
      sections.push('SECTION 2: PERSONALITY ASSESSMENT');
      sections.push('───────────────────────────────────────────────────────────────');
      sections.push('Instrument: Big Five Inventory (IPIP-NEO based)');
      sections.push('');
      sections.push(`Personality Type: ${personalityResults.personalityType}`);
      sections.push(`MBTI Correlation: ${personalityResults.mbti.type} (${personalityResults.mbti.name})`);
      sections.push('');
      sections.push('Big Five Trait Scores (0-100 scale):');
      (Object.entries(personalityResults.scores) as [PersonalityTrait, number][]).forEach(([trait, score]) => {
        const label = personalityTraitLabels[trait];
        const interpretation = score >= 70 ? 'High' : score >= 40 ? 'Moderate' : 'Low';
        sections.push(`  • ${label.label}: ${score} (${interpretation})`);
        sections.push(`    ${score >= 50 ? label.high : label.low}`);
      });
      sections.push('');
      sections.push('Clinical Considerations:');
      sections.push(`  • Communication Style: ${personalityResults.communicationStyle}`);
      sections.push(`  • Stress Response Pattern: ${personalityResults.stressResponse}`);
      sections.push(`  • Leadership Tendency: ${personalityResults.leadershipStyle}`);
    }

    // ADHD Screening
    if (adhdResults) {
      sections.push('');
      sections.push('SECTION 3: ATTENTION SCREENING');
      sections.push('───────────────────────────────────────────────────────────────');
      sections.push('Instrument: ASRS-v1.1 (WHO Adult ADHD Self-Report Scale)');
      sections.push('');
      sections.push(`Screening Result: ${adhdResults.likelihood.toUpperCase()} likelihood of ADHD`);
      sections.push(`Part A Score: ${adhdResults.partAScore}/6 ${adhdResults.partAThreshold ? '(ABOVE clinical threshold)' : '(below threshold)'}`);
      sections.push(`Total Positive Symptoms: ${adhdResults.totalPositiveSymptoms}/18`);
      sections.push('');
      sections.push('Domain Breakdown:');
      sections.push(`  • ${adhdDomainLabels.inattention}: ${adhdResults.inattentionPositive}/9 symptoms above threshold`);
      sections.push(`  • ${adhdDomainLabels.hyperactivity}: ${adhdResults.hyperactivityPositive}/9 symptoms above threshold`);
      sections.push('');
      sections.push(`Inattention Score: ${adhdResults.inattentionScore} (raw)`);
      sections.push(`Hyperactivity Score: ${adhdResults.hyperactivityScore} (raw)`);
      sections.push('');
      if (adhdResults.partAThreshold) {
        sections.push('CLINICAL NOTE: Part A screening threshold exceeded. Further clinical');
        sections.push('evaluation for ADHD is recommended.');
      }
    }

    // Cognitive Style
    if (cognitiveStyleResults) {
      sections.push('');
      sections.push('SECTION 4: COGNITIVE STYLE PROFILE');
      sections.push('───────────────────────────────────────────────────────────────');
      sections.push('Instrument: Cognitive Style Assessment (neurodivergence-informed)');
      sections.push('');
      sections.push(`Primary Profile: ${cognitiveStyleResults.primaryProfile.name}`);
      sections.push(`Processing Style: ${cognitiveStyleResults.processingStyle}`);
      sections.push('');
      sections.push('Thinking Dimension Scores (0-100 scale):');
      cognitiveStyleResults.dimensionScores.forEach(dim => {
        const label = dimensionLabels[dim.dimension];
        sections.push(`  • ${label.label}: ${dim.percentage}%`);
        sections.push(`    ${label.description}`);
      });
      sections.push('');
      sections.push('Dominant Dimensions:');
      cognitiveStyleResults.dominantDimensions.forEach(dim => {
        sections.push(`  • ${dimensionLabels[dim].label}`);
      });
      sections.push('');
      if (cognitiveStyleResults.primaryProfile.neurodivergentTraits?.length > 0) {
        sections.push('Neurodivergent Processing Indicators:');
        cognitiveStyleResults.primaryProfile.neurodivergentTraits.forEach(trait => {
          sections.push(`  • ${trait}`);
        });
      }
    }

    // Summary & Recommendations
    sections.push('');
    sections.push('═══════════════════════════════════════════════════════════════');
    sections.push('INTEGRATED SUMMARY');
    sections.push('═══════════════════════════════════════════════════════════════');
    sections.push('');
    
    const summaryPoints: string[] = [];
    if (iqResults) {
      summaryPoints.push(`Cognitive ability in the ${getIQClassification(iqResults.iq).toLowerCase()} range (IQ: ${iqResults.iq})`);
    }
    if (personalityResults) {
      summaryPoints.push(`${personalityResults.personalityType} personality profile with ${personalityResults.dominantTrait} as dominant trait`);
    }
    if (adhdResults && adhdResults.partAThreshold) {
      summaryPoints.push(`Elevated ADHD screening indicators (Part A threshold exceeded)`);
    }
    if (cognitiveStyleResults) {
      summaryPoints.push(`${cognitiveStyleResults.primaryProfile.name} cognitive style with ${cognitiveStyleResults.processingStyle} processing`);
    }
    
    summaryPoints.forEach((point, i) => {
      sections.push(`${i + 1}. ${point}`);
    });

    sections.push('');
    sections.push('───────────────────────────────────────────────────────────────');
    sections.push('This report was generated by the client using the How Do I Think');
    sections.push('assessment platform. For questions about interpretation or to');
    sections.push('request access to detailed item-level responses, please contact');
    sections.push('the assessment provider.');
    sections.push('───────────────────────────────────────────────────────────────');

    return sections.join('\n');
  };

  const getIQClassification = (iq: number): string => {
    if (iq >= 145) return 'Genius';
    if (iq >= 130) return 'Very Superior';
    if (iq >= 120) return 'Superior';
    if (iq >= 110) return 'High Average';
    if (iq >= 90) return 'Average';
    if (iq >= 80) return 'Low Average';
    return 'Below Average';
  };

  const getIQPercentile = (iq: number): number => {
    if (iq >= 145) return 99.9;
    if (iq >= 140) return 99.6;
    if (iq >= 135) return 99;
    if (iq >= 130) return 98;
    if (iq >= 125) return 95;
    if (iq >= 120) return 91;
    if (iq >= 115) return 84;
    if (iq >= 110) return 75;
    if (iq >= 105) return 63;
    if (iq >= 100) return 50;
    return 37;
  };

  const handleCopy = async () => {
    const report = generateReport();
    await navigator.clipboard.writeText(report);
    setCopied(true);
    toast.success('Report copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cognitive-assessment-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Report downloaded');
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={!hasAnyResults}
        variant="outline"
        className="border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-600"
      >
        {!hasPremiumAccess && <Lock className="w-3 h-3 mr-1.5" />}
        <ClipboardList className="w-4 h-4 mr-2" />
        Therapist Report
      </Button>

      <PremiumGate
        isOpen={showPremiumGate}
        onClose={() => setShowPremiumGate(false)}
        onUnlocked={() => setIsOpen(true)}
        feature="Therapist Report"
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 font-serif text-2xl">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-500" />
              </div>
              Clinical Assessment Summary
            </DialogTitle>
            <DialogDescription>
              A professional summary of your assessment results formatted for mental health providers
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download .txt
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto rounded-lg border border-border bg-muted/30">
            <pre className="p-4 text-xs font-mono whitespace-pre-wrap text-foreground">
              {generateReport()}
            </pre>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            This report is designed to complement, not replace, clinical assessment. 
            Share with your healthcare provider for integrated interpretation.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};
