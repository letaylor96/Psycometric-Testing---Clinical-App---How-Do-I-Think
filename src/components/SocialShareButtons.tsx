 import { useState } from 'react';
 import { Button } from '@/components/ui/button';
 import { Linkedin, Copy, Check } from 'lucide-react';
 import { cn } from '@/lib/utils';
 
 // X (Twitter) icon component
 const XIcon = ({ className }: { className?: string }) => (
   <svg viewBox="0 0 24 24" className={className} fill="currentColor">
     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
   </svg>
 );
 
 interface SocialShareButtonsProps {
   shareText: string;
   shareUrl?: string;
   linkedInText?: string;
   twitterText?: string;
   className?: string;
   size?: 'sm' | 'default';
 }
 
 export const SocialShareButtons = ({
   shareText,
   shareUrl = window.location.origin,
   linkedInText,
   twitterText,
   className,
   size = 'default',
 }: SocialShareButtonsProps) => {
   const [copied, setCopied] = useState(false);
 
   const handleCopy = async () => {
     await navigator.clipboard.writeText(shareText);
     setCopied(true);
     setTimeout(() => setCopied(false), 2000);
   };
 
   const handleLinkedInShare = () => {
     const text = encodeURIComponent(linkedInText || shareText);
     window.open(
       `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
       '_blank'
     );
   };
 
   const handleTwitterShare = () => {
     const text = encodeURIComponent(twitterText || shareText);
     window.open(
       `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`,
       '_blank'
     );
   };
 
   const buttonSize = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10';
   const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
 
   return (
     <div className={cn('flex items-center gap-2', className)}>
       <span className="text-sm text-muted-foreground mr-1">Share:</span>
       
       <Button
         variant="outline"
         size="icon"
         onClick={handleLinkedInShare}
         className={cn(
           buttonSize,
           'rounded-full border-[#0A66C2]/30 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/50 transition-all'
         )}
         title="Share on LinkedIn"
       >
         <Linkedin className={cn(iconSize, 'text-[#0A66C2]')} />
       </Button>
       
       <Button
         variant="outline"
         size="icon"
         onClick={handleTwitterShare}
         className={cn(
           buttonSize,
           'rounded-full border-foreground/20 hover:bg-foreground/5 hover:border-foreground/40 transition-all'
         )}
         title="Share on X (Twitter)"
       >
         <XIcon className={cn(iconSize)} />
       </Button>
       
       <Button
         variant="outline"
         size="icon"
         onClick={handleCopy}
         className={cn(
           buttonSize,
           'rounded-full transition-all',
           copied && 'border-green-500/50 bg-green-500/10'
         )}
         title={copied ? 'Copied!' : 'Copy to clipboard'}
       >
         {copied ? (
           <Check className={cn(iconSize, 'text-green-500')} />
         ) : (
           <Copy className={cn(iconSize, 'text-muted-foreground')} />
         )}
       </Button>
     </div>
   );
 };