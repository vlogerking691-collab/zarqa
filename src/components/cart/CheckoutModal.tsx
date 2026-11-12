import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useCart } from '@/hooks/useCart';
import {
  buildOrderWhatsAppLink,
  createOrderReference,
  placeCodOrder,
  type PlacedOrder,
} from '@/lib/orders';
import { formatPKR } from '@/lib/format';
import { BUSINESS } from '@/lib/business';
import {
  EMPTY_CHECKOUT,
  normalizeCheckout,
  validateCheckout,
  type CheckoutDetails,
  type CheckoutErrors,
} from '@/lib/checkout';

interface CheckoutModalProps {
  onClose: () => void;
}

const INPUT_CLASS =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-charcoal-900 placeholder:text-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600/20';

const FIELDS: {
  name: Exclude<keyof CheckoutDetails, 'notes'>;
  label: string;
  placeholder: string;
  autoComplete: string;
  type?: string;
}[] = [
  { name: 'customerName', label: 'Customer / Boutique Name', placeholder: 'e.g. Noor Boutique', autoComplete: 'organization' },
  { name: 'phone', label: 'Phone / WhatsApp Number', placeholder: '0300 0000000', autoComplete: 'tel', type: 'tel' },
  { name: 'city', label: 'City', placeholder: 'e.g. Lahore', autoComplete: 'address-level2' },
  { name: 'address', label: 'Full Delivery Address', placeholder: 'Street, area, landmark', autoComplete: 'street-address' },
];

export function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { lines, subtotal, clearCart } = useCart();
  const [details, setDetails] = useState<CheckoutDetails>(EMPTY_CHECKOUT);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const canSubmit = lines.length > 0 && !isSubmitting;

  const updateField = (name: keyof CheckoutDetails, value: string) => {
    setDetails((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    const validationErrors = validateCheckout(details);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const normalized = normalizeCheckout(details);
    const orderId = crypto.randomUUID();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await placeCodOrder(orderId, normalized, lines, subtotal);
      setPlacedOrder({
        id: orderId,
        reference: createOrderReference(orderId),
        details: normalized,
        lines,
        subtotal,
      });
      clearCart();
    } catch {
      setSubmitError(
        `We could not place your order just now. Please try again, or message us on WhatsApp at ${BUSINESS.phoneDisplay}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (placedOrder) {
    return <OrderConfirmation order={placedOrder} onDone={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Checkout">
      <button type="button" aria-label="Close checkout" onClick={onClose} className="absolute inset-0 animate-fade-in bg-charcoal-900/60 backdrop-blur-[2px]" />

      <div className="relative flex max-h-[94vh] w-full max-w-4xl animate-fade-up flex-col overflow-hidden rounded-t-3xl bg-ivory shadow-2xl sm:rounded-3xl">
        <header className="flex items-center justify-between border-b border-charcoal-900/10 px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-700">Secure Checkout</p>
            <h2 className="mt-1 text-2xl font-semibold text-emerald-900">Delivery Details</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-semibold text-charcoal-600 transition-colors hover:bg-charcoal-100"
          >
            Close
          </button>
        </header>

        <div className="grid flex-1 gap-0 overflow-y-auto lg:grid-cols-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-6 p-6 sm:p-8 lg:col-span-3">
            <div className="grid gap-5 sm:grid-cols-2">
              {FIELDS.map((field) => {
                const error = errors[field.name];
                const wide = field.name === 'address';
                return (
                  <div key={field.name} className={wide ? 'sm:col-span-2' : ''}>
                    <label htmlFor={`checkout-${field.name}`} className="mb-2 block text-sm font-semibold text-charcoal-800">
                      {field.label}
                    </label>
                    {field.name === 'address' ? (
                      <textarea
                        id={`checkout-${field.name}`}
                        rows={3}
                        value={details.address}
                        onChange={(event) => updateField('address', event.target.value)}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        aria-invalid={Boolean(error)}
                        className={`${INPUT_CLASS} ${error ? 'border-error-600' : 'border-charcoal-200 focus:border-emerald-600'}`}
                      />
                    ) : (
                      <input
                        id={`checkout-${field.name}`}
                        type={field.type ?? 'text'}
                        value={details[field.name]}
                        onChange={(event) => updateField(field.name, event.target.value)}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        aria-invalid={Boolean(error)}
                        className={`${INPUT_CLASS} ${error ? 'border-error-600' : 'border-charcoal-200 focus:border-emerald-600'}`}
                      />
                    )}
                    {error && <p className="mt-1.5 text-xs font-medium text-error-600">{error}</p>}
                  </div>
                );
              })}

              <div className="sm:col-span-2">
                <label htmlFor="checkout-notes" className="mb-2 block text-sm font-semibold text-charcoal-800">
                  Order Notes <span className="font-normal text-charcoal-500">(optional)</span>
                </label>
                <textarea
                  id="checkout-notes"
                  rows={2}
                  value={details.notes}
                  onChange={(event) => updateField('notes', event.target.value)}
                  placeholder="Preferred designs, colour mix, delivery timing..."
                  className={`${INPUT_CLASS} border-charcoal-200 focus:border-emerald-600`}
                />
              </div>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-charcoal-800">Payment Method</legend>
              <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-emerald-700 bg-emerald-50 p-4">
                <input type="radio" name="payment" value="cod" checked readOnly className="h-4 w-4 accent-emerald-700" />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-emerald-900">Cash on Delivery (COD) - All Over Pakistan</span>
                  <span className="mt-0.5 text-xs text-charcoal-600">Pay in cash when your order arrives.</span>
                </span>
              </label>
            </fieldset>

            {submitError && (
              <p role="alert" className="rounded-xl bg-error-100 px-4 py-3 text-sm font-medium text-error-800">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-emerald-700 text-sm font-semibold text-ivory transition-all duration-300 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-charcoal-300 disabled:text-charcoal-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Placing your order...
                </>
              ) : (
                `Place Order · ${formatPKR(subtotal)}`
              )}
            </button>
            {lines.length === 0 && (
              <p className="text-center text-xs text-charcoal-500">Your cart is empty. Add suits to place an order.</p>
            )}
          </form>

          <aside className="border-t border-charcoal-900/10 bg-white p-6 sm:p-8 lg:col-span-2 lg:border-l lg:border-t-0">
            <h3 className="text-lg font-semibold text-emerald-900">Order Summary</h3>
            <ul className="mt-5 space-y-4">
              {lines.map((line) => (
                <li key={line.product.id} className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-charcoal-700">
                    {line.product.name}
                    <span className="block text-xs text-charcoal-500">
                      {line.quantity} sets x {formatPKR(line.product.price)}
                    </span>
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-charcoal-900">{formatPKR(line.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-charcoal-100 pt-5">
              <span className="font-semibold text-charcoal-800">Total (COD)</span>
              <span className="font-serif text-2xl font-semibold text-emerald-900 tabular-nums">{formatPKR(subtotal)}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmation({ order, onDone }: { order: PlacedOrder; onDone: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Order confirmed">
      <button type="button" aria-label="Close" onClick={onDone} className="absolute inset-0 animate-fade-in bg-charcoal-900/60 backdrop-blur-[2px]" />

      <div className="relative w-full max-w-lg animate-fade-up rounded-3xl bg-ivory p-8 text-center shadow-2xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
          <CheckCircle2 className="h-9 w-9 text-success-600" />
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-emerald-900">Order Received</h2>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
          Thank you, {order.details.customerName}. Your order reference is
        </p>
        <p className="mt-2 font-serif text-2xl font-semibold tracking-wider text-gold-700">{order.reference}</p>

        <div className="mt-8 rounded-2xl bg-white p-5 text-left shadow-sm">
          <ul className="space-y-3 text-sm">
            {order.lines.map((line) => (
              <li key={line.product.id} className="flex justify-between gap-4">
                <span className="text-charcoal-700">
                  {line.product.name} <span className="text-charcoal-500">x {line.quantity}</span>
                </span>
                <span className="font-semibold tabular-nums text-charcoal-900">{formatPKR(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-charcoal-100 pt-4 font-semibold text-charcoal-900">
            <span>Total (Cash on Delivery)</span>
            <span className="tabular-nums">{formatPKR(order.subtotal)}</span>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-charcoal-600">
          Send your order summary to our team on WhatsApp so we can confirm dispatch.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={buildOrderWhatsAppLink(order)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#128C7E] text-sm font-semibold text-white transition-colors hover:bg-[#0E6F64]"
          >
            <MessageCircle className="h-5 w-5" />
            Send Order Summary on WhatsApp
          </a>
          <button
            type="button"
            onClick={onDone}
            className="h-12 rounded-full text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}
