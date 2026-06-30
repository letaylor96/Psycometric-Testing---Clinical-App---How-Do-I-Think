import { useEffect, useState } from 'react';
import { Download, Smartphone, Share, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const isStandalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(display-mode: standalone)').matches ||
    // @ts-expect-error iOS Safari
    window.navigator.standalone === true);

const detectPlatform = () => {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'other';
};

interface InstallAppButtonProps {
  variant?: 'header' | 'hero' | 'inline';
  className?: string;
}

export const InstallAppButton = ({ variant = 'inline', className }: InstallAppButtonProps) => {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showIosSheet, setShowIosSheet] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    setPlatform(detectPlatform());
    setInstalled(isStandalone());

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed) return null;

  const handleClick = async () => {
    if (deferred) {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      return;
    }
    // iOS Safari has no programmatic install — show instructions.
    // Also fallback for any browser without the prompt event.
    setShowIosSheet(true);
  };

  const baseClasses =
    variant === 'header'
      ? 'h-9 px-3 sm:px-4 text-xs sm:text-sm bg-navy-deep text-cream hover:bg-navy'
      : variant === 'hero'
      ? 'bg-gold text-navy-deep hover:bg-gold/90 font-medium px-7 py-5 text-sm'
      : 'bg-navy-deep text-cream hover:bg-navy font-medium px-6 py-4 text-sm';

  return (
    <>
      <Button
        onClick={handleClick}
        size={variant === 'header' ? 'sm' : 'lg'}
        className={cn(baseClasses, className)}
        aria-label="Install How Do I Think on your device"
      >
        {variant === 'header' ? (
          <>
            <Smartphone className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">Get the app</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download the app
          </>
        )}
      </Button>

      {showIosSheet && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="install-title"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowIosSheet(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-background border border-border rounded-t-2xl sm:rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src="/icon-192.png" alt="" className="w-12 h-12 rounded-xl" />
                <div>
                  <h3 id="install-title" className="font-serif text-base font-medium text-foreground">
                    Install on your phone
                  </h3>
                  <p className="text-ink-muted text-xs">Works offline-free, no app store</p>
                </div>
              </div>
              <button
                onClick={() => setShowIosSheet(false)}
                aria-label="Close"
                className="text-ink-muted hover:text-foreground p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {platform === 'ios' ? (
              <ol className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-soft text-teal text-xs font-semibold flex items-center justify-center">
                    1
                  </span>
                  <span className="flex-1 flex items-center gap-1 flex-wrap">
                    Tap the <Share className="inline w-4 h-4 text-teal" /> Share button in Safari.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-soft text-teal text-xs font-semibold flex items-center justify-center">
                    2
                  </span>
                  <span className="flex-1 flex items-center gap-1 flex-wrap">
                    Choose <Plus className="inline w-4 h-4 text-teal" /> <b>Add to Home Screen</b>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-soft text-teal text-xs font-semibold flex items-center justify-center">
                    3
                  </span>
                  <span className="flex-1">Tap <b>Add</b> — the app icon appears on your home screen.</span>
                </li>
              </ol>
            ) : platform === 'android' ? (
              <ol className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-soft text-teal text-xs font-semibold flex items-center justify-center">
                    1
                  </span>
                  <span className="flex-1">Open the browser menu (⋮ top-right in Chrome).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-soft text-teal text-xs font-semibold flex items-center justify-center">
                    2
                  </span>
                  <span className="flex-1">Tap <b>Install app</b> or <b>Add to Home screen</b>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-soft text-teal text-xs font-semibold flex items-center justify-center">
                    3
                  </span>
                  <span className="flex-1">Confirm — the app icon appears on your home screen.</span>
                </li>
              </ol>
            ) : (
              <div className="text-sm text-foreground space-y-3">
                <p>To install on your phone, open this page in your phone's browser:</p>
                <div className="p-3 bg-cream-warm/60 border border-border rounded-lg text-xs font-mono break-all">
                  {typeof window !== 'undefined' ? window.location.origin : ''}
                </div>
                <p className="text-ink-muted text-xs">
                  On iPhone use Safari → Share → Add to Home Screen. On Android use Chrome → menu → Install app.
                </p>
              </div>
            )}

            <Button
              onClick={() => setShowIosSheet(false)}
              className="w-full mt-5 bg-navy-deep text-cream hover:bg-navy"
            >
              Got it
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
