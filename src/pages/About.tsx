import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const About = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>About | How Do I Think?</title>
      <meta name="description" content="How Do I Think? is a structured self-assessment built by BOCG in support of Applied AI Works Canada, a not-for-profit." />
      <link rel="canonical" href="https://howdoithink.com/about" />
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
        <span className="w-1.5 h-1.5 rounded-full bg-teal" /> About
      </span>
      <h1 className="font-serif text-3xl sm:text-5xl font-medium text-foreground mt-5 mb-6 leading-tight">
        A structured self-assessment for how you think, learn, and work with AI.
      </h1>

      <div className="space-y-6 text-ink-muted text-base leading-relaxed">
        <p>
          <strong className="text-foreground">How Do I Think?</strong> helps participants understand how they think, learn, solve problems, communicate, and adapt to AI-enabled work — through a structured cognitive style and AI-readiness profile.
        </p>
        <p>
          It is built by <a href="https://bocg.ca" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline inline-flex items-center gap-1">BOCG <ExternalLink className="w-3 h-3" /></a> in support of <a href="https://appliedaiworks.ca" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline inline-flex items-center gap-1">Applied AI Works Canada <ExternalLink className="w-3 h-3" /></a>, a not-for-profit working to expand equitable access to AI literacy and AI-enabled work in Canada.
        </p>
        <p>
          The profile is grounded in established psychometric frameworks (Kolb, Sternberg, KAI, MSTAT-II, TRI 2.0, OCEAN, ASRS, AQ-50) and is intended for self-reflection and program guidance — not clinical assessment, diagnosis, or therapy.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-12">
        <a href="https://bocg.ca" target="_blank" rel="noopener noreferrer" className="p-6 bg-card border border-border rounded-2xl hover:border-teal/40 transition-colors">
          <h3 className="font-serif text-lg font-medium text-foreground mb-1">BOCG</h3>
          <p className="text-ink-muted text-sm">The team building How Do I Think?</p>
          <span className="text-teal text-sm inline-flex items-center gap-1 mt-3">bocg.ca <ExternalLink className="w-3 h-3" /></span>
        </a>
        <a href="https://appliedaiworks.ca" target="_blank" rel="noopener noreferrer" className="p-6 bg-card border border-border rounded-2xl hover:border-gold/40 transition-colors">
          <h3 className="font-serif text-lg font-medium text-foreground mb-1">Applied AI Works Canada</h3>
          <p className="text-ink-muted text-sm">Not-for-profit partner.</p>
          <span className="text-gold text-sm inline-flex items-center gap-1 mt-3">appliedaiworks.ca <ExternalLink className="w-3 h-3" /></span>
        </a>
      </div>
    </main>
  </div>
);

export default About;
