import React, { useState } from 'react';
import { 
  AppWindow, Smartphone, RefreshCw, CheckCircle2 
} from 'lucide-react';
import { Category, Restaurant, CartItem, FoodItem } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Categories from './components/Categories';
import RestaurantsGrid from './components/RestaurantsGrid';
import PromoBanner from './components/PromoBanner';
import HowItWorks from './components/HowItWorks';
import LiveTracking from './components/LiveTracking';
import Testimonials from './components/Testimonials';
import MobileShowcase from './components/MobileShowcase';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import MenuModal from './components/MenuModal';
import PhoneSimulator from './components/PhoneSimulator';

// Immersive multi-page desktop modules
import CulinaryMenu from './components/CulinaryMenu';
import PartnersPortal from './components/PartnersPortal';
import TrackingConsole from './components/TrackingConsole';
import StoryPage from './components/StoryPage';
import WishlistPage from './components/WishlistPage';

export default function App() {
  const [viewMode, setViewMode] = useState<'LANDING' | 'MOBILE_ONLY'>('LANDING');
  const [activePage, setActivePage] = useState<'LANDING' | 'MENU' | 'RESTAURANTS' | 'LIVE_TRACKING' | 'ABOUT' | 'WISHLIST'>('LANDING');
  
  // Interactive global states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['b1', 'p1', 's1', 'd2']);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [activeMenuRest, setActiveMenuRest] = useState<Restaurant | null>(null);
  
  // Checkout status
  const [checkoutNotification, setCheckoutNotification] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (foodItem: FoodItem, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.foodItem.id === foodItem.id);
      if (existing) {
        return prev.map((item) => 
          item.foodItem.id === foodItem.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { foodItem, quantity }];
    });
  };

  const handleUpdateQty = (foodId: string, quantityDelta: number) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.foodItem.id === foodId) {
          const nextQty = item.quantity + quantityDelta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (foodId: string) => {
    setCart((prev) => prev.filter((item) => item.foodItem.id !== foodId));
  };

  const handleToggleFavorite = (foodId: string) => {
    setFavorites((prev) => 
      prev.includes(foodId) 
        ? prev.filter((id) => id !== foodId) 
        : [...prev, foodId]
    );
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePlaceOrder = (appliedPromo: string) => {
    setCheckoutNotification('Your BiteRush Gourmet Feast is ordered successfully! Opening live courier tracking now... 🛵');
    setCart([]); // Clear cart
    
    // Set view to live tracking page & scroll smoothly
    setTimeout(() => {
      setActivePage('LIVE_TRACKING');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);

    setTimeout(() => {
      setCheckoutNotification(null);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] text-stone-900 font-sans selection:bg-[#FF5A1F] selection:text-white antialiased relative">
      
      {/* FLOATING DESIGN SYSTEM CONTROLLER */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-stone-950/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl flex items-center space-x-1.5 z-50">
        <button 
          onClick={() => setViewMode('LANDING')}
          className={`flex items-center space-x-1.5 px-5.5 py-2.5 rounded-full font-display text-xs font-black transition-all cursor-pointer ${
            viewMode === 'LANDING' 
              ? 'bg-[#FF5A1F] text-white shadow-lg' 
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <AppWindow size={13} />
          <span>🖥️ Presentation Landing Showcase</span>
        </button>
        <button 
          onClick={() => setViewMode('MOBILE_ONLY')}
          className={`flex items-center space-x-1.5 px-5.5 py-2.5 rounded-full font-display text-xs font-black transition-all cursor-pointer ${
            viewMode === 'MOBILE_ONLY' 
              ? 'bg-[#FF5A1F] text-white shadow-lg' 
              : 'text-stone-300 hover:text-white'
          }`}
        >
          <Smartphone size={13} />
          <span>📱 Phone Only Simulator</span>
        </button>
      </div>

      {checkoutNotification && (
        <div className="fixed bottom-24 right-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-sans font-extrabold text-xs sm:text-sm p-4 rounded-2xl shadow-2xl border border-emerald-400/20 flex items-center space-x-3.5 z-50 animate-bounce-subtle">
          <CheckCircle2 size={18} className="text-white fill-[#FFF]/10 animate-spin-slow" />
          <span>{checkoutNotification}</span>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <Navbar 
        cartCount={cart.reduce((acc, it) => acc + it.quantity, 0)}
        onCartOpen={() => setCartOpen(true)}
        onScrollToSection={(section) => {
          setActivePage('LANDING');
          setTimeout(() => handleScrollToSection(section), 100);
        }}
        onOpenLogin={() => alert("Simulated Premium Member Sign-in Triggered! 🔑 Welcome Back!")}
        onOpenMenu={() => {
          setActivePage('MENU');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activePage={activePage}
        onChangePage={(page) => setActivePage(page)}
      />

      {/* =========================================
          VIEW MODE 1: COMPLETE PREMIUM LANDING PAGE
          ========================================= */}
      {viewMode === 'LANDING' && (
        <div className="animate-in fade-in duration-300">
          
          {/* RENDER PAGES CONDITIONALLY */}
          {activePage === 'LANDING' && (
            <>
              {/* Hero */}
              <Hero 
                onOrderFood={() => {
                  setActivePage('MENU');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreRestaurants={() => {
                  setActivePage('RESTAURANTS');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Trusted Partners */}
              <TrustedBy />

              {/* Categories Grid Filter */}
              <Categories 
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={(id) => {
                  setSelectedCategoryId(id);
                  setActivePage('RESTAURANTS');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Featured Restaurants list */}
              <RestaurantsGrid 
                selectedCategoryId={selectedCategoryId}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onViewMenu={(restaurant) => setActiveMenuRest(restaurant)}
              />

              {/* Large Promo Banner discount */}
              <PromoBanner 
                onClaimOffer={(code) => {
                  alert(`Promo coupon code "${code}" is auto-applied! You will get 40% OFF at checkout! 🎫`);
                }}
              />

              {/* How It Works with connected cards */}
              <HowItWorks />

              {/* Live Order GPS Tracking simulator */}
              <LiveTracking />

              {/* Customer Testimonial bubbles */}
              <Testimonials />

              {/* Mobile App overlay showcase */}
              <MobileShowcase />
            </>
          )}

          {activePage === 'MENU' && (
            <CulinaryMenu 
              onAddToCart={handleAddToCart}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onViewFoodDetails={(item) => {
                handleAddToCart(item, 1);
                setCartOpen(true);
              }}
            />
          )}

          {activePage === 'RESTAURANTS' && (
            <PartnersPortal 
              onViewMenu={(restaurant) => setActiveMenuRest(restaurant)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activePage === 'LIVE_TRACKING' && (
            <TrackingConsole />
          )}

          {activePage === 'ABOUT' && (
            <StoryPage />
          )}

          {activePage === 'WISHLIST' && (
            <WishlistPage 
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
              onNavigateToMenu={() => setActivePage('MENU')}
            />
          )}

          {/* Footer & social blocks (Always present on presentation mode) */}
          <Footer onScrollToSection={(sectionId) => {
            setActivePage('LANDING');
            setTimeout(() => handleScrollToSection(sectionId), 150);
          }} />

        </div>
      )}

      {/* =========================================
          VIEW MODE 2: STANDALONE PHONE PREVIEW
          ========================================= */}
      {viewMode === 'MOBILE_ONLY' && (
        <div className="min-h-screen flex flex-col items-center justify-center py-24 px-4 bg-stone-900 border-b border-stone-950 select-none animate-in fade-in duration-305 relative">
          
          <div className="absolute top-12 text-center text-stone-400 space-y-1">
            <h3 className="font-display font-black text-white text-base">BiteRush Mobile App</h3>
            <p className="text-xs">Fully functional React interactive emulator</p>
          </div>

          <div className="relative py-4">
            {/* Embedded native phone size layout */}
            <PhoneSimulator initialScreen="WELCOME" onScreenChange={() => {}} />
          </div>

        </div>
      )}

      {/* GLOBAL MODALS */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
      />

      <MenuModal 
        restaurant={activeMenuRest}
        isOpen={activeMenuRest !== null}
        onClose={() => setActiveMenuRest(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
