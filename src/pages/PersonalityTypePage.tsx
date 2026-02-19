import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Users, Briefcase, Heart, Brain, Zap, Target, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { SEOFooter } from '@/components/SEOFooter';
import { mbtiTypes, allMBTICodes } from '@/data/mbtiTypes';

const PersonalityTypePage = () => {
  const { typeCode } = useParams<{ typeCode: string }>();
  const navigate = useNavigate();
  const type = typeCode ? mbtiTypes[typeCode.toLowerCase()] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [typeCode]);

  if (!type) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Type Not Found</h1>
          <Button onClick={() => navigate('/personality-test')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Personality Test
          </Button>
        </div>
      </div>
    );
  }

  const handleStart = () => {
    navigate('/?startAssessment=personality');
  };

  const canonicalUrl = `https://how-do-i-think-clinical.lovable.app/personality/${typeCode?.toLowerCase()}`;

  return (
    <>
      <Helmet>
        <title>{type.code} Personality Type — {type.name} | How Do I Think?</title>
        <meta name="description" content={`${type.code} (${type.name}): ${type.description.slice(0, 140)}...`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${type.code} — ${type.name} Personality Type`} />
        <meta property="og:description" content={type.tagline} />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": type.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Back nav */}
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <Link to="/personality-test" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All Personality Types
          </Link>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-10 sm:pt-12 sm:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                <Brain className="w-4 h-4" />
                {type.rarity}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-2">
                <span className="font-mono text-primary">{type.code}</span> — {type.name}
              </h1>
              <p className="text-muted-foreground text-base italic mb-6">"{type.tagline}"</p>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8">{type.description}</p>

              <Button onClick={handleStart} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base">
                Discover Your Type
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Strengths & Weaknesses */}
        <section className="py-10 sm:py-14 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <div className="p-6 bg-card border border-border rounded-xl h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-primary" />
                    <h2 className="font-serif text-xl font-semibold text-foreground">Core Strengths</h2>
                  </div>
                  <ul className="space-y-2">
                    {type.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">✓</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                <div className="p-6 bg-card border border-border rounded-xl h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-accent" />
                    <h2 className="font-serif text-xl font-semibold text-foreground">Growth Areas</h2>
                  </div>
                  <ul className="space-y-2">
                    {type.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-accent mt-0.5">→</span>{w}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cognitive Stack */}
        <section className="py-10 sm:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground text-center mb-6">
              <BookOpen className="w-6 h-6 inline mr-2 text-primary" />
              Cognitive Function Stack
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {type.cognitiveStack.map((fn, i) => (
                <div key={i} className="p-4 bg-card border border-border rounded-xl flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground">{fn}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Relationships & Work */}
        <section className="py-10 sm:py-14 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-accent" />
                  <h2 className="font-serif text-xl font-semibold text-foreground">{type.code} in Relationships</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{type.inRelationships}</p>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Most Compatible:</p>
                  <div className="flex flex-wrap gap-2">
                    {type.compatibleTypes.map((t) => (
                      <Link
                        key={t}
                        to={`/personality/${t.toLowerCase()}`}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-mono border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {t}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-card border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h2 className="font-serif text-xl font-semibold text-foreground">{type.code} at Work</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{type.atWork}</p>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Ideal Career Paths:</p>
                  <div className="flex flex-wrap gap-2">
                    {type.careerPaths.map((c, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Famous Examples */}
        <section className="py-10 sm:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-6">
              <Users className="w-6 h-6 inline mr-2 text-primary" />
              Famous {type.code}s
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {type.famousExamples.map((name, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-card border border-border text-foreground text-sm font-medium">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 sm:py-14 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground text-center mb-8">
              {type.code} Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {type.faqs.map((faq, i) => (
                <div key={i} className="p-5 bg-card border border-border rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Browse All Types */}
        <section className="py-10 sm:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Explore All 16 Types</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {allMBTICodes.map((code) => {
                const t = mbtiTypes[code];
                const isActive = code === typeCode?.toLowerCase();
                return (
                  <Link
                    key={code}
                    to={`/personality/${code}`}
                    className={`px-3 py-2 rounded-lg text-sm font-mono font-bold border transition-colors ${
                      isActive
                        ? 'bg-primary/20 border-primary/40 text-primary'
                        : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                    }`}
                  >
                    {t.code}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 bg-primary/5">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              Are You Really {type.code}?
            </h2>
            <p className="text-muted-foreground mb-6">Take the full Big Five + MBTI personality assessment to find out.</p>
            <Button onClick={handleStart} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base">
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

export default PersonalityTypePage;
