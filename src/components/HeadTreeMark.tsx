interface HeadTreeMarkProps {
  className?: string;
}

/**
 * Minimal line mark: side-profile head with a small tree growing from the crown.
 * Uses currentColor so it inherits text color.
 */
export const HeadTreeMark = ({ className }: HeadTreeMarkProps) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Head — side profile facing right */}
    <path
      d="M14 38 V30 c-3-1-4-4-4-7 0-7 5-12 12-12 6 0 11 4 12 10 0 2-0 4-1 6-1 1-1 2-1 3 v3 h-3 v5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Trunk */}
    <path
      d="M22 11 V3"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    {/* Branches / leaves cluster */}
    <circle cx="19" cy="4" r="2" fill="currentColor" />
    <circle cx="25" cy="4" r="2" fill="currentColor" />
    <circle cx="22" cy="1.5" r="2" fill="currentColor" />
    {/* Small accent leaf in warm tone */}
    <circle cx="26.5" cy="6.5" r="1.4" fill="hsl(var(--gold))" />
  </svg>
);
