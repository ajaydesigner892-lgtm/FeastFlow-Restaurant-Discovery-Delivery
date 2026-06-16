import React, { useState } from 'react';
import { Send, Globe, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (refName: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSuccess(true);
    setEmail('');
    setTimeout(() => setSuccess(false), 3000);
  };

  const socialLinks = [
    { label: 'Instagram', emoji: '📸', url: '#instagram' },
    { label: 'Dribbble', emoji: '🎨', url: '#dribbble' },
    { label: 'Behance', emoji: '💎', url: '#behance' },
    { label: 'Twitter', emoji: '🐦', url: '#twitter' },
  ];

  return (
    <footer id="footer" className="bg-[#111] text-stone-300 pt-20 pb-12 select-none border-t border-white/5 relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full">
        
        {/* 4-column modern grid structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10.5 pb-16 border-b border-white/5 justify-between">
          
          {/* Column 1: Brand Information */}
          <div className="lg:col-span-4 space-y-5">
            {/* Brand logo */}
            <div 
              className="flex items-center space-x-2.5 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-9 h-9 rounded-xl bg-[#FF5A1F] flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/10">
                ⚡
              </div>
              <span className="font-display font-[900] text-xl tracking-tight text-white group-hover:text-[#FF5A1F] transition">
                Bite<span className="text-[#FF5A1F]">Rush</span>
              </span>
            </div>

            <p className="text-stone-400 font-sans text-xs sm:text-[13.5px] leading-relaxed max-w-sm">
              Experience the pinnacle of luxury, fast-service culinary delivery. Fresh ingredients, insulated high-hygiene transport seals, and unforgettable flavors delivered to your porch.
            </p>

            {/* Social media emojilinks */}
            <div className="flex items-center space-x-3.5">
              {socialLinks.map((s, index) => (
                <a 
                  key={index}
                  href={s.url}
                  onClick={(e) => { e.preventDefault(); alert(`${s.label} profile simulation clicked.`); }}
                  className="w-[38px] h-[38px] rounded-xl bg-white/5 hover:bg-[#FF5A1F]/20 border border-white/10 hover:border-[#FF5A1F]/30 flex items-center justify-center text-base hover:scale-110 active:scale-95 transition duration-150 shadow"
                  title={s.label}
                >
                  <span>{s.emoji}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-black text-white text-xs sm:text-sm uppercase tracking-wider">
              Quick Directory
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans font-medium">
              <li>
                <button onClick={() => onScrollToSection('home')} className="hover:text-[#FF5A1F] transition">
                  Home Landing
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('categories')} className="hover:text-[#FF5A1F] transition">
                  Browse Categories
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('restaurants')} className="hover:text-[#FF5A1F] transition">
                  Featured Restaurants
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('live-tracking')} className="hover:text-[#FF5A1F] transition">
                  Live GPS Track
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('testimonials')} className="hover:text-[#FF5A1F] transition">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('mobile-showcase')} className="hover:text-[#FF5A1F] transition">
                  Download Mobile
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Restaurant Partners */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-black text-white text-xs sm:text-sm uppercase tracking-wider">
              Restaurant Partners
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] font-sans font-medium text-stone-400">
              <li className="hover:text-white transition cursor-pointer">🔥 Urban Grill Gourmet</li>
              <li className="hover:text-white transition cursor-pointer">🍕 Napoli House Crusts</li>
              <li className="hover:text-white transition cursor-pointer">🍣 Sushi Wave Washimi</li>
              <li className="hover:text-white transition cursor-pointer">🌮 Taco Fiesta Cantina</li>
              <li className="hover:text-white transition cursor-pointer">🥗 Green Bowl Organic salads</li>
              <li className="hover:text-white transition cursor-pointer">🍰 Sweet Heaven Bakery</li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-black text-white text-xs sm:text-sm uppercase tracking-wider">
              Stay In The Flavor Loop
            </h4>
            <p className="text-stone-450 font-sans text-[11px] sm:text-xs leading-relaxed">
              Subscribe to recieve weekend chef specs, flash codes, and hygiene audit logs directly in your box.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  required
                  placeholder="name@gourmet.link" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                />
                <button 
                  type="submit"
                  className="bg-[#FF5A1F] hover:bg-[#E04E17] text-white p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/10 active:scale-95"
                >
                  <Send size={15} />
                </button>
              </div>

              {success && (
                <p className="text-[10px] text-[#FFB703] font-bold tracking-wide transition duration-300">
                  Subscription successfully registered! 🍳 Check email inbox soon.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom portion: copyright & core metadata */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-stone-500 text-[10.5px] font-medium tracking-wide">
          <p>© 2026 BiteRush Delivery Startup Inc. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-stone-400 font-sans">
            <a href="#privacy" className="hover:text-[#FF5A1F] transition flex items-center space-x-1">
              <Shield size={11} />
              <span>Privacy Policy</span>
            </a>
            <a href="#terms" className="hover:text-[#FF5A1F] transition flex items-center space-x-1">
              <Globe size={11} />
              <span>Terms of Service</span>
            </a>
            <span className="flex items-center space-x-0.5 text-stone-605">
              <span>Made with</span>
              <Heart size={10} className="text-red-500 fill-red-500" />
              <span>for Silicon Valley</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
