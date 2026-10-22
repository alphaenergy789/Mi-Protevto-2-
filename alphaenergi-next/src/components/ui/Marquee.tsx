type MarqueeProps = { items: readonly string[]; duration?: number; direction?: "left" | "right"; separator?: string; className?: string };

export function Marquee({ items, duration = 40, direction = "left", separator = "✦", className = "" }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden" aria-hidden>
      <div className="marquee-track" data-direction={direction} style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className={`flex shrink-0 items-center gap-8 pr-8 ${className}`}>
            <span>{item}</span>
            <span className="text-sun">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
