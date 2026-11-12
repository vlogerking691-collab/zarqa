import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/business';

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Zarqa Traders on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-lg transition-transform duration-300 hover:scale-110 animate-pulse-ring md:bottom-7 md:right-7"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={1.8} />
    </a>
  );
}
