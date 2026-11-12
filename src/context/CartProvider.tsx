import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { PRODUCTS, type Product } from '@/data/products';
import { CartContext, type CartLine } from '@/context/CartContext';

const STORAGE_KEY = 'zarqa-cart';
const MAX_QUANTITY = 999;

interface StoredLine {
  productId: string;
  quantity: number;
}

const productById = new Map(PRODUCTS.map((product) => [product.id, product]));

function readStoredLines(): StoredLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is StoredLine =>
        typeof entry?.productId === 'string' &&
        typeof entry?.quantity === 'number' &&
        productById.has(entry.productId),
    );
  } catch {
    return [];
  }
}

function clampQuantity(quantity: number, product: Product): number {
  return Math.min(MAX_QUANTITY, Math.max(product.minOrder, Math.floor(quantity)));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredLine[]>(readStoredLines);

  const commit = useCallback((next: StoredLine[]) => {
    setStored(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const addProduct = useCallback(
    (product: Product) => {
      setStored((current) => {
        const existing = current.find((line) => line.productId === product.id);
        const next = existing
          ? current.map((line) =>
              line.productId === product.id
                ? { ...line, quantity: clampQuantity(line.quantity + product.minOrder, product) }
                : line,
            )
          : [...current, { productId: product.id, quantity: product.minOrder }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const setQuantity = useCallback(
    (productId: string, quantity: number) => {
      const product = productById.get(productId);
      if (!product) return;
      commit(
        stored.map((line) =>
          line.productId === productId ? { ...line, quantity: clampQuantity(quantity, product) } : line,
        ),
      );
    },
    [commit, stored],
  );

  const removeProduct = useCallback(
    (productId: string) => commit(stored.filter((line) => line.productId !== productId)),
    [commit, stored],
  );

  const clearCart = useCallback(() => commit([]), [commit]);

  const lines = useMemo<CartLine[]>(
    () =>
      stored.flatMap((line) => {
        const product = productById.get(line.productId);
        if (!product) return [];
        return [{ product, quantity: line.quantity, lineTotal: product.price * line.quantity }];
      }),
    [stored],
  );

  const itemCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.lineTotal, 0), [lines]);

  const value = useMemo(
    () => ({ lines, itemCount, subtotal, addProduct, setQuantity, removeProduct, clearCart }),
    [lines, itemCount, subtotal, addProduct, setQuantity, removeProduct, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
