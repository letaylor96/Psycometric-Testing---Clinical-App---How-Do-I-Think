import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';

const instruments = [
  { name: 'Kolb Learning Style Inventory', use: 'Experiential learning style — concrete/abstract × active/reflective.' },
  { name: 'Sternberg Triarchic Theory', use: 'Analytical, creative, and practical intelligence balance.' },
  { name: 'Kirton Adaption-Innovation (KAI)', use: 'Preferred style for problem-solving and change.' },
  { name: 'MSTAT-II (Tolerance for Ambiguity)', use: 'How comfortably you operate in ambiguous, novel situations.' },
  { name: 'Technology Readiness Index (TRI 2.0)', use: 'Optimism, innovativeness, discomfort, and insecurity toward new tech.' },
  { name: 'Big Five (OCEAN) Inventory', use: 'Trait-level personality across openness, conscientiousness, extraversion, agreeableness, neuroticism.' },
  { name: 'WHO ASRS v1.1 (Parts A + B)', use: 'Adult attention and focus self-report screener.' },
  { name: 'Autism-Spectrum Quotient (AQ-50)', use: 'Self-report inventory across five domains of social and sensory processing.' },
];

const Research = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Research & Instruments | How Do I Think?</title>
      <meta name="description" content="The instruments and frameworks behind the How Do I Think? Cognitive Style & AI Readiness Profile — Kolb, Sternberg, KAI, MSTAT-II, TRI 2.0, OCEAN, ASRS, and AQ-50." />
      <link rel="canonical" href="https://howdoithink.com/research" />
    </Helmet>

    <header className="border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
    </header>

    <main className="max-w-3xl mx-auto px-6 py-16">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal/30 bg-teal-soft/60 text-[10px] uppercase tracking-[0.24em] text-teal font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-teal" /> Research foundation
      </span>
      <h1 className="font-serif text-3xl sm:text-5xl font-medium text-foreground mt-5 mb-5 leading-tight">
        Built on established instruments.
      </h1>
      <p className="text-ink-muted text-lg leading-relaxed mb-10">
        The profile composes items adapted from peer-reviewed psychometric instruments. Self-report only — educational, not clinical or diagnostic.
      </p>

      <div className="space-y-3">
        {instruments.map((i) => (
          <div key={i.name} className="p-5 bg-card border border-border rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-soft border border-teal/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-teal" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-serif text-base font-medium text-foreground">{i.name}</h3>
              <p className="text-ink-muted text-sm mt-1 leading-relaxed">{i.use}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-ink-muted text-xs italic mt-10 leading-relaxed">
        Results are intended for self-reflection and program guidance. They are not a substitute for clinical assessment, diagnosis, or therapy. Please consult a qualified professional for clinical concerns.
      </p>
    </main>
  </div>
);

export default Research;
