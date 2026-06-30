import { useEffect, useState } from 'react';
import { Smartphone, X } from 'lucide-react';
import { InstallAppButton } from './InstallAppButton';
import { cn } from '@/lib/utils';

const DISMISS_KEY = 'install-banner-dismissed-at';
const DISMISS_TTL_MS = 1000 * 60 * 60 * 24 * 14; // 14 days

const isStandalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(display-mode: standalone)').matches ||
    // @ts-expect-error iOS
    window.navigator.standalone === true);

interface InstallAppBannerProps {
  className?: string;
  headline?: string;
  subline?: string;
}

export const InstallAppBanner = ({
  className,
  headline = 'Keep your profile close — install the app',
  subline = 'Save your results to your home screen for quick access on any device.',
}: InstallAppBannerProps) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (isStandalone()) return;
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw && Date.now() - Number(raw) < DISMISS_TTL_MS) return;
    } catch {
      /* ignore */
    }
    setHidden(false);
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setHidden(true);
  };

  return (
    <div
      className={cn(
        'relative my-6 overflow-hidden rounded-2xl border border-amber-300/40 bg-gradient-to-br from-[#0F1E3A] via-[#15264a] to-[#1d3155] p-5 sm:p-6 shadow-lg',
        className,
      )}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-3 rounded-full p-1.5 text-cream/60 hover:text-cream hover:bg-white/10 transition"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="shrink-0 rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 p-3 shadow-md">
            <Smartphone className="h-6 w-6 text-[#0F1E3A]" />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif text-lg sm:text-xl text-cream leading-tight">
              {headline}
            </h3>
            <p className="text-sm text-cream/70 mt-1">{subline}</p>
          </div>
        </div>
        <div className="shrink-0">
          <InstallAppButton variant="hero" />
        </div>
      </div>
    </div>
  );
};

export default InstallAppBanner;
