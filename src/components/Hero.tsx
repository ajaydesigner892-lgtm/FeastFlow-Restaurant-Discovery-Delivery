import React from 'react';
import { ArrowRight, Play, Star, Clock, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onOrderFood: () => void;
  onExploreRestaurants: () => void;
}

export default function Hero({ onOrderFood, onExploreRestaurants }: HeroProps) {
  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-32 lg:pt-40 pb-20 overflow-hidden flex items-center bg-[#FFF8F3]"
    >
      {/* Soft abstract gradient background blobs */}
      <div className="absolute top-20 left-[-100px] w-[500px] h-[500px] bg-[#FF5A1F]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-100px] w-[600px] h-[600px] bg-[#FFB703]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[350px] h-[350px] bg-[#FF6B6B]/4 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating 3D and graphic ornaments */}
      <div className="absolute top-28 left-[10%] text-5xl opacity-40 animate-float pointer-events-none hidden xl:block">🌶️</div>
      <div className="absolute bottom-24 left-[5%] text-6xl opacity-30 animate-float-fast pointer-events-none hidden xl:block">🍟</div>
      <div className="absolute top-40 right-[42%] text-4xl opacity-25 animate-float-slow pointer-events-none hidden lg:block">🍅</div>
      <div className="absolute bottom-12 right-[45%] text-5xl opacity-30 animate-float pointer-events-none hidden xl:block">🥑</div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side Content */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left select-none">
            
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#FF5A1F]/8 border border-[#FF5A1F]/15 px-4.5 py-2 rounded-full shadow-inner animate-pulse-subtle">
              <span className="text-sm">💎</span>
              <span className="font-display font-extrabold text-[10.5px] uppercase tracking-wider text-[#FF5A1F]">
                The New Gold Standard of Luxury Delivery
              </span>
            </div>

            {/* Main Hero Hook */}
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-[72px] tracking-tight leading-[1.05] text-[#1A1A1A]">
              Step Into a <br />
              World of <br />
              <span className="bg-gradient-to-r from-[#FF5A1F] via-[#FFB703] to-[#FF6B6B] bg-clip-text text-transparent">
                Incredible Flavors.
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-stone-600 font-sans text-base sm:text-lg lg:text-lg leading-relaxed max-w-[540px] mx-auto lg:mx-0">
              Experience premium food delivery from the city's top-rated restaurants. Fresh organic ingredients, lightning-fast delivery, and unforgettable flavors—all at your fingertips.
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-order-btn"
                onClick={onOrderFood}
                className="w-full sm:w-auto bg-[#FF5A1F] hover:bg-[#E04E17] text-white font-display font-bold text-sm tracking-wide py-5 px-9 rounded-2xl shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.03] active:scale-95 duration-200 cursor-pointer flex items-center justify-center space-x-2.5"
              >
                <span>Order Food</span>
                <ArrowRight size={16} className="stroke-[3.5]" />
              </button>

              <button
                id="hero-explore-btn"
                onClick={onExploreRestaurants}
                className="w-full sm:w-auto bg-white hover:bg-stone-50 border-2 border-[#1A1A1A] text-[#1A1A1A] font-display font-bold text-sm tracking-wide py-4.5 px-8 rounded-2xl shadow-sm transition-all hover:scale-[1.02] active:scale-95 duration-150 cursor-pointer flex items-center justify-center space-x-2"
              >
                <Play size={11} className="fill-[#1A1A1A] stroke-none" />
                <span>Explore Restaurants</span>
              </button>
            </div>

            {/* Horizontal Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200/50 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start space-x-1">
                  <Star className="text-[#FFB703] fill-[#FFB703] shrink-0" size={18} />
                  <span className="font-display font-black text-2xl text-[#1A1A1A]">4.9</span>
                </div>
                <div className="text-[11px] text-stone-500 uppercase font-bold tracking-wider mt-0.5">Rating Spot</div>
              </div>

              <div className="border-x border-stone-200/50 px-2">
                <div className="flex items-center justify-center lg:justify-start space-x-1">
                  <span className="text-xl">🍔</span>
                  <span className="font-display font-black text-2xl text-[#1A1A1A]">500+</span>
                </div>
                <div className="text-[11px] text-stone-500 uppercase font-bold tracking-wider mt-0.5">Restaurants</div>
              </div>

              <div>
                <div className="flex items-center justify-center lg:justify-start space-x-1">
                  <Clock className="text-[#FF5A1F] shrink-0" size={18} />
                  <span className="font-display font-black text-2xl text-[#1A1A1A]">20m</span>
                </div>
                <div className="text-[11px] text-stone-500 uppercase font-bold tracking-wider mt-0.5">Avg Delivery</div>
              </div>
            </div>

          </div>

          {/* Right Side Visuals (Giant Giant 3D Burger & Floating objects) */}
          <div className="lg:col-span-6 relative mt-10 lg:mt-0 flex items-center justify-center">
            
            {/* Soft Organic Background Shape */}
            <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#FF5A1F]/15 to-[#FFB703]/20 blur-[30px] -z-10 animate-pulse-subtle" />

            {/* Giant cheeseburger image wrapper */}
            <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] animate-float z-10">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=700"
                alt="BiteRush Premium Tower Burger"
                className="w-full h-full object-cover rounded-full border-8 border-white/60 shadow-2xl"
                referrerPolicy="no-referrer"
              />

              {/* Floating food illustration decals around the burger */}
              <div className="absolute top-[-25px] left-[-20px] bg-white p-3.5 rounded-full shadow-lg border border-amber-50 animate-float-fast z-20 text-3xl select-none" title="Delicious Pizza">
                🍕
              </div>
              
              <div className="absolute bottom-4 left-[-10px] bg-white p-3.5 rounded-full shadow-lg border border-amber-50 animate-float z-20 text-3xl select-none" title="Crispy Fries">
                🍟
              </div>
              
              <div className="absolute top-4 right-[-15px] bg-white p-3.5 rounded-full shadow-lg border border-amber-50 animate-float-slow z-20 text-3xl select-none" title="Fresh Sushi">
                🍣
              </div>

              <div className="absolute bottom-20 right-[-25px] bg-gradient-to-br from-[#1A1A1A] to-stone-800 text-white p-4.5 rounded-[24px] shadow-2xl border border-white/10 max-w-[140px] text-center rotate-6 animate-float-slow z-20">
                <span className="text-xl">🥤</span>
                <p className="text-[10px] font-bold text-[#FFB703] uppercase tracking-wider mt-1">Double Chill</p>
                <p className="text-[8px] text-stone-300 mt-0.5">Free Cola Drink</p>
              </div>

              {/* Overlapping Glassmorphism Order summary widget */}
              <div className="glass-panel absolute left-1/2 transform -translate-x-1/2 bottom-[-45px] sm:bottom-[-20px] w-[290px] sm:w-[320px] rounded-[24px] p-5 shadow-2xl z-20 border border-white/80 animate-bounce-subtle">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="font-display font-extrabold text-[#FF5A1F] text-[11px] uppercase tracking-widest bg-[#FF5A1F]/10 px-2.5 py-1 rounded">
                    ⚡ Express Delivery
                  </span>
                  <span className="text-[10px] text-stone-500 font-bold">18 min remaining</span>
                </div>

                <div className="flex items-center space-x-3 pb-3 border-b border-stone-200/40">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 overflow-hidden shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=120" 
                      className="w-full h-full object-cover" 
                      alt="Burger item"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-black text-xs text-stone-900 truncate">Spicy Supreme Burger</h4>
                    <p className="text-[9px] text-[#FFB703] font-bold mt-0.5">Double Cheese • Crispy Bacon</p>
                  </div>
                  <span className="font-display font-extrabold text-xs text-[#FF5A1F]">$13.90</span>
                </div>

                <div className="flex items-center justify-between pt-3 text-[10px] font-bold text-stone-600">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Courier On Scooter (David W.)</span>
                  </div>
                  <span className="text-emerald-600 font-mono">1.2 km away</span>
                </div>
              </div>

              {/* Floating stickers */}
              <div className="absolute top-[35%] left-[-45px] bg-[#FFB703] border-4 border-white text-stone-950 font-display font-black px-4.5 py-2.5 rounded-full shadow-lg transform -rotate-12 z-20 text-xs">
                🏷️ 40% OFF CODE: BITE40
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
