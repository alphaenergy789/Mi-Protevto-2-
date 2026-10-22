const base = { viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowElbowIcon = ({ className }: { className?: string }) => (
  <svg {...base} className={className} aria-hidden><path d="M5 5v8a2 2 0 0 0 2 2h8" /><path d="m11 11 4 4-4 4" transform="translate(0 -4)" /></svg>
);
export const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg {...base} className={className} aria-hidden><path d="M6 14 14 6M7 6h7v7" /></svg>
);
