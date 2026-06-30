import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Users, BarChart3, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Organizations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>For Organizations | How Do I Think?</title>
        <meta name="description" content="Bring the Cognitive Style & AI Readiness Profile to your team. Group-level insight into how your people think, learn, and adapt to AI-enabled work." />
        <link rel="canonical" href="https://howdoithink.com/organizations" />
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
          <span className="w-1.5 h-1.5 rounded-full bg-teal" /> For organizations
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-foreground mt-5 mb-5 leading-tight">
          Help your team understand how they think — and how they'll work with AI.
        </h1>
        <p className="text-ink-muted text-lg leading-relaxed mb-10">
          The How Do I Think? assessment gives organizations a structured, non-clinical view of cognitive style, learning patterns, and AI-readiness across teams — so leaders can design training, workflows, and AI rollouts that actually fit their people.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Users, title: 'Team profiles', body: 'Aggregated, anonymized view of how your team thinks and learns.' },
            { icon: BarChart3, title: 'AI-readiness baseline', body: 'Map who is ready to adopt AI workflows and who needs scaffolding.' },
            { icon: Building2, title: 'Custom rollouts', body: 'Tailored cohorts for hiring, L&D, and change-management programs.' },
          ].map((c) => (
            <div key={c.title} className="p-5 bg-card border border-border rounded-2xl">
              <c.icon className="w-5 h-5 text-teal mb-3" strokeWidth={1.5} />
              <h3 className="font-serif text-base font-medium text-foreground mb-1.5">{c.title}</h3>
              <p className="text-ink-muted text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-cream-warm border border-border">
          <h2 className="font-serif text-xl font-medium text-foreground mb-2">Talk to us</h2>
          <p className="text-ink-muted text-sm mb-5">Pilots start at 10 seats. We'll scope a rollout that fits your team.</p>
          <Button asChild className="bg-navy-deep text-cream hover:bg-navy">
            <a href="mailto:team@appliedaiworks.ca?subject=How%20Do%20I%20Think%20-%20Organizations">
              <Mail className="w-4 h-4 mr-2" /> team@appliedaiworks.ca
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Organizations;
