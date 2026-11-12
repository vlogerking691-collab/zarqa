import type { CartLine } from '@/context/CartContext';
import { BUSINESS, whatsappLink } from '@/lib/business';
import { formatPKR } from '@/lib/format';
import type { CheckoutDetails } from '@/lib/checkout';
import { supabase } from '@/lib/supabase';

export interface PlacedOrder {
  id: string;
  reference: string;
  details: CheckoutDetails;
  lines: CartLine[];
  subtotal: number;
}

export function createOrderReference(orderId: string): string {
  return `ZT-${orderId.slice(0, 8).toUpperCase()}`;
}

export async function placeCodOrder(
  orderId: string,
  details: CheckoutDetails,
  lines: CartLine[],
  subtotal: number,
): Promise<void> {
  const { error } = await supabase.from('orders').insert({
    id: orderId,
    customer_name: details.customerName,
    phone: details.phone,
    city: details.city,
    address: details.address,
    notes: details.notes,
    items: lines.map((line) => ({
      productId: line.product.id,
      name: line.product.name,
      quantity: line.quantity,
      unitPrice: line.product.price,
      lineTotal: line.lineTotal,
    })),
    subtotal,
    payment_method: 'cod',
    status: 'pending',
  });

  if (error) throw error;
}

export function buildOrderWhatsAppLink(order: PlacedOrder): string {
  const itemLines = order.lines.map(
    (line, index) =>
      `${index + 1}. ${line.product.name} - ${line.quantity} sets x ${formatPKR(line.product.price)} = ${formatPKR(line.lineTotal)}`,
  );

  const message = [
    `Assalam o Alaikum ${BUSINESS.name},`,
    '',
    `I would like to place a wholesale order (Ref: ${order.reference}).`,
    '',
    'Order items:',
    ...itemLines,
    '',
    `Subtotal: ${formatPKR(order.subtotal)}`,
    'Payment: Cash on Delivery',
    '',
    `Name / Boutique: ${order.details.customerName}`,
    `WhatsApp: ${order.details.phone}`,
    `City: ${order.details.city}`,
    `Address: ${order.details.address}`,
    ...(order.details.notes ? [`Notes: ${order.details.notes}`] : []),
  ].join('\n');

  return whatsappLink(message);
}
