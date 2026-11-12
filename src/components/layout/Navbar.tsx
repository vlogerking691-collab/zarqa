import { Gem, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CategoryFilter } from '@/data/products';
import { BrandMark } from '@/components/layout/BrandMark';
import { useCart } from '@/hooks/useCart';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: CategoryFilter) => void;
  onOpenCart: () => void;
}

const NAV_LINKS: { label: string; href: string; category?: CategoryFilter }[] = [
  { label: 'Home', href: '#home', category: 'all' },
  { label: 'Unstitched 3-Piece', href: '#catalog', category: 'unstitched' },
  { label: 'Embroidered', href: '#catalog', category: 'embroidered' },
  { label: 'Printed', href: '#catalog', category: 'printed' },
  { label: 'Wholesale Info', href: '#wholesale' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ searchQuery, onSearchChange, onSelectCategory, onOpenCart }: NavbarProps) {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (itemCount === 0) return;
    setBump((count) => count + 1);
  }, [itemCount]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    onSearchChange('');
  };

  const handleLinkClick = (category?: CategoryFilter) => {
    if (category) onSelectCategory(category);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-[37px] z-40 transition-all duration-500 ${
        isScrolled || isMenuOpen
          ? 'border-b border-charcoal-900/10 bg-ivory/95 shadow-md backdrop-blur-md'
          : 'border-b border-transparent bg-ivory/80 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <a href="#home" className="shrink-0" aria-label="Zarqa Traders home">
          <BrandMark />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => handleLinkClick(link.category)}
                className="group relative py-2 text-sm font-medium text-charcoal-700 transition-colors hover:text-emerald-700"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-600 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (isSearchOpen ? closeSearch() : setIsSearchOpen(true))}
            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
            aria-expanded={isSearchOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal-800 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open cart, ${itemCount} items`}
            className="relative flex h-11 items-center gap-2 rounded-full bg-emerald-700 px-4 text-sm font-semibold text-ivory transition-colors hover:bg-emerald-800"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            <span
              key={bump}
              className={`flex h-6 min-w-6 items-center justify-center rounded-full bg-gold-500 px-1.5 text-xs font-bold text-emerald-900 ${
                bump > 0 ? 'animate-bump' : ''
              }`}
            >
              {itemCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal-800 transition-colors hover:bg-emerald-50 lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="animate-fade-up border-t border-charcoal-900/10 bg-ivory">
          <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-400" />
              <input
                autoFocus
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') closeSearch();
                  if (event.key === 'Enter') {
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                placeholder="Search suits, fabrics, embroidered, printed..."
                aria-label="Search products"
                className="h-12 w-full rounded-full border border-charcoal-200 bg-white pl-12 pr-5 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="animate-fade-up border-t border-charcoal-900/10 bg-ivory lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => handleLinkClick(link.category)}
                  className="flex items-center justify-between border-b border-charcoal-100 py-4 text-base font-medium text-charcoal-800 transition-colors hover:text-emerald-700"
                >
                  {link.label}
                  <Gem className="h-4 w-4 text-gold-600" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
