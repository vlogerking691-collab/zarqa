import { Check, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '@/data/products';
import { formatPKR } from '@/lib/format';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  categoryLabel: string;
}

export function ProductCard({ product, categoryLabel }: ProductCardProps) {
  const { addProduct, lines } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = lines.find((line) => line.product.id === product.id)?.quantity ?? 0;

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 1600);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  const handleAdd = () => {
    addProduct(product);
    setJustAdded(true);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-charcoal-900/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10">
      <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-100">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ivory/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800 shadow-sm">
          {categoryLabel}
        </span>
        {inCart > 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-emerald-700 px-3 py-1 text-[11px] font-semibold text-ivory shadow-sm">
            {inCart} sets in cart
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold leading-snug text-charcoal-900">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-500">{product.fabric}</p>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-charcoal-100 pt-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-400">Wholesale price</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-emerald-800 tabular-nums">
              {formatPKR(product.price)}
              <span className="ml-1.5 font-sans text-xs font-medium text-charcoal-500">/ set</span>
            </p>
          </div>
          <p className="rounded-full bg-gold-50 px-3 py-1.5 text-right text-xs font-semibold leading-tight text-gold-800">
            Min. order
            <br />
            {product.minOrder} sets
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            justAdded
              ? 'bg-gold-500 text-emerald-900'
              : 'bg-emerald-700 text-ivory hover:bg-emerald-800 active:scale-[0.98]'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
