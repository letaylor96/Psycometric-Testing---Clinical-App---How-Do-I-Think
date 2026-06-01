interface HeadTreeMarkProps {
  className?: string;
}

/**
 * Stylized side-profile head (facing left) with a small three-leaf tree
 * growing from the crown. Filled silhouette reads clearly at favicon size.
 * Uses currentColor for the head/trunk; gold accent leaf for warmth.
 */
export const HeadTreeMark = ({ className }: HeadTreeMarkProps) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Head silhouette, facing LEFT (nose on the left side, like the reference).
        Drawn clockwise from top of crown:
          crown -> forehead -> nose bridge -> nose tip -> philtrum ->
          lips -> chin -> jaw -> neck back -> up the back of skull.
    */}
    <path
      d="
        M32 14
        C42 14, 50 22, 50 32
        C50 38, 47 42, 44 44
        L44 52
        L26 52
        L26 48
        Q22 47, 21 43
        L18 43
        L18 39
        L14 39
        Q12 36, 13 32
        L10 32
        L14 28
        Q15 22, 19 18
        Q24 14, 32 14
        Z
      "
      fill="currentColor"
    />

    {/* Eye (small cream dot on the face for character) */}
    <circle cx="22" cy="30" r="1.4" fill="hsl(var(--cream))" />

    {/* Tree trunk rising from the crown, slight curve */}
    <path
      d="M34 14 Q33 9 35 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Leaves — two in brand color, one gold accent */}
    <circle cx="30" cy="4" r="2.6" fill="currentColor" />
    <circle cx="36" cy="2.5" r="2.6" fill="currentColor" />
    <circle cx="40" cy="7" r="2.4" fill="hsl(var(--gold))" />
  </svg>
);
