export const BUSINESS = {
  name: 'Zarqa Traders',
  whatsappNumber: '923002286654',
  phoneDisplay: '+92 300 2286654',
  address:
    'Shop 2A-LG, Main Farshi Bazar, Azam Market (Kashmeri / Katri Bawa Gate), Lahore, Punjab, Pakistan',
} as const;

export const SOCIAL_LINKS: { label: string; url: string }[] = [
  { label: 'Facebook', url: '' },
  { label: 'TikTok', url: '' },
];

export const OPENING_HOURS = [
  { label: 'Mon – Wed & Sat', time: '10:00 AM – 9:00 PM', weekdays: [1, 2, 3, 6], openMinute: 600, closeMinute: 1260 },
  { label: 'Thursday', time: '8:00 AM – 10:00 PM', weekdays: [4], openMinute: 480, closeMinute: 1320 },
  { label: 'Friday', time: '7:30 AM – 10:00 PM', weekdays: [5], openMinute: 450, closeMinute: 1320 },
] as const;

const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function isShopOpenNow(now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);

  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  const weekday = WEEKDAY_INDEX[read('weekday')];
  const minute = Number(read('hour')) * 60 + Number(read('minute'));

  return OPENING_HOURS.some(
    (slot) => slot.weekdays.some((day) => day === weekday) && minute >= slot.openMinute && minute < slot.closeMinute,
  );
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${BUSINESS.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
