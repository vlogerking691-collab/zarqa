import { Gem } from 'lucide-react';

interface BrandMarkProps {
  tone?: 'dark' | 'light';
}

export function BrandMark({ tone = 'dark' }: BrandMarkProps) {
  const textClass = tone === 'light' ? 'text-ivory' : 'text-emerald-900';
  return (
    <span className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 ring-1 ring-gold-500/60">
        <Gem className="h-5 w-5 text-gold-400" strokeWidth={1.75} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-xl font-semibold tracking-wide ${textClass}`}>Zarqa Traders</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-700">
          Wholesale Lahore
        </span>
      </span>
    </span>
  );
}
