 import { useState } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 import { Brain, ArrowRight, Check, X, Zap, Lightbulb } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { cn } from '@/lib/utils';
 
 interface QuizTeaserProps {
   onStartQuiz: () => void;
 }
 
 const SAMPLE_QUESTION = {
   question: `What number continues this sequence?
 
 2,  4,  8,  16,  __`,
   options: ['24', '32', '20', '18'],
   correctAnswer: 1,
   explanation: 'Each number doubles: 2×2=4, 4×2=8, 8×2=16, 16×2=32',
 };
 
 export const QuizTeaser = ({ onStartQuiz }: QuizTeaserProps) => {
   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
   const [showResult, setShowResult] = useState(false);
 
   const handleSelectAnswer = (index: number) => {
     if (showResult) return;
     setSelectedAnswer(index);
     setShowResult(true);
   };
 
   const isCorrect = selectedAnswer === SAMPLE_QUESTION.correctAnswer;
 
   return (
     <section className="py-8 sm:py-12 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
       <div className="max-w-2xl mx-auto px-4 sm:px-6">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative"
         >
           {/* Header */}
           <div className="text-center mb-6">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-3">
               <Zap className="w-3.5 h-3.5" />
               Try a Sample Question
             </div>
             <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
               Test Your Pattern Recognition
             </h3>
           </div>
 
           {/* Question Card */}
           <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
             {/* Question */}
             <div className="mb-6">
               <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                 <Brain className="w-4 h-4" />
                 <span>IQ Assessment Preview</span>
               </div>
               <pre className="font-mono text-base sm:text-lg text-foreground whitespace-pre-wrap leading-relaxed">
                 {SAMPLE_QUESTION.question}
               </pre>
             </div>
 
             {/* Options */}
             <div className="grid grid-cols-2 gap-3 mb-6">
               {SAMPLE_QUESTION.options.map((option, index) => {
                 const isSelected = selectedAnswer === index;
                 const isCorrectOption = index === SAMPLE_QUESTION.correctAnswer;
                 
                 let buttonStyle = 'border-border hover:border-primary/50 hover:bg-primary/5';
                 if (showResult) {
                   if (isCorrectOption) {
                     buttonStyle = 'border-emerald-500 bg-emerald-500/10';
                   } else if (isSelected && !isCorrectOption) {
                     buttonStyle = 'border-red-500 bg-red-500/10';
                   } else {
                     buttonStyle = 'border-border opacity-50';
                   }
                 }
 
                 return (
                   <motion.button
                     key={index}
                     onClick={() => handleSelectAnswer(index)}
                     disabled={showResult}
                     whileHover={!showResult ? { scale: 1.02 } : {}}
                     whileTap={!showResult ? { scale: 0.98 } : {}}
                     className={cn(
                       'relative p-4 rounded-xl border-2 text-lg font-mono font-bold text-foreground transition-all',
                       buttonStyle,
                       !showResult && 'cursor-pointer'
                     )}
                   >
                     {option}
                     {showResult && isCorrectOption && (
                       <Check className="absolute top-2 right-2 w-5 h-5 text-emerald-500" />
                     )}
                     {showResult && isSelected && !isCorrectOption && (
                       <X className="absolute top-2 right-2 w-5 h-5 text-red-500" />
                     )}
                   </motion.button>
                 );
               })}
             </div>
 
             {/* Result & CTA */}
             <AnimatePresence mode="wait">
               {showResult ? (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0 }}
                   className="space-y-4"
                 >
                   {/* Result Message */}
                   <div className={cn(
                     'p-4 rounded-xl flex items-start gap-3',
                     isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-amber-500/10 border border-amber-500/30'
                   )}>
                     <div className={cn(
                       'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                       isCorrect ? 'bg-emerald-500/20' : 'bg-amber-500/20'
                     )}>
                       {isCorrect ? (
                         <Check className="w-4 h-4 text-emerald-500" />
                       ) : (
                         <Lightbulb className="w-4 h-4 text-amber-500" />
                       )}
                     </div>
                     <div>
                       <p className={cn(
                         'font-semibold mb-1',
                         isCorrect ? 'text-emerald-500' : 'text-amber-500'
                       )}>
                         {isCorrect ? 'Correct! Nice pattern recognition.' : 'Good try!'}
                       </p>
                       <p className="text-muted-foreground text-sm">
                         {SAMPLE_QUESTION.explanation}
                       </p>
                     </div>
                   </div>
 
                   {/* CTA */}
                   <Button
                     onClick={onStartQuiz}
                     size="lg"
                     className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                   >
                     {isCorrect ? 'Challenge Yourself with 25 Questions' : 'Take the Full Assessment'}
                     <ArrowRight className="w-4 h-4 ml-2" />
                   </Button>
                   
                   <p className="text-center text-muted-foreground text-xs">
                     Free · 25 questions · Get your IQ score instantly
                   </p>
                 </motion.div>
               ) : (
                 <motion.p
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="text-center text-muted-foreground text-sm"
                 >
                   Click an answer to see if you're right
                 </motion.p>
               )}
             </AnimatePresence>
           </div>
 
           {/* Social Proof */}
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="mt-6 text-center"
           >
             <p className="text-muted-foreground text-sm">
               Join thousands who've discovered their cognitive profile
             </p>
           </motion.div>
         </motion.div>
       </div>
     </section>
   );
 };