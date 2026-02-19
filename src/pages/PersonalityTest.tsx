import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Target, ArrowRight, CheckCircle, Clock, Users, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { SEOFooter } from '@/components/SEOFooter';
import { allMBTICodes, mbtiTypes } from '@/data/mbtiTypes';

const faqs = [
  {
    q: 'What personality model does this test use?',
    a: 'Our assessment uses the Big Five (OCEAN) model — the most scientifically validated personality framework in modern psychology. It measures Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
  },
  {
    q: 'How is this different from Myers-Briggs (MBTI)?',
    a: 'The Big Five model is backed by decades of peer-reviewed research and measures personality on a spectrum rather than binary categories, providing a more nuanced and scientifically accurate picture.',
  },
  {
    q: 'How many questions are there?',
    a: 'The personality assessment has 30 carefully crafted questions and takes approximately 15 minutes to complete.',
  },
  {
    q: 'What will I learn about myself?',
    a: 'You\'ll discover your personality archetype, your Big Five trait scores, your equivalent MBTI type, and detailed insights into how your personality affects your relationships, work style, and decision-making.',
  },
];

const PersonalityTest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStart = () => {
    navigate('/?startAssessment=personality');
  };

  return (
    <>
      <Helmet>
        <title>Personality Test — Big Five (OCEAN) Assessment | How Do I Think?</title>
        <meta name="description" content="Discover your personality type with our Big Five (OCEAN) assessment. 30 questions, scientifically validated. Get your personality archetype, MBTI equivalent, and trait analysis." />
        <link rel="canonical" href="https://how-do-i-think-clinical.lovable.app/personality-test" />
        <meta property="og:title" content="Personality Test — Big Five (OCEAN) Assessment" />
        <meta property="og:description" content="Discover your personality archetype with our scientifically-validated Big Five assessment." />
        <meta property="og:url" content="https://how-do-i-think-clinical.lovable.app/personality-test" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6">
                <Target className="w-4 h-4" />
                Big Five · OCEAN Model
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Personality Test
              </h1>

              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                Discover your personality archetype using the Big Five (OCEAN) model — 
                the gold standard in personality psychology. Get your trait scores, MBTI equivalent, and detailed insights.
              </p>

              <Button onClick={handleStart} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 text-base">
                Start Personality Test
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 30 questions</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-purple-400" /> ~15 minutes</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-amber-500" /> Big Five traits</span>
                <span className="flex items-center gap-1.5"><Fingerprint className="w-4 h-4 text-primary" /> Archetype match</span>
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

        {/* Browse All 16 Types */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-6">
              Explore All 16 Personality Types
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {allMBTICodes.map((code) => {
                const t = mbtiTypes[code];
                return (
                  <Link
                    key={code}
                    to={`/personality/${code}`}
                    className="p-3 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors text-center group"
                  >
                    <p className="font-mono font-bold text-lg text-primary group-hover:text-primary/80">{t.code}</p>
                    <p className="text-xs text-muted-foreground">{t.name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-purple-500/5">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              Understand Who You Really Are
            </h2>
            <p className="text-muted-foreground mb-6">Scientifically validated personality assessment.</p>
            <Button onClick={handleStart} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 text-base">
              Take the Personality Test
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        <SEOFooter />
      </div>
    </>
  );
};

export default PersonalityTest;
