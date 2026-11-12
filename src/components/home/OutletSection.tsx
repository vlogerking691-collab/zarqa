import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { OUTLET_IMAGE } from '@/data/products';
import { BUSINESS, OPENING_HOURS, isShopOpenNow, whatsappLink } from '@/lib/business';

export function OutletSection() {
  const [isOpen, setIsOpen] = useState(() => isShopOpenNow());

  useEffect(() => {
    const timer = window.setInterval(() => setIsOpen(isShopOpenNow()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-700">Visit &amp; Contact</p>
          <h2 className="mt-4 text-3xl font-semibold text-emerald-900 sm:text-4xl lg:text-5xl">
            Visit Our Wholesale Outlet
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-charcoal-900/5 bg-white p-6 shadow-sm">
              <MapPin className="h-5 w-5 text-gold-700" />
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-charcoal-500">Address</h3>
              <p className="mt-2 text-base leading-relaxed text-charcoal-900">{BUSINESS.address}</p>
            </div>

            <div className="rounded-2xl border border-charcoal-900/5 bg-white p-6 shadow-sm">
              <Phone className="h-5 w-5 text-gold-700" />
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-charcoal-500">Phone / WhatsApp</h3>
              <a
                href={`tel:+${BUSINESS.whatsappNumber}`}
                className="mt-2 block text-lg font-semibold text-emerald-800 transition-colors hover:text-emerald-600"
              >
                {BUSINESS.phoneDisplay}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[#128C7E] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0E6F64]"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="rounded-2xl border border-charcoal-900/5 bg-white p-6 shadow-sm sm:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gold-700" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">Opening Hours</h3>
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    isOpen ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-success-600' : 'bg-error-600'}`} />
                  {isOpen ? 'Open now' : 'Closed now'}
                </span>
              </div>
              <ul className="mt-5 divide-y divide-charcoal-100">
                {OPENING_HOURS.map((slot) => (
                  <li key={slot.label} className="flex items-center justify-between py-3 text-sm">
                    <span className="font-medium text-charcoal-800">{slot.label}</span>
                    <span className="tabular-nums text-charcoal-600">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <img
            src={OUTLET_IMAGE}
            alt="Fabric stall at a Lahore market with colourful textiles"
            loading="lazy"
            className="h-full min-h-[360px] w-full rounded-3xl object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
