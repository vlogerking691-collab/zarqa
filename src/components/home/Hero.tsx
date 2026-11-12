import { ArrowRight, MessageCircle, Package, Banknote, Store, Truck } from 'lucide-react';
import { HERO_IMAGE } from '@/data/products';
import { whatsappLink } from '@/lib/business';

const TRUST_POINTS = [
  { icon: Store, label: 'Factory wholesale rates' },
  { icon: Banknote, label: 'Cash on delivery nationwide' },
  { icon: Package, label: 'Minimum 3 sets per design' },
  { icon: Truck, label: 'Fast dispatch from Lahore' },
];

export function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-emerald-900 pt-[117px] lg:items-center">
      <img
        src={HERO_IMAGE}
        alt="Two women wearing luxury Pakistani unstitched embroidered eastern suits"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_30%] animate-fade-up"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-900 via-emerald-900/80 to-emerald-900/25" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ivory to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-24 lg:px-8 lg:pb-24">
        <div className="max-w-2xl">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.3em] text-gold-300 [animation-delay:100ms]">
            Azam Market, Lahore
          </p>
          <h1 className="animate-fade-up mt-5 text-4xl font-semibold leading-[1.1] text-ivory [animation-delay:200ms] sm:text-5xl lg:text-6xl">
            Premium Pakistani Unstitched Suits at Factory Wholesale Rates
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-emerald-50/90 [animation-delay:300ms] sm:text-lg">
            Direct from Azam Market, Lahore — Supplying Retailers, Boutiques &amp; Resellers Nationwide.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-3 [animation-delay:400ms] sm:flex-row">
            <a
              href="#catalog"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold-500 px-8 text-sm font-semibold text-emerald-900 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
            >
              Shop Wholesale Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ivory/60 px-8 text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ivory hover:text-emerald-900"
            >
              <MessageCircle className="h-4 w-4" />
              Order via WhatsApp
            </a>
          </div>

          <ul className="animate-fade-up mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ivory/20 pt-8 [animation-delay:500ms] sm:grid-cols-4">
            {TRUST_POINTS.map((point) => (
              <li key={point.label} className="flex items-start gap-2.5 text-sm text-emerald-50/90">
                <point.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <span>{point.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
