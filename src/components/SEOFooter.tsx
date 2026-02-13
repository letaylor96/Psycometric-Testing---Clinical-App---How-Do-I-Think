import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

export const SEOFooter = () => {
  return (
    <footer className="border-t border-border bg-muted/20 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-yellow/20 flex items-center justify-center">
                <Brain className="w-4 h-4 text-yellow" />
              </div>
              <span className="font-serif text-base font-semibold text-foreground">How Do I Think</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Free scientifically-validated cognitive assessments. IQ test, personality assessment, ADHD screening, and depth psychology.
            </p>
          </div>

          {/* Assessments */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">Assessments</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/free-iq-test" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Free IQ Test</Link>
              <Link to="/personality-test" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Personality Test</Link>
              <Link to="/adhd-test" className="text-muted-foreground hover:text-foreground text-sm transition-colors">ADHD Test Online</Link>
              <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">All Assessments</Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">Information</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/auth" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Sign In</Link>
              <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Home</Link>
            </nav>
            <p className="text-muted-foreground/60 text-xs mt-4">
              © {new Date().getFullYear()} How Do I Think. These assessments are for educational purposes and do not constitute medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
