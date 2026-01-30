import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Lock, Check, Sparkles, Brain, Target, MessageCircle, FileText, ChevronRight, CreditCard, Shield, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface PremiumGateProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked?: () => void;
  feature?: string;
}

const premiumFeatures = [
  { icon: Brain, label: 'Blind Spot Analysis', color: 'text-amber-500' },
  { icon: Target, label: 'Peer & Percentile Comparison', color: 'text-blue-500' },
  { icon: Crown, label: 'Historical Mind Match', color: 'text-yellow-500' },
  { icon: FileText, label: 'Therapist-ready clinical report', color: 'text-emerald-500' },
  { icon: MessageCircle, label: 'Ask AI about your results', color: 'text-violet-500' },
  { icon: Sparkles, label: 'Cross-test synergy analysis', color: 'text-pink-500' },
];

export const PremiumGate = ({ isOpen, onClose, onUnlocked, feature }: PremiumGateProps) => {
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { unlockWithCode } = usePremiumAccess();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isApplyingCode, setIsApplyingCode] = useState(false);

  const handlePromoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to use a promo code');
      onClose();
      navigate('/auth');
      return;
    }

    setIsApplyingCode(true);
    try {
      const success = await unlockWithCode(promoCode);
      if (success) {
        toast.success('Premium access unlocked!');
        onUnlocked?.();
        onClose();
      } else {
        toast.error('Invalid code');
      }
    } catch {
      toast.error('Failed to apply code');
    } finally {
      setIsApplyingCode(false);
    }
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please sign in to purchase premium access');
      onClose();
      navigate('/auth');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-assessment-payment', {
        body: { assessmentType: 'bundle' },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to start checkout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary/20 via-amber-500/10 to-transparent p-6 pb-4">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-serif">Unlock Premium</DialogTitle>
                <p className="text-muted-foreground text-sm">Full access to all features</p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 pt-2">
          {/* What they tried to access */}
          {feature && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">You're unlocking:</span>
                <span className="font-medium text-foreground">{feature}</span>
              </div>
            </div>
          )}

          {/* Premium features list */}
          <div className="space-y-2 mb-6">
            <p className="text-sm font-medium text-foreground mb-3">Premium includes:</p>
            {premiumFeatures.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 text-sm"
              >
                <div className={`w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center`}>
                  <Check className="w-3 h-3 text-emerald-500" />
                </div>
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Price */}
          <div className="text-center mb-4">
            <div className="inline-flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">$9.99</span>
              <span className="text-muted-foreground text-sm line-through">$29.99</span>
            </div>
            <p className="text-muted-foreground text-xs mt-1">One-time payment · Lifetime access</p>
          </div>

          {/* Payment Button */}
          <Button 
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold py-6 mb-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Unlock Premium Access
              </>
            )}
          </Button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Secure checkout</span>
            </div>
            <span>•</span>
            <span>Powered by Stripe</span>
          </div>

          {/* Promo code section */}
          <div className="border-t border-border/50 pt-4">
            {!showPromoInput ? (
              <button
                onClick={() => setShowPromoInput(true)}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Have an access code? <ChevronRight className="w-3 h-3 inline" />
              </button>
            ) : (
              <form onSubmit={handlePromoSubmit} className="space-y-3">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter access code..."
                  className="text-center uppercase tracking-widest"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="flex-1"
                    onClick={() => setShowPromoInput(false)}
                    disabled={isApplyingCode}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="secondary" 
                    className="flex-1"
                    disabled={isApplyingCode}
                  >
                    {isApplyingCode ? 'Applying...' : 'Apply Code'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
