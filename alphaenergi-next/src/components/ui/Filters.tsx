"use client";

type Props = { label: string; items: { id: string; label: string }[]; value: string; onChange: (id: string) => void; light?: boolean };

export function Filters({ label, items, value, onChange, light = false }: Props) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {items.map((f) => {
        const on = f.id === value;
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(f.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-[transform,background-color,color,border-color] duration-300 active:scale-95 ${
              on ? (light ? "border-white bg-white text-deep" : "border-fg bg-fg text-bg") : light ? "border-white/40 text-white hover:border-white" : "border-line text-fg hover:border-fg"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
