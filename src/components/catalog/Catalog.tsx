import { SearchX } from 'lucide-react';
import { useMemo } from 'react';
import { CATEGORY_LABELS, PRODUCTS, type CategoryFilter, type Product } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';

interface CatalogProps {
  activeCategory: CategoryFilter;
  searchQuery: string;
  onSelectCategory: (category: CategoryFilter) => void;
  onSearchChange: (query: string) => void;
}

const FILTER_TABS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'unstitched', label: 'Unstitched 3-Piece' },
  { value: 'embroidered', label: 'Embroidered Luxury' },
  { value: 'printed', label: 'Printed Lawn/Cambric' },
];

function matchesQuery(product: Product, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [product.name, product.fabric, CATEGORY_LABELS[product.category]].some((text) =>
    text.toLowerCase().includes(needle),
  );
}

export function Catalog({ activeCategory, searchQuery, onSelectCategory, onSearchChange }: CatalogProps) {
  const visibleProducts = useMemo(
    () =>
      PRODUCTS.filter(
        (product) =>
          (activeCategory === 'all' || product.category === activeCategory) && matchesQuery(product, searchQuery),
      ),
    [activeCategory, searchQuery],
  );

  const countFor = (category: CategoryFilter) =>
    PRODUCTS.filter((product) => (category === 'all' || product.category === category) && matchesQuery(product, searchQuery))
      .length;

  const resetFilters = () => {
    onSelectCategory('all');
    onSearchChange('');
  };

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-700">The Wholesale Collection</p>
          <h2 className="mt-4 text-3xl font-semibold text-emerald-900 sm:text-4xl lg:text-5xl">
            Unstitched Suits, Priced for Resale
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal-600">
            Lawn, chiffon, cambric and linen unstitched 3-piece sets, inspired by the lookbooks of Alkaram Studio and
            Sapphire. Add sets to your cart and check out with cash on delivery.
          </p>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Filter products by category"
        className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {FILTER_TABS.map((tab) => {
          const isActive = activeCategory === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(tab.value)}
              className={`flex h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'border-emerald-700 bg-emerald-700 text-ivory shadow-md shadow-emerald-900/20'
                  : 'border-charcoal-200 bg-white text-charcoal-700 hover:border-emerald-600 hover:text-emerald-700'
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
                  isActive ? 'bg-gold-500 text-emerald-900' : 'bg-charcoal-100 text-charcoal-600'
                }`}
              >
                {countFor(tab.value)}
              </span>
            </button>
          );
        })}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} categoryLabel={CATEGORY_LABELS[product.category]} />
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-charcoal-300 bg-white px-6 py-16 text-center">
          <SearchX className="h-10 w-10 text-charcoal-400" />
          <h3 className="mt-5 text-2xl font-semibold text-charcoal-900">No suits match your search</h3>
          <p className="mt-2 max-w-md text-sm text-charcoal-600">
            Try a different fabric or category, or browse the full wholesale collection.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 h-11 rounded-full bg-emerald-700 px-6 text-sm font-semibold text-ivory transition-colors hover:bg-emerald-800"
          >
            Show all suits
          </button>
        </div>
      )}
    </section>
  );
}
