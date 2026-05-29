import { Link } from 'react-router-dom';

export const SEOFooter = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-md border border-border bg-background flex items-center justify-center">
                <span className="font-serif text-[10px] font-semibold tracking-wider text-foreground">HDT</span>
              </div>
              <span className="font-serif text-base font-medium text-foreground">How Do I Think</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A structured cognitive and AI-readiness self-assessment, built to support Applied AI Works Canada participants.
            </p>
          </div>

          {/* Modules */}
          <div>
            <h4 className="font-medium text-foreground text-sm mb-3">Modules</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/free-iq-test" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Cognitive Reasoning</Link>
              <Link to="/personality-test" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Personality Profile</Link>
              <Link to="/adhd-test" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Attention & Focus Patterns</Link>
              <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">All modules</Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-medium text-foreground text-sm mb-3">Information</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/auth" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Sign In</Link>
              <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Home</Link>
            </nav>
            <p className="text-muted-foreground/60 text-xs mt-4 leading-relaxed">
              © {new Date().getFullYear()} How Do I Think · An Applied AI Works Canada assessment. Structured self-assessment for reflection and program use; not a clinical diagnostic tool.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

