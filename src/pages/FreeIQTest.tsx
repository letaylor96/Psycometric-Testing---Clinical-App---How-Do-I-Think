import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Brain, ArrowRight, CheckCircle, Clock, BarChart3, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { SEOFooter } from '@/components/SEOFooter';

const faqs = [
  {
    q: 'What does this free IQ test measure?',
    a: "Our test measures fluid intelligence through pattern recognition and abstract reasoning, based on Raven's Progressive Matrices — the same framework used in Mensa admission tests.",
  },
  {
    q: 'How accurate is an online IQ test?',
    a: 'While no online test replaces a clinical assessment, our 25-question test uses validated psychometric methods and provides a reliable estimate of your cognitive ability with percentile rankings.',
  },
  {
    q: 'How long does the IQ test take?',
    a: 'The test takes approximately 13 minutes with 25 questions. Each question is timed to measure both accuracy and processing speed.',
  },
  {
    q: 'Is this IQ test really free?',
    a: 'Yes, the full 25-question IQ assessment is completely free. You get your IQ score, percentile ranking, and cognitive breakdown at no cost.',
  },
  {
    q: 'What is a good IQ score?',
    a: 'The average IQ is 100. Scores above 115 are considered above average (top 16%), above 130 is gifted (top 2%), and above 145 is genius-level (top 0.1%).',
  },
];

const FreeIQTest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStart = () => {
    navigate('/?startAssessment=iq');
  };

  return (
    <>
      <Helmet>
        <title>Free IQ Test Online — Mensa-Style Pattern Recognition | How Do I Think?</title>
        <meta name="description" content="Take our free IQ test with 25 Mensa-style pattern recognition questions. Get your IQ score, percentile ranking, and cognitive analysis instantly. No signup required." />
        <link rel="canonical" href="https://how-do-i-think-clinical.lovable.app/free-iq-test" />
        <meta property="og:title" content="Free IQ Test — 25 Mensa-Style Questions" />
        <meta property="og:description" content="Measure your intelligence with our free pattern recognition IQ test. Get your score and global percentile instantly." />
        <meta property="og:url" content="https://how-do-i-think-clinical.lovable.app/free-iq-test" />
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
        {/* Hero */}
        <section className="pt-16 pb-12 sm:pt-24 sm:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                <Brain className="w-4 h-4" />
                Free · No Signup Required
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Free IQ Test Online
              </h1>

              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                Measure your cognitive abilities with 25 Mensa-style pattern recognition questions. 
                Get your IQ score, global percentile ranking, and detailed cognitive breakdown — completely free.
              </p>

              <Button onClick={handleStart} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base">
                Start Free IQ Test
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 25 questions</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> ~13 minutes</span>
                <span className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-amber-500" /> Instant results</span>
                <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-yellow" /> Percentile ranking</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground text-center mb-8">
              What You'll Discover
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: 'IQ Score', desc: 'Your estimated IQ based on validated psychometric methods and pattern recognition accuracy.' },
                { title: 'Global Percentile', desc: 'See where you rank compared to the global population using standard normal distribution.' },
                { title: 'Cognitive Breakdown', desc: 'Understand your strengths in abstract reasoning, spatial logic, and sequential pattern detection.' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
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

        {/* Bottom CTA */}
        <section className="py-12 sm:py-16 bg-primary/5">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              Ready to Find Out Your IQ?
            </h2>
            <p className="text-muted-foreground mb-6">Free, instant results, no signup required.</p>
            <Button onClick={handleStart} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base">
              Take the Free IQ Test Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        <SEOFooter />
      </div>
    </>
  );
};

export default FreeIQTest;
