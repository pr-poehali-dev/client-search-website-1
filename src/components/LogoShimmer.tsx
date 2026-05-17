export default function LogoShimmer({ size }: { size: "nav" | "footer" }) {
  const h = size === "nav" ? 40 : 28;
  const id = `shimmer-${size}`;
  return (
    <svg height={h} viewBox="0 0 287 67" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff">
            <animate attributeName="offset" values="-1;0;1" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="30%" stopColor="#4db8ff">
            <animate attributeName="offset" values="-0.7;0.3;1.3" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="60%" stopColor="#ffffff">
            <animate attributeName="offset" values="-0.4;0.6;1.6" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="85%" stopColor="#4db8ff">
            <animate attributeName="offset" values="-0.1;0.85;1.85" dur="2.5s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#0066ff">
            <animate attributeName="offset" values="0;1;2" dur="2.5s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        <filter id={`glow-${size}`}>
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Building icon */}
      <g filter={`url(#glow-${size})`} fill={`url(#${id})`}>
        <polygon points="8,54 8,28 28,14 48,28 48,54" />
        <polygon points="4,54 4,32 8,29 8,54" opacity="0.6" />
        <rect x="8" y="34" width="40" height="3" opacity="0.4" />
        <rect x="8" y="42" width="40" height="3" opacity="0.4" />
        <polygon points="12,14 28,4 44,14 28,10" opacity="0.8" />
      </g>
      {/* IT-technology text */}
      <text x="58" y="26" fontFamily="Oswald, sans-serif" fontSize="13" fontWeight="500" letterSpacing="1" fill={`url(#${id})`} filter={`url(#glow-${size})`}>
        IT-technology
      </text>
      {/* D-Service text */}
      <text x="56" y="56" fontFamily="Oswald, sans-serif" fontSize="32" fontWeight="700" letterSpacing="1" fill={`url(#${id})`} filter={`url(#glow-${size})`}>
        D-Service
      </text>
    </svg>
  );
}
