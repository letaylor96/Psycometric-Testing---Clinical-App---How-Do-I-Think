import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Zap, ArrowRight, CheckCircle, Clock, Activity, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { SEOFooter } from '@/components/SEOFooter';

const faqs = [
  {
    q: 'Is this an official ADHD diagnosis?',
    a: 'No. This is a screening tool based on the WHO ASRS-v1.1 (Adult ADHD Self-Report Scale), combined with cognitive style profiling. It can indicate whether ADHD traits are likely present and whether you should seek professional evaluation.',
  },
  {
    q: 'What does the ADHD test include?',
    a: 'Our assessment has two phases: a 20-question cognitive style analysis and an 18-question ADHD screening using the clinically-validated WHO ASRS-v1.1 questionnaire, totaling 38 questions.',
  },
  {
    q: 'How long does the ADHD assessment take?',
    a: 'The full neurodivergent mind assessment takes approximately 19 minutes to complete.',
  },
  {
    q: 'What will my results show?',
    a: 'You\'ll receive a neurodivergent likelihood score, ADHD indicator analysis (inattention and hyperactivity subtypes), a cognitive style radar chart across 6 dimensions, and synergy insights showing how your cognitive patterns interact.',
  },
  {
    q: 'Do I need ADHD to take this test?',
    a: 'Not at all. This assessment is for anyone curious about their cognitive style and attention patterns. Many people discover unique processing strengths they didn\'t know they had.',
  },
];

const ADHDTest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStart = () => {
    navigate('/?startAssessment=neurodivergent');
  };

  return (
    <>
      <Helmet>
        <title>ADHD Test Online — Free Screening + Cognitive Style | How Do I Think?</title>
        <meta name="description" content="Free ADHD screening using the WHO ASRS-v1.1 clinical questionnaire combined with cognitive style profiling. 38 questions, instant results with neurodivergent likelihood score." />
        <link rel="canonical" href="https://how-do-i-think-clinical.lovable.app/adhd-test" />
        <meta property="og:title" content="ADHD Test Online — Free Clinical Screening" />
        <meta property="og:description" content="Screen for ADHD with the WHO ASRS-v1.1 questionnaire. Get your neurodivergent likelihood score and cognitive style analysis." />
        <meta property="og:url" content="https://how-do-i-think-clinical.lovable.app/adhd-test" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <section className="pt-16 pb-12 sm:pt-24 sm:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium mb-6">
                <Zap className="w-4 h-4" />
                WHO ASRS-v1.1 Based
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                ADHD Test Online
              </h1>

              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                Free ADHD screening using the clinically-validated WHO ASRS-v1.1 questionnaire, 
                combined with comprehensive cognitive style profiling. Understand your attention patterns and neurodivergent traits.
              </p>

              <Button onClick={handleStart} size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-6 text-base">
                Start ADHD Screening
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 38 questions</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-500" /> ~19 minutes</span>
                <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-primary" /> Cognitive radar</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Clinically validated</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-5 bg-card border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-amber-500/5">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              Understand Your Mind Better
            </h2>
            <p className="text-muted-foreground mb-6">Clinically-validated ADHD screening + cognitive style analysis.</p>
            <Button onClick={handleStart} size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-6 text-base">
              Take the ADHD Test Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        <SEOFooter />
      </div>
    </>
  );
};

export default ADHDTest;
