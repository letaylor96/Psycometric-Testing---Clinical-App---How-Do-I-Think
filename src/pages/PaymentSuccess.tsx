import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, XCircle, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type VerificationStatus = 'verifying' | 'success' | 'error';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState<VerificationStatus>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const sessionId = searchParams.get('session_id');
  const assessmentType = searchParams.get('type');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setStatus('error');
        setErrorMessage('No session ID provided');
        return;
      }

      if (!user) {
        setStatus('error');
        setErrorMessage('Please log in to verify your payment');
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId },
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data?.success) {
          // Store premium access in localStorage
          localStorage.setItem('premiumAccess', 'true');
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMessage(data?.message || 'Payment verification failed');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Failed to verify payment');
      }
    };

    verifyPayment();
  }, [sessionId, user]);

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        {status === 'verifying' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Verifying Payment
            </h1>
            <p className="text-muted-foreground">
              Please wait while we confirm your purchase...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Welcome to Premium!
              </h1>
              <div className="flex items-center justify-center gap-2 text-primary mb-6">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">All features unlocked</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-xl p-6 border border-border mb-6"
            >
              <h2 className="font-semibold text-foreground mb-4">You now have access to:</h2>
              <ul className="space-y-3 text-left">
                {[
                  'All 4 comprehensive assessments',
                  'Full detailed reports & insights',
                  'Historical Mind Match',
                  'Therapist-ready clinical report',
                  'Ask AI about your results',
                  'Cross-test synergy analysis',
                ].map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <Button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              size="lg"
            >
              Start Exploring
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Verification Failed
            </h1>
            <p className="text-muted-foreground mb-6">
              {errorMessage || 'Something went wrong with your payment verification.'}
            </p>
            <div className="space-y-3">
              <Button onClick={handleContinue} variant="outline" className="w-full">
                Return Home
              </Button>
              <p className="text-xs text-muted-foreground">
                If you were charged, please contact support with your payment details.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
