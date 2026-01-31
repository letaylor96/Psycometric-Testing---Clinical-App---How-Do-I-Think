import { motion } from 'framer-motion';
import { AnalysisFramework, frameworkInfo } from '@/data/depthPsychologyQuestions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FrameworkSelectorProps {
  onSelect: (framework: AnalysisFramework) => void;
  onBack: () => void;
}

export const FrameworkSelector = ({ onSelect, onBack }: FrameworkSelectorProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Choose Your Lens
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The same 20 questions will be analyzed through your chosen philosophical framework. 
            Each offers a unique perspective on the human psyche.
          </p>
        </div>

        {/* Framework Cards */}
        <div className="grid gap-4 md:gap-6">
          {(Object.entries(frameworkInfo) as [AnalysisFramework, typeof frameworkInfo[AnalysisFramework]][]).map(
            ([key, info], index) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelect(key)}
                className={cn(
                  'w-full text-left p-6 rounded-2xl border border-border',
                  'card-elevated transition-all duration-300',
                  'hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'text-4xl flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-xl',
                    key === 'freudian' && 'bg-red-500/10',
                    key === 'jungian' && 'bg-purple-500/10',
                    key === 'nietzschean' && 'bg-amber-500/10',
                  )}>
                    {info.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-xl font-semibold">{info.name}</h3>
                    </div>
                    <p className={cn('text-sm font-medium mb-2', info.color)}>
                      {info.thinker}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-2" />
                </div>
              </motion.button>
            )
          )}
        </div>

        {/* Info Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Each framework offers valid insights. You can retake the assessment with a different lens anytime.
        </motion.p>
      </motion.div>
    </div>
  );
};
