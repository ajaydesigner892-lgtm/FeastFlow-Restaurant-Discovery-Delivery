import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowRight, User, Heart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  onScrollToSection: (refName: string) => void;
  onOpenLogin: () => void;
  onOpenMenu: () => void;
  activePage: 'LANDING' | 'MENU' | 'RESTAURANTS' | 'LIVE_TRACKING' | 'ABOUT' | 'WISHLIST';
  onChangePage: (page: 'LANDING' | 'MENU' | 'RESTAURANTS' | 'LIVE_TRACKING' | 'ABOUT' | 'WISHLIST') => void;
}

export default function Navbar({ 
  cartCount, 
  onCartOpen, 
  onScrollToSection, 
  onOpenLogin,
  onOpenMenu,
  activePage,
  onChangePage
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home', page: 'LANDING' as const },
    { name: 'Gourmet Menu', id: 'menu', page: 'MENU' as const },
    { name: 'Kitchens', id: 'restaurants', page: 'RESTAURANTS' as const },
    { name: 'Live Tracking', id: 'live-tracking', page: 'LIVE_TRACKING' as const },
    { name: 'Our Story', id: 'about', page: 'ABOUT' as const },
    { name: 'Favorites 🤍', id: 'wishlist', page: 'WISHLIST' as const }
  ];

  const handleLinkClick = (page: 'LANDING' | 'MENU' | 'RESTAURANTS' | 'LIVE_TRACKING' | 'ABOUT' | 'WISHLIST', elementId: string) => {
    onChangePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FFF8F3]/95 backdrop-blur-md border-b border-orange-100/40 shadow-sm py-4.5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          id="nav-logo"
          className="flex items-center space-x-2.5 cursor-pointer group"
          onClick={() => handleLinkClick('LANDING', 'home')}
        >
          <div className="w-11 h-11 rounded-2xl bg-[#FF5A1F] flex items-center justify-center text-white shadow-lg shadow-orange-500/20 transform group-hover:rotate-6 transition-transform">
            <span className="text-xl font-black">⚡</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-2xl tracking-tight text-[#1A1A1A] leading-none">
              Bite<span className="text-[#FF5A1F]">Rush</span>
            </span>
            <span className="text-[9px] tracking-widest text-amber-500 font-bold uppercase mt-1">
              Premium Gastronomy
            </span>
          </div>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isSelected = activePage === link.page;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.page, link.id)}
                className={`font-display font-bold text-[13px] tracking-wide transition cursor-pointer relative py-1 group ${
                  isSelected ? 'text-[#FF5A1F]' : 'text-stone-700 hover:text-[#FF5A1F]'
                }`}
              >
                <span>{link.name}</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#FF5A1F] transition-all duration-300 ${
                  isSelected ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            );
          })}
        </nav>

        {/* Action icons & buttons */}
        <div className="hidden lg:flex items-center space-x-5">
          {/* Search bar helper */}
          <button 
            id="nav-search-btn"
            className="p-2.5 text-stone-700 hover:text-[#FF5A1F] hover:bg-[#FF5A1F]/5 rounded-xl transition cursor-pointer"
            onClick={() => handleLinkClick('MENU', 'menu')}
            title="Search dishes"
          >
            <Search size={20} />
          </button>

          {/* Cart triggers */}
          <button
            id="nav-cart-btn"
            onClick={onCartOpen}
            className="p-2.5 text-stone-700 hover:bg-[#FF5A1F]/5 rounded-xl transition cursor-pointer relative"
          >
            <ShoppingBag size={21} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FF5A1F] text-white text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce-subtle">
                {cartCount}
              </span>
            )}
          </button>

          {/* Split divider */}
          <div className="w-px h-6 bg-stone-200" />

          {/* Authentication */}
          <button
            id="nav-login-btn"
            onClick={onOpenLogin}
            className="font-display font-bold text-stone-700 hover:text-[#FF5A1F] text-sm transition cursor-pointer flex items-center space-x-1"
          >
            <User size={16} />
            <span>Login</span>
          </button>

          <button
            id="nav-cta-btn"
            onClick={() => handleLinkClick('MENU', 'menu')}
            className="bg-[#1A1A1A] text-white hover:bg-[#FF5A1F] font-display font-extrabold py-3.5 px-6.5 rounded-full text-xs tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 active:scale-95 flex items-center space-x-2"
          >
            <span>Order Now</span>
            <ArrowRight size={14} className="stroke-[3]" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            id="nav-cart-mob"
            onClick={onCartOpen}
            className="p-2.5 text-stone-700 rounded-xl relative hover:bg-stone-100"
          >
            <ShoppingBag size={21} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF5A1F] text-white text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            id="nav-burger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-stone-900 bg-stone-100 rounded-xl hover:bg-[#FF5A1F]/10 hover:text-[#FF5A1F] transition"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[77px] bg-white border-b border-orange-100 p-6 flex flex-col space-y-4 lg:hidden shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 z-50">
          <div className="grid grid-cols-2 gap-3 pb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.page, link.id)}
                className={`font-display font-bold text-stone-700 hover:text-[#FF5A1F] text-xs text-left py-2.5 px-3 rounded-xl transition ${
                  activePage === link.page ? 'bg-orange-50 text-[#FF5A1F]' : 'hover:bg-stone-50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
          
          <div className="border-t border-stone-100 pt-4 flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="font-display font-bold text-stone-700 text-sm py-2 px-3 hover:bg-[#FF5A1F]/10 hover:text-[#FF5A1F] rounded-xl transition text-left flex items-center space-x-2"
            >
              <User size={16} />
              <span>Login/Signup</span>
            </button>
            
            <button
              onClick={() => handleLinkClick('MENU', 'menu')}
              className="bg-[#FF5A1F] text-white font-display font-extrabold py-3.5 w-full rounded-2xl shadow-lg shadow-orange-500/20 hover:bg-[#E04E17] transition text-center text-xs"
            >
              Order Now ⚡
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
