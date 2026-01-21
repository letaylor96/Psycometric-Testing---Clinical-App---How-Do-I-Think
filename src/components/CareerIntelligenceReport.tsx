import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Briefcase, Target, Zap, Award, Linkedin, ArrowRight, Loader2, CheckCircle, TrendingUp, MessageSquare, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TestResults, categoryLabels } from '@/data/quizQuestions';
import { supabase } from '@/integrations/supabase/client';

interface CareerIntelligenceReportProps {
  results: TestResults;
}

interface CareerAnalysis {
  executiveSummary: string;
  careerTrajectoryScore: number;
  leadershipPotentialIndex: string;
  cognitiveRoleAlignment: Array<{
    role: string;
    alignmentScore: number;
    reasoning: string;
  }>;
  uniqueStrengths: Array<{
    strength: string;
    evidence: string;
    executiveValue: string;
  }>;
  careerAccelerators: Array<{
    accelerator: string;
    action: string;
    impact: string;
  }>;
  interviewPowerStatements: string[];
  linkedInHeadline: string;
  executivePositioning: string;
}

export const CareerIntelligenceReport = ({ results }: CareerIntelligenceReportProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CareerAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.txt')) {
        setError('Please upload a PDF, Word document, or text file');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be under 10MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('cognitiveProfile', JSON.stringify({
        iq: results.iq,
        primaryStrength: categoryLabels[results.primaryStrength],
        divergentType: results.divergentType,
        categoryScores: results.categoryScores.map(s => ({
          category: categoryLabels[s.category],
          percentage: s.percentage
        })),
        divergentProfile: results.divergentProfile.map(p => ({
          dimension: p.dimension,
          percentage: p.percentage
        }))
      }));

      const { data, error: invokeError } = await supabase.functions.invoke('analyze-cv', {
        body: formData,
      });

      if (invokeError) throw invokeError;
      if (data.error) throw new Error(data.error);

      setAnalysis(data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze CV. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyHeadline = async () => {
    if (analysis?.linkedInHeadline) {
      await navigator.clipboard.writeText(analysis.linkedInHeadline);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-8"
    >
      {/* Promo Card - Collapsed State */}
      {!isExpanded && !analysis && (
        <div 
          onClick={() => setIsExpanded(true)}
          className="card-elevated rounded-2xl p-6 border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 cursor-pointer hover:border-yellow-500/50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Briefcase className="w-7 h-7 text-yellow-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">Premium Feature</span>
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">FREE</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Career Intelligence Report</h3>
              <p className="text-muted-foreground text-sm">Upload your CV to unlock personalized executive-level career insights matched to your cognitive profile</p>
            </div>
            <ArrowRight className="w-6 h-6 text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      )}

      {/* Expanded Upload State */}
      <AnimatePresence>
        {isExpanded && !analysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card-elevated rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">Exclusive</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">Career Intelligence Report</h3>
                    <p className="text-muted-foreground">The insights executives pay $5,000+ for at top consulting firms</p>
                  </div>
                </div>
                <button onClick={() => setIsExpanded(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* What you'll get */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <Target className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Role Alignment Analysis</p>
                    <p className="text-muted-foreground text-xs">Best-fit C-suite positions for your cognitive DNA</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <MessageSquare className="w-5 h-5 text-orange-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Interview Power Statements</p>
                    <p className="text-muted-foreground text-xs">Ready-to-use phrases that leverage your profile</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                  <Linkedin className="w-5 h-5 text-[#0A66C2] mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Optimized LinkedIn Headline</p>
                    <p className="text-muted-foreground text-xs">AI-crafted positioning for recruiters</p>
                  </div>
                </div>
              </div>

              {/* Upload area */}
              <div className="mb-6">
                <label className="block">
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    file 
                      ? 'border-green-500/50 bg-green-500/5' 
                      : 'border-border hover:border-yellow-500/50 hover:bg-yellow-500/5'
                  }`}>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                    />
                    {file ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                        <div className="text-left">
                          <p className="font-medium text-foreground">{file.name}</p>
                          <p className="text-muted-foreground text-sm">{(file.size / 1024).toFixed(1)} KB • Ready to analyze</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="font-medium text-foreground mb-1">Drop your CV here or click to upload</p>
                        <p className="text-muted-foreground text-sm">PDF, Word, or text file • Max 10MB</p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-display font-bold text-lg py-7 rounded-xl transition-all disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Your Career DNA...
                  </>
                ) : (
                  <>
                    Generate My Career Intelligence Report
                    <Zap className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-center text-muted-foreground/60 text-xs mt-4">
                Your CV is processed securely and not stored permanently. Analysis powered by AI.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="card-elevated rounded-3xl p-8 border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Your Career Intelligence Report</h3>
                  <p className="text-muted-foreground">Personalized executive insights based on your cognitive profile</p>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-muted/30 rounded-2xl p-6 mb-6">
                <h4 className="font-display font-semibold text-lg mb-3 text-foreground">Executive Summary</h4>
                <p className="text-foreground leading-relaxed">{analysis.executiveSummary}</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl bg-muted/30">
                  <p className="text-3xl font-display font-bold text-yellow-400">{analysis.careerTrajectoryScore}</p>
                  <p className="text-muted-foreground text-sm">Career Trajectory Score</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/30">
                  <p className="text-3xl font-display font-bold text-green-400">{analysis.leadershipPotentialIndex}</p>
                  <p className="text-muted-foreground text-sm">Leadership Potential</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/30">
                  <p className="text-3xl font-display font-bold text-primary">{analysis.cognitiveRoleAlignment?.[0]?.alignmentScore || 85}%</p>
                  <p className="text-muted-foreground text-sm">Top Role Alignment</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/30">
                  <p className="text-3xl font-display font-bold text-secondary">{results.iq}</p>
                  <p className="text-muted-foreground text-sm">Cognitive Score</p>
                </div>
              </div>
            </div>

            {/* Role Alignment */}
            {analysis.cognitiveRoleAlignment?.length > 0 && (
              <div className="card-elevated rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-lg">Optimal Role Alignment</h4>
                </div>
                <div className="space-y-4">
                  {analysis.cognitiveRoleAlignment.slice(0, 3).map((role, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-display font-bold text-primary">{role.alignmentScore}%</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{role.role}</p>
                        <p className="text-muted-foreground text-sm">{role.reasoning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unique Strengths */}
            {analysis.uniqueStrengths?.length > 0 && (
              <div className="card-elevated rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Star className="w-5 h-5 text-secondary" />
                  </div>
                  <h4 className="font-display font-semibold text-lg">Your Unique Executive Strengths</h4>
                </div>
                <div className="space-y-4">
                  {analysis.uniqueStrengths.map((strength, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-muted/30">
                      <p className="font-semibold text-foreground mb-1">{strength.strength}</p>
                      <p className="text-muted-foreground text-sm mb-2">{strength.evidence}</p>
                      <p className="text-secondary text-sm font-medium">{strength.executiveValue}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interview Power Statements */}
            {analysis.interviewPowerStatements?.length > 0 && (
              <div className="card-elevated rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-display font-semibold text-lg">Interview Power Statements</h4>
                </div>
                <div className="space-y-3">
                  {analysis.interviewPowerStatements.map((statement, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-muted/30 flex items-start gap-3">
                      <span className="text-accent font-bold">"</span>
                      <p className="text-foreground italic">{statement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LinkedIn Section */}
            <div className="card-elevated rounded-2xl p-6 border border-[#0A66C2]/30 bg-gradient-to-br from-[#0A66C2]/5 to-transparent">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/20 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                </div>
                <h4 className="font-display font-semibold text-lg">Your Optimized LinkedIn Headline</h4>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 mb-4">
                <p className="text-foreground font-medium text-lg">{analysis.linkedInHeadline}</p>
              </div>
              <Button
                onClick={handleCopyHeadline}
                variant="outline"
                className="border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/10"
              >
                Copy Headline
              </Button>
            </div>

            {/* Executive Positioning */}
            <div className="card-elevated rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                </div>
                <h4 className="font-display font-semibold text-lg">Executive Positioning Strategy</h4>
              </div>
              <p className="text-foreground leading-relaxed">{analysis.executivePositioning}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
