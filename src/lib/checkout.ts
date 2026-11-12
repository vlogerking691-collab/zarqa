export interface CheckoutDetails {
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutDetails, string>>;

export const EMPTY_CHECKOUT: CheckoutDetails = {
  customerName: '',
  phone: '',
  city: '',
  address: '',
  notes: '',
};

export function validateCheckout(details: CheckoutDetails): CheckoutErrors {
  const errors: CheckoutErrors = {};
  const name = details.customerName.trim();
  const phoneDigits = details.phone.replace(/\D/g, '');
  const city = details.city.trim();
  const address = details.address.trim();

  if (name.length < 2) errors.customerName = 'Please enter your name or boutique name.';
  if (!/^\+?[\d\s-]+$/.test(details.phone.trim()) || phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = 'Enter a valid WhatsApp number, for example 0300 2286654.';
  }
  if (city.length < 2) errors.city = 'Please enter your city.';
  if (address.length < 5) errors.address = 'Please enter your full delivery address.';
  if (details.notes.trim().length > 1000) errors.notes = 'Notes must be under 1000 characters.';

  return errors;
}

export function normalizeCheckout(details: CheckoutDetails): CheckoutDetails {
  return {
    customerName: details.customerName.trim(),
    phone: details.phone.trim(),
    city: details.city.trim(),
    address: details.address.trim(),
    notes: details.notes.trim(),
  };
}
