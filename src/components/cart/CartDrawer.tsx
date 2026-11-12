import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { formatPKR } from '@/lib/format';

interface CartDrawerProps {
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ onClose, onCheckout }: CartDrawerProps) {
  const { lines, subtotal, itemCount, setQuantity, removeProduct } = useCart();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-charcoal-900/50 backdrop-blur-[2px]"
      />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in-right flex-col bg-ivory shadow-2xl">
        <header className="flex items-center justify-between border-b border-charcoal-900/10 px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold text-emerald-900">Your Cart</h2>
            <p className="mt-1 text-sm text-charcoal-500">
              {itemCount} {itemCount === 1 ? 'set' : 'sets'} selected
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-700 transition-colors hover:bg-charcoal-100"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <ShoppingBag className="h-7 w-7 text-emerald-700" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-charcoal-900">Your cart is empty</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
              Browse the wholesale collection and add suits to start your order.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 h-11 rounded-full bg-emerald-700 px-6 text-sm font-semibold text-ivory transition-colors hover:bg-emerald-800"
            >
              Browse the collection
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-charcoal-100 overflow-y-auto px-6">
            {lines.map(({ product, quantity, lineTotal }) => (
              <li key={product.id} className="flex gap-4 py-5">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="h-28 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold leading-snug text-charcoal-900">{product.name}</h3>
                    <button
                      type="button"
                      onClick={() => removeProduct(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="shrink-0 rounded-full p-1.5 text-charcoal-400 transition-colors hover:bg-error-100 hover:text-error-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-charcoal-500 tabular-nums">{formatPKR(product.price)} per set</p>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                    <div className="flex items-center rounded-full border border-charcoal-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        disabled={quantity <= product.minOrder}
                        aria-label="Decrease sets"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-700 transition-colors hover:bg-charcoal-100 disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label="Increase sets"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-700 transition-colors hover:bg-charcoal-100"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="font-serif text-base font-semibold text-emerald-800 tabular-nums">
                      {formatPKR(lineTotal)}
                    </p>
                  </div>
                  <p className="mt-2 text-[11px] text-charcoal-500">Minimum {product.minOrder} sets per design</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <footer className="border-t border-charcoal-900/10 bg-white px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-charcoal-600">Subtotal</span>
              <span className="font-serif text-2xl font-semibold text-emerald-900 tabular-nums">
                {formatPKR(subtotal)}
              </span>
            </div>
            <p className="mt-2 text-xs text-charcoal-500">Wholesale rates. Pay cash on delivery anywhere in Pakistan.</p>
            <button
              type="button"
              onClick={onCheckout}
              className="group mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-emerald-700 text-sm font-semibold text-ivory transition-all duration-300 hover:bg-emerald-800 active:scale-[0.99]"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
