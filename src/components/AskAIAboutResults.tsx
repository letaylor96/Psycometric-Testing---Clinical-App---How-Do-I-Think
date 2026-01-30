import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { TestResults, categoryLabels } from '@/data/quizQuestions';
import { PersonalityResults, personalityTraitLabels, PersonalityTrait } from '@/data/personalityQuestions';
import { ADHDResults, adhdDomainLabels } from '@/data/adhdQuestions';
import { CognitiveStyleResults, dimensionLabels } from '@/data/cognitiveStyleQuestions';
import { MessageCircle, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AskAIAboutResultsProps {
  iqResults: TestResults | null;
  personalityResults: PersonalityResults | null;
  adhdResults: ADHDResults | null;
  cognitiveStyleResults: CognitiveStyleResults | null;
}

export const AskAIAboutResults = ({
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
}: AskAIAboutResultsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasAnyResults = iqResults || personalityResults || adhdResults || cognitiveStyleResults;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const buildResultsContext = (): string => {
    const sections: string[] = [];

    if (iqResults) {
      sections.push(`IQ Assessment: Score ${iqResults.iq}, ${iqResults.totalCorrect}/${iqResults.totalQuestions} correct.`);
      sections.push(`Primary strength: ${categoryLabels[iqResults.primaryStrength]}`);
      sections.push(`Divergent thinking type: ${iqResults.divergentType}`);
    }

    if (personalityResults) {
      sections.push(`Personality Type: ${personalityResults.personalityType} (${personalityResults.mbti.type})`);
      sections.push(`Dominant trait: ${personalityResults.dominantTrait}`);
      sections.push(`Big Five scores: ${(Object.entries(personalityResults.scores) as [PersonalityTrait, number][])
        .map(([t, s]) => `${personalityTraitLabels[t].label}: ${s}`)
        .join(', ')}`);
      sections.push(`Communication style: ${personalityResults.communicationStyle}`);
      sections.push(`Stress response: ${personalityResults.stressResponse}`);
    }

    if (adhdResults) {
      sections.push(`ADHD Screening: ${adhdResults.likelihood} likelihood`);
      sections.push(`Part A score: ${adhdResults.partAScore}/6 (${adhdResults.partAThreshold ? 'above' : 'below'} threshold)`);
      sections.push(`Inattention symptoms: ${adhdResults.inattentionPositive}/9, Hyperactivity: ${adhdResults.hyperactivityPositive}/9`);
    }

    if (cognitiveStyleResults) {
      sections.push(`Cognitive Profile: ${cognitiveStyleResults.primaryProfile.name}`);
      sections.push(`Processing style: ${cognitiveStyleResults.processingStyle}`);
      sections.push(`Dimension scores: ${cognitiveStyleResults.dimensionScores
        .map(d => `${dimensionLabels[d.dimension].label}: ${d.score}`)
        .join(', ')}`);
      if (cognitiveStyleResults.primaryProfile.neurodivergentTraits?.length > 0) {
        sections.push(`Neurodivergent indicators: ${cognitiveStyleResults.primaryProfile.neurodivergentTraits.join(', ')}`);
      }
    }

    return sections.join('\n');
  };

  const suggestedQuestions = [
    "What do my results say about my learning style?",
    "How might my personality affect my career choices?",
    "What are my cognitive strengths and how can I use them?",
    "Should I be concerned about my ADHD screening results?",
    "How do my different assessment results connect?",
  ];

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const resultsContext = buildResultsContext();
      
      const response = await supabase.functions.invoke('ask-about-results', {
        body: {
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          resultsContext,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to get AI response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.message || 'I apologize, but I encountered an issue. Please try again.',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again in a moment.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      // Add welcome message
      setMessages([{
        role: 'assistant',
        content: `Hello! I'm here to help you understand your assessment results. I have access to your:\n\n${
          iqResults ? '✓ IQ & Cognitive Assessment\n' : ''
        }${
          personalityResults ? '✓ Personality Profile\n' : ''
        }${
          adhdResults ? '✓ ADHD Screening\n' : ''
        }${
          cognitiveStyleResults ? '✓ Cognitive Style Assessment\n' : ''
        }\nFeel free to ask me anything about what your results mean, how they connect, or how to apply these insights in your life!`
      }]);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        disabled={!hasAnyResults}
        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Ask AI About My Results
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0 gap-0">
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <DialogTitle className="flex items-center gap-3 font-serif text-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              Ask AI About Your Results
            </DialogTitle>
            <DialogDescription>
              Get personalized insights about what your assessment results mean
            </DialogDescription>
          </DialogHeader>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                      message.role === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions - only show when no messages yet */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 3).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your results..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={!input.trim() || isLoading} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
