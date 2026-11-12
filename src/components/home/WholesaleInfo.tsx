import { BadgeCheck, Banknote, Package, Truck, Store } from 'lucide-react';
import { WHOLESALE_IMAGE } from '@/data/products';

const BENEFITS = [
  { icon: Store, title: 'Factory Wholesale Rates', text: 'Direct pricing from the source in Azam Market, with no middlemen.' },
  { icon: Package, title: 'Bulk Orders for Retailers', text: 'Built for boutiques, retailers and resellers buying in volume.' },
  { icon: Banknote, title: 'Cash on Delivery', text: 'Pay on delivery anywhere in Pakistan. No advance payment needed.' },
  { icon: Truck, title: 'Fast Dispatch from Lahore', text: 'Orders are packed and dispatched quickly from our Lahore outlet.' },
];

const STEPS = [
  'Choose your designs and the number of sets you need.',
  'Enter your boutique details and delivery address at checkout.',
  'Confirm your order on WhatsApp and we will get it moving.',
];

export function WholesaleInfo() {
  return (
    <section id="wholesale" className="relative overflow-hidden bg-emerald-900 py-20 text-ivory lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">Wholesale Info</p>
          <h2 className="mt-4 text-3xl font-semibold text-ivory sm:text-4xl lg:text-5xl">
            Built for Retailers, Boutiques &amp; Resellers
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-emerald-50/85">
            Zarqa Traders supplies premium unstitched ladies' suits to shops across Pakistan. Buy directly from our
            Azam Market wholesale outlet and keep your margins where they belong.
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit.title}
                className="group rounded-2xl border border-gold-500/25 bg-emerald-800/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:bg-emerald-800"
              >
                <benefit.icon className="h-6 w-6 text-gold-300 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-semibold text-ivory">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-50/80">{benefit.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl bg-ivory p-6 text-charcoal-900">
            <h3 className="text-lg font-semibold text-emerald-900">How to order</h3>
            <ol className="mt-4 space-y-3">
              {STEPS.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-charcoal-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-emerald-900">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-800">
              <BadgeCheck className="h-4 w-4" />
              Minimum order is 3 sets per design.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] border border-gold-500/40" />
          <img
            src={WHOLESALE_IMAGE}
            alt="Colourful fabric bolts displayed at a Lahore textile market"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-2xl lg:aspect-[4/5]"
          />
        </div>
      </div>
    </section>
  );
}
