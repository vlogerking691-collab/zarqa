const MESSAGE =
  '✨ Cash on Delivery Available All Over Pakistan | Factory & Wholesale Rates | Bulk Orders for Retailers & Boutiques | Fast Dispatch from Lahore ✨';

function MarqueeSet({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {Array.from({ length: 3 }).map((_, index) => (
        <span key={index} className="flex items-center whitespace-nowrap px-6 text-sm font-medium tracking-wide">
          {MESSAGE}
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[37px] overflow-hidden bg-emerald-900 text-gold-200">
      <div className="flex h-full w-max animate-marquee items-center hover:[animation-play-state:paused]">
        <MarqueeSet />
        <MarqueeSet hidden />
      </div>
    </div>
  );
}
