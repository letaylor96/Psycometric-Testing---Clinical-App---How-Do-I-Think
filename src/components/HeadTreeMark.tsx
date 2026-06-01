interface HeadTreeMarkProps {
  className?: string;
}

/**
 * Side-profile head facing right with a small tree on the crown.
 * Strokes follow the brand: navy outline + gold accent leaf.
 * Uses currentColor for the head outline so it inherits text color.
 */
export const HeadTreeMark = ({ className }: HeadTreeMarkProps) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/*
      Side-profile head silhouette, facing right.
      Starts at back of neck, goes up the back of the head, over the
      crown, down the forehead, out for the nose, in for the lips,
      out for the chin, then down the throat.
    */}
    <path
      d="
        M16 56
        L16 46
        Q10 44 9 36
        Q8 28 12 22
        Q17 14 26 13
        Q38 12 44 20
        Q49 27 47 34
        Q46 38 43 38
        L43 42
        L40 42
        Q40 46 36 47
        L33 48
        L33 56
      "
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Nose bump on the profile (front of face, mid-height) */}
    <path
      d="M44 28 Q48 30 47 33 Q46 35 43 35"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Eye */}
    <circle cx="38" cy="27" r="1.2" fill="currentColor" />

    {/* Tree trunk rising from the crown */}
    <path
      d="M26 13 Q25 9 27 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />

    {/* Leaves — two navy, one gold accent */}
    <circle cx="22" cy="5" r="2.4" fill="currentColor" />
    <circle cx="28" cy="3" r="2.6" fill="currentColor" />
    <circle cx="32" cy="7" r="2.2" fill="hsl(var(--gold))" />
  </svg>
);
