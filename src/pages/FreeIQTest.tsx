import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Brain, ArrowRight, CheckCircle, Clock, BarChart3, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { SEOFooter } from '@/components/SEOFooter';

const faqs = [
  {
    q: 'What does the cognitive reasoning module measure?',
    a: "It measures fluid reasoning through pattern recognition tasks based on Raven's Progressive Matrices. It is one signal in your overall cognitive style profile, not a standalone score of intelligence.",
  },
  {
    q: 'Is this module a diagnostic instrument?',
    a: 'No. It is a structured self-assessment module used as part of program guidance. It is not a medical, psychological, educational, or diagnostic assessment.',
  },
  {
    q: 'How long does the reasoning module take?',
    a: 'Approximately 13 minutes for 25 questions. Each item is timed to indicate how you approach abstract pattern problems under time pressure.',
  },
  {
    q: 'How does this fit into the broader profile?',
    a: 'The reasoning module sits alongside the Cognitive Profile, Personality, Cognitive Style & Attention, and Depth Psychology modules. Together they describe thinking patterns, strengths, and support needs for participation in Applied AI Works Canada.',
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

  const handleStartProfile = () => {
    navigate('/?startAssessment=cognitive-profile');
  };

  return (
    <>
      <Helmet>
        <title>Cognitive Reasoning Module | How Do I Think?</title>
        <meta name="description" content="A structured cognitive reasoning module — 25 pattern recognition items grounded in Raven's Progressive Matrices. One signal in your Cognitive Style & AI Readiness Profile." />
        <link rel="canonical" href="https://how-do-i-think-clinical.lovable.app/free-iq-test" />
        <meta property="og:title" content="Cognitive Reasoning Module | How Do I Think?" />
        <meta property="og:description" content="A structured reasoning module that sits inside the Cognitive Style & AI Readiness Profile." />
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
                Reasoning module · No signup required
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Cognitive Reasoning Module
              </h1>

              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                A 25-item pattern recognition module that indicates how you approach abstract problems under time pressure. One signal in your Cognitive Style &amp; AI Readiness Profile — not a standalone score of intelligence.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleStartProfile} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base">
                  <Compass className="w-5 h-5 mr-2" />
                  Start with the full profile
                </Button>
                <Button onClick={handleStart} variant="outline" size="lg" className="font-semibold px-8 py-6 text-base">
                  Open reasoning module only
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 25 items</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> ~13 minutes</span>
                <span className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-amber-500" /> Instant results</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground text-center mb-8">
              What this module surfaces
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: 'Reasoning signal', desc: 'How you handle abstract pattern problems under time pressure — a single, neutral indicator within your wider profile.' },
                { title: 'Population comparison', desc: 'Where your performance sits compared to a normative reference, presented as a percentile range for context only.' },
                { title: 'Profile integration', desc: 'Feeds into your strengths and support needs alongside cognitive style, attention patterns, personality, and reflection.' },
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
              Frequently asked
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-5 bg-card border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/70 italic text-center mt-8 max-w-2xl mx-auto leading-relaxed">
              This tool is for self-understanding, learning support, and program guidance. It is not a medical, psychological, educational, or diagnostic assessment.
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 sm:py-16 bg-primary/5">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              Build the full Cognitive Style &amp; AI Readiness Profile
            </h2>
            <p className="text-muted-foreground mb-6">The reasoning module is one of several lenses. Start with the structured profile for the most useful program guidance.</p>
            <Button onClick={handleStartProfile} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base">
              Begin the Cognitive Profile
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
