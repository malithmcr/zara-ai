/** Decorative “3D” hero — SVG only, no external assets. */
const IntroHero = () => (
  <div className="relative flex justify-center" aria-hidden>
    <svg
      viewBox="0 0 280 260"
      className="h-[min(48vw,220px)] w-[min(48vw,220px)] max-h-[240px] max-w-[min(100%,260px)]"
      fill="none"
    >
      <defs>
        <linearGradient id="intro-sheen" x1="18%" y1="12%" x2="88%" y2="92%">
          <stop stopColor="#38cdb7" />
          <stop offset="0.45" stopColor="#a5b4fc" />
          <stop offset="1" stopColor="#fda4af" />
        </linearGradient>
        <linearGradient id="intro-depth" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0f172a" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="intro-glow" cx="50%" cy="42%" r="55%">
          <stop stopColor="#38cdb7" stopOpacity="0.35" />
          <stop offset="1" stopColor="#38cdb7" stopOpacity="0" />
        </radialGradient>
        <filter id="intro-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="140" cy="200" rx="108" ry="28" fill="url(#intro-glow)" />
      <g filter="url(#intro-soft)" opacity="0.95">
        <ellipse
          cx="140"
          cy="118"
          rx="92"
          ry="34"
          stroke="url(#intro-sheen)"
          strokeWidth="44"
          strokeLinecap="round"
          transform="rotate(-8 140 118)"
        />
        <ellipse
          cx="140"
          cy="118"
          rx="92"
          ry="34"
          fill="url(#intro-depth)"
          opacity="0.35"
          transform="rotate(-8 140 118)"
        />
      </g>
      <ellipse
        cx="140"
        cy="118"
        rx="92"
        ry="34"
        stroke="url(#intro-sheen)"
        strokeWidth="6"
        opacity="0.5"
        transform="rotate(-8 140 118)"
      />
    </svg>
  </div>
);

export const AssistantAvatar = () => (
  <div
    className="mt-0.5 size-7 shrink-0 rounded-lg bg-linear-to-br from-[#38cdb7] via-indigo-300 to-rose-300 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset]"
    aria-hidden
  />
);

export default IntroHero;
