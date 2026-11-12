import { ExternalLink, Gem } from 'lucide-react';
import { BrandMark } from '@/components/layout/BrandMark';
import { BUSINESS, OPENING_HOURS, SOCIAL_LINKS, whatsappLink } from '@/lib/business';

export function Footer() {
  const socials = SOCIAL_LINKS.filter((link) => link.url);

  return (
    <footer className="bg-charcoal-900 text-charcoal-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <BrandMark tone="light" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-charcoal-300">
            Premium Pakistani ladies' unstitched suits at factory wholesale rates, supplied to retailers, boutiques
            and resellers across Pakistan.
          </p>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-serif text-lg text-ivory">
            <Gem className="h-4 w-4 text-gold-400" />
            Outlet
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-charcoal-300">{BUSINESS.address}</p>
          <a
            href={`tel:+${BUSINESS.whatsappNumber}`}
            className="mt-4 block text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
          >
            {BUSINESS.phoneDisplay}
          </a>
        </div>

        <div>
          <h3 className="font-serif text-lg text-ivory">Opening Hours</h3>
          <ul className="mt-5 space-y-2 text-sm text-charcoal-300">
            {OPENING_HOURS.map((slot) => (
              <li key={slot.label} className="flex justify-between gap-4">
                <span>{slot.label}</span>
                <span className="tabular-nums text-charcoal-200">{slot.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-ivory">Connect</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gold-300"
              >
                WhatsApp Orders
              </a>
            </li>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
                >
                  Zarqa Traders on {social.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
            <li>
              <a href="#catalog" className="transition-colors hover:text-gold-300">
                Shop the Collection
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal-700">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-charcoal-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Zarqa Traders. All rights reserved.</p>
          <p>Cash on Delivery available all over Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}
