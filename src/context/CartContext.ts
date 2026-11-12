import { createContext } from 'react';
import type { Product } from '@/data/products';

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addProduct: (product: Product) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
