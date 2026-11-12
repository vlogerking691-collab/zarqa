import { useState } from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { Hero } from '@/components/home/Hero';
import { WholesaleInfo } from '@/components/home/WholesaleInfo';
import { OutletSection } from '@/components/home/OutletSection';
import { Catalog } from '@/components/catalog/Catalog';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CheckoutModal } from '@/components/cart/CheckoutModal';
import { CartProvider } from '@/context/CartProvider';
import type { CategoryFilter } from '@/data/products';

function Storefront() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory">
      <AnnouncementBar />
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={setActiveCategory}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        <Hero />
        <Catalog
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onSelectCategory={setActiveCategory}
          onSearchChange={setSearchQuery}
        />
        <WholesaleInfo />
        <OutletSection />
      </main>

      <Footer />
      <WhatsAppButton />

      {isCartOpen && (
        <CartDrawer
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}
      {isCheckoutOpen && <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
