interface HeadTreeMarkProps {
  className?: string;
}

/**
 * Minimal mark: stylized side-profile head facing right with a small
 * three-leaf tree growing from the crown. The accent leaf uses --gold.
 */
export const HeadTreeMark = ({ className }: HeadTreeMarkProps) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Side-profile head, facing right.
        Drawn as a single rounded outline: crown -> forehead -> nose ->
        lips -> chin -> neck. */}
    <path
      d="
        M22 56
        L22 48
        C16 46 12 41 12 34
        C12 23 21 14 32 14
        C40 14 47 19 49 27
        C50 31 49 34 47 36
        L44 38
        L44 42
        L40 42
        L40 48
        L26 48
      "
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Eye */}
    <circle cx="38" cy="29" r="1.1" fill="currentColor" />

    {/* Tree trunk emerging from crown */}
    <path
      d="M28 14 L28 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Three leaves — two navy, one gold accent */}
    <circle cx="24" cy="6" r="2.6" fill="currentColor" />
    <circle cx="30" cy="3" r="2.6" fill="currentColor" />
    <circle cx="33.5" cy="8.5" r="2.4" fill="hsl(var(--gold))" />
  </svg>
);
