import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Brain, Users, Activity, Sparkles, Lock, Crown, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestResults, categoryLabels } from '@/data/quizQuestions';
import { PersonalityResults, personalityTraitLabels } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults, dimensionLabels } from '@/data/cognitiveStyleQuestions';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { PremiumGate } from './PremiumGate';
import { cn } from '@/lib/utils';

interface ExportableOnePagerProps {
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
  className?: string;
}

export const ExportableOnePager = ({
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
  className
}: ExportableOnePagerProps) => {
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { hasPremiumAccess } = usePremiumAccess();
  const contentRef = useRef<HTMLDivElement>(null);

  // Need at least one assessment completed
  const hasAnyResults = iqResults || personalityResults || adhdResults || cognitiveStyleResults;
  if (!hasAnyResults) return null;

  const handleExport = async () => {
    if (!hasPremiumAccess) {
      setShowPremiumGate(true);
      return;
    }

    setIsGenerating(true);
    
    try {
      // Generate a printable HTML version
      const content = generateExportContent();
      
      // Open in new window for printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.focus();
        
        // Trigger print dialog after content loads
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateExportContent = () => {
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return `
<!DOCTYPE html>
<html>
<head>
  <title>How My Mind Works - Cognitive Profile</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
      color: #1a1a2e;
      line-height: 1.6;
    }
    .header { 
      text-align: center; 
      margin-bottom: 40px; 
      padding-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;
    }
    .header h1 { 
      font-size: 28px; 
      margin-bottom: 8px;
      color: #1a1a2e;
    }
    .header p { color: #666; font-size: 14px; }
    .section { 
      margin-bottom: 30px; 
      page-break-inside: avoid;
    }
    .section-title { 
      font-size: 18px; 
      font-weight: 600; 
      margin-bottom: 15px;
      color: #1a1a2e;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-icon { 
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: #f0f0f5;
      font-size: 14px;
    }
    .card { 
      background: #f8f9fa; 
      border-radius: 12px; 
      padding: 20px;
      margin-bottom: 15px;
    }
    .stat-grid { 
      display: grid; 
      grid-template-columns: repeat(2, 1fr); 
      gap: 15px; 
    }
    .stat-item { 
      background: white; 
      padding: 15px; 
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
    .stat-label { 
      font-size: 12px; 
      color: #666; 
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .stat-value { 
      font-size: 24px; 
      font-weight: 700;
      color: #1a1a2e;
    }
    .stat-detail { 
      font-size: 12px; 
      color: #888; 
    }
    .trait-bar { 
      display: flex; 
      align-items: center; 
      margin-bottom: 10px; 
    }
    .trait-label { 
      width: 140px; 
      font-size: 13px; 
    }
    .trait-bar-container { 
      flex: 1; 
      height: 8px; 
      background: #e0e0e0; 
      border-radius: 4px; 
      margin: 0 10px;
    }
    .trait-bar-fill { 
      height: 100%; 
      background: linear-gradient(90deg, #6366f1, #8b5cf6); 
      border-radius: 4px; 
    }
    .trait-value { 
      width: 40px; 
      font-size: 13px; 
      font-weight: 600; 
      text-align: right;
    }
    .insights-list { 
      list-style: none; 
    }
    .insights-list li { 
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
      font-size: 14px;
    }
    .insights-list li:last-child { border-bottom: none; }
    .footer { 
      margin-top: 40px; 
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
    .disclaimer {
      font-size: 11px;
      color: #999;
      margin-top: 20px;
      padding: 15px;
      background: #fafafa;
      border-radius: 8px;
    }
    @media print {
      body { padding: 20px; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>How My Mind Works</h1>
    <p>Cognitive Profile Report • Generated ${date}</p>
  </div>

  ${iqResults ? `
  <div class="section">
    <div class="section-title">
      <span class="section-icon">🧠</span>
      Pattern Recognition IQ
    </div>
    <div class="card">
      <div class="stat-grid">
        <div class="stat-item">
          <div class="stat-label">IQ Score</div>
          <div class="stat-value">${iqResults.iq}</div>
          <div class="stat-detail">${getIQClassification(iqResults.iq)}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Percentile</div>
          <div class="stat-value">Top ${(100 - getIQPercentile(iqResults.iq)).toFixed(1)}%</div>
          <div class="stat-detail">Global ranking</div>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <div class="stat-label" style="margin-bottom: 12px;">Cognitive Strengths</div>
        ${iqResults.categoryScores.map(cat => `
          <div class="trait-bar">
            <span class="trait-label">${categoryLabels[cat.category]}</span>
            <div class="trait-bar-container">
              <div class="trait-bar-fill" style="width: ${cat.percentage}%"></div>
            </div>
            <span class="trait-value">${cat.percentage}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  ` : ''}

  ${personalityResults ? `
  <div class="section">
    <div class="section-title">
      <span class="section-icon">👤</span>
      Personality Profile
    </div>
    <div class="card">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 24px; font-weight: 700; color: #1a1a2e;">${personalityResults.personalityType}</div>
        <div style="font-size: 14px; color: #666; font-style: italic;">"${personalityResults.archetype.tagline}"</div>
        <div style="font-size: 12px; color: #888; margin-top: 4px;">${personalityResults.archetype.rarity}</div>
      </div>
      <div class="stat-label" style="margin-bottom: 12px;">Big Five Traits (OCEAN)</div>
      ${(Object.entries(personalityResults.scores) as [string, number][]).map(([trait, score]) => `
        <div class="trait-bar">
          <span class="trait-label">${personalityTraitLabels[trait as keyof typeof personalityTraitLabels]?.label || trait}</span>
          <div class="trait-bar-container">
            <div class="trait-bar-fill" style="width: ${score}%; background: linear-gradient(90deg, #f59e0b, #f97316);"></div>
          </div>
          <span class="trait-value">${score}%</span>
        </div>
      `).join('')}
      ${personalityResults.mbti ? `
      <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
        <div class="stat-label" style="margin-bottom: 8px;">Myers-Briggs Type</div>
        <div style="font-size: 18px; font-weight: 600;">${personalityResults.mbti.type} - ${personalityResults.mbti.name}</div>
        <div style="font-size: 13px; color: #666; margin-top: 4px;">${personalityResults.mbti.nickname}</div>
      </div>
      ` : ''}
    </div>
  </div>
  ` : ''}

  ${cognitiveStyleResults ? `
  <div class="section">
    <div class="section-title">
      <span class="section-icon">💡</span>
      Cognitive Style
    </div>
    <div class="card">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 20px; font-weight: 700; color: #1a1a2e;">${cognitiveStyleResults.primaryProfile.name}</div>
        <div style="font-size: 13px; color: #666; max-width: 400px; margin: 8px auto;">${cognitiveStyleResults.primaryProfile.description}</div>
      </div>
      <div class="stat-label" style="margin-bottom: 12px;">Thinking Dimensions</div>
      ${cognitiveStyleResults.dimensionScores.map(dim => `
        <div class="trait-bar">
          <span class="trait-label">${dimensionLabels[dim.dimension]?.label || dim.dimension}</span>
          <div class="trait-bar-container">
            <div class="trait-bar-fill" style="width: ${dim.percentage}%; background: linear-gradient(90deg, #10b981, #34d399);"></div>
          </div>
          <span class="trait-value">${dim.percentage}%</span>
        </div>
      `).join('')}
    </div>
  </div>
  ` : ''}

  ${adhdResults ? `
  <div class="section">
    <div class="section-title">
      <span class="section-icon">⚡</span>
      Attention Profile
    </div>
    <div class="card">
      <div class="stat-grid">
        <div class="stat-item">
          <div class="stat-label">ADHD Likelihood</div>
          <div class="stat-value" style="text-transform: capitalize;">${adhdResults.likelihood}</div>
          <div class="stat-detail">Based on ASRS-v1.1</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Part A Score</div>
          <div class="stat-value">${adhdResults.partAScore}/6</div>
          <div class="stat-detail">Screening threshold: 4+</div>
        </div>
      </div>
      <div style="margin-top: 15px;">
        <div class="trait-bar">
          <span class="trait-label">Inattention</span>
          <div class="trait-bar-container">
            <div class="trait-bar-fill" style="width: ${(adhdResults.inattentionScore / 36) * 100}%; background: #f59e0b;"></div>
          </div>
          <span class="trait-value">${adhdResults.inattentionPositive}</span>
        </div>
        <div class="trait-bar">
          <span class="trait-label">Hyperactivity</span>
          <div class="trait-bar-container">
            <div class="trait-bar-fill" style="width: ${(adhdResults.hyperactivityScore / 36) * 100}%; background: #ef4444;"></div>
          </div>
          <span class="trait-value">${adhdResults.hyperactivityPositive}</span>
        </div>
      </div>
    </div>
  </div>
  ` : ''}

  <div class="disclaimer">
    <strong>Disclaimer:</strong> This report is for educational and self-reflection purposes only. It is not a clinical assessment or diagnosis. 
    For professional evaluation, please consult a licensed psychologist, psychiatrist, or healthcare provider.
  </div>

  <div class="footer">
    Generated by How Do I Think? • howdoithink.app
  </div>
</body>
</html>
    `;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("", className)}
      >
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <FileText className="w-4 h-4 text-violet-500" />
          </div>
          <h3 className="font-display font-semibold text-lg">Export Your Profile</h3>
        </div>
        
        <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Download className="w-5 h-5 text-violet-500" />
              "How My Mind Works" Brief
            </CardTitle>
            <CardDescription>
              A professional one-page summary of your cognitive profile
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {/* Preview Card */}
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-16 rounded bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-violet-500/20">
                    <FileText className="w-6 h-6 text-violet-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">Your Cognitive Profile Report</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Includes IQ score, personality type, cognitive style, and attention profile in a shareable format.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {iqResults && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                          IQ: {iqResults.iq}
                        </span>
                      )}
                      {personalityResults && (
                        <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
                          {personalityResults.mbti?.type || 'Personality'}
                        </span>
                      )}
                      {cognitiveStyleResults && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs">
                          {cognitiveStyleResults.primaryProfile.name}
                        </span>
                      )}
                      {adhdResults && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-xs capitalize">
                          {adhdResults.likelihood} ADHD
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Export Button */}
              <Button
                onClick={handleExport}
                disabled={isGenerating}
                className={cn(
                  "w-full",
                  hasPremiumAccess 
                    ? "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                    : ""
                )}
                variant={hasPremiumAccess ? "default" : "outline"}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : hasPremiumAccess ? (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Report
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Unlock Export
                    <Crown className="w-3 h-3 ml-2 text-violet-500" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <PremiumGate
        isOpen={showPremiumGate}
        onClose={() => setShowPremiumGate(false)}
        onUnlocked={() => {
          setShowPremiumGate(false);
          handleExport();
        }}
        feature="Exportable Profile Report"
      />
    </>
  );
};

// Helper functions
function getIQPercentile(iq: number): number {
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
  if (iq >= 95) return 37;
  if (iq >= 90) return 25;
  if (iq >= 85) return 16;
  return 10;
}

function getIQClassification(iq: number): string {
  if (iq >= 145) return 'Genius';
  if (iq >= 130) return 'Very Superior';
  if (iq >= 120) return 'Superior';
  if (iq >= 110) return 'High Average';
  if (iq >= 90) return 'Average';
  if (iq >= 80) return 'Low Average';
  return 'Below Average';
}
