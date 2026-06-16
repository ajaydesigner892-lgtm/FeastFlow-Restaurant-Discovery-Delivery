import React from 'react';
import { Smartphone, ShieldCheck, Zap, Award } from 'lucide-react';

export default function MobileShowcase() {
  return (
    <section id="mobile-showcase" className="py-20 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 text-white relative overflow-hidden select-none">
      
      {/* Background radial soft light behind screen */}
      <div className="absolute top-[50%] left-[20%] transform -translate-y-1/2 w-[450px] h-[450px] bg-[#FF5A1F]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Two elegant floating smartphone mockups overlap */}
          <div className="lg:col-span-6 relative h-[480px] sm:h-[540px] flex items-center justify-center">
            
            {/* Phone Mockup 1 (Primary - Floating Left) */}
            <div className="absolute left-[5%] sm:left-[10%] top-[10%] w-[210px] sm:w-[240px] h-[420px] sm:h-[480px] bg-[#0A0A0A] rounded-[36px] p-2.5 shadow-2xl border-4 border-stone-850 rotate-[-8deg] z-20 animate-float">
              
              {/* Inner screen rendering */}
              <div className="w-full h-full rounded-[28px] bg-[#FFF8F3] overflow-hidden p-3.5 relative flex flex-col justify-between text-stone-900 border border-white/5">
                {/* Dynamic island */}
                <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2" />

                {/* Simulated screen header */}
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-[7px] text-stone-400 font-bold uppercase tracking-wider">Deliver right now</p>
                    <h5 className="text-[10px] font-black text-stone-950">Grand Ave, Silicon Valley</h5>
                  </div>
                  <span className="text-sm">⚡</span>
                </div>

                {/* Banner Promotion */}
                <div className="bg-gradient-to-r from-[#FF5A1F] to-[#FFB703] p-2 rounded-xl text-white flex items-center justify-between mb-3.5 shadow-sm">
                  <div>
                    <h6 className="text-[9px] font-black">25% Weekend Flash</h6>
                    <span className="text-[6.5px] text-white/90">Claim with voucher key inside</span>
                  </div>
                  <span className="text-base">🍕</span>
                </div>

                {/* Food menu slider mockup */}
                <div className="space-y-2.5">
                  <span className="text-[9px] font-extrabold uppercase text-stone-500">Popular dishes</span>
                  
                  {/* Food row */}
                  <div className="bg-white border border-stone-100 p-2 rounded-xl flex items-center space-x-2.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h6 className="text-[8px] font-bold text-stone-950 truncate">Angus Smash Burger</h6>
                      <span className="text-[7.5px] text-[#FF5A1F] font-black">$12.50</span>
                    </div>
                    <button className="bg-[#FF5A1F] text-white text-[7px] font-black px-2 py-1 rounded-md shrink-0">+</button>
                  </div>

                  {/* Food row */}
                  <div className="bg-white border border-stone-100 p-2 rounded-xl flex items-center space-x-2.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h6 className="text-[8px] font-bold text-stone-950 truncate">Truffle White Pizza</h6>
                      <span className="text-[7.5px] text-[#FF5A1F] font-black">$16.00</span>
                    </div>
                    <button className="bg-[#FF5A1F] text-white text-[7px] font-black px-2 py-1 rounded-md shrink-0">+</button>
                  </div>
                </div>

                {/* Sticky app bar */}
                <div className="bg-white p-2 border-t border-stone-100 rounded-b-xl flex justify-around items-center text-[8px] text-stone-400 font-bold mt-4">
                  <span className="text-[#FF5A1F]">🍔 Home</span>
                  <span>🔍 Search</span>
                  <span>🛒 Cart</span>
                  <span>⚙️ Account</span>
                </div>
              </div>

            </div>

            {/* Phone Mockup 2 (Secondary - Overlaping Right) */}
            <div className="absolute right-[5%] sm:right-[10%] bottom-[5%] w-[210px] sm:w-[240px] h-[420px] sm:h-[480px] bg-[#0A0A0A] rounded-[36px] p-2.5 shadow-2xl border-4 border-stone-850 rotate-[8deg] z-15 animate-float-slow">
              
              {/* Inner screen rendering */}
              <div className="w-full h-full rounded-[28px] bg-stone-900 overflow-hidden p-3.5 relative flex flex-col justify-between text-stone-300 border border-white/5">
                {/* Dynamic island */}
                <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2" />

                {/* Header screen */}
                <div className="flex justify-between items-center bg-[#1A1A1A] p-2.5 rounded-xl border border-white/5 shadow-sm mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">🛵</span>
                    <div>
                      <h6 className="text-[8.5px] font-extrabold text-white">Rider David is raw</h6>
                      <span className="text-[7px] text-emerald-500 font-semibold">1.2 km away</span>
                    </div>
                  </div>
                </div>

                {/* Static live path mini map */}
                <div className="flex-1 bg-stone-800 rounded-2xl relative overflow-hidden border border-white/5 flex flex-col justify-end p-2 pb-3 shadow-inner">
                  {/* Simulated streets lines */}
                  <div className="absolute inset-0 bg-stone-850/50" />
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-700/60" />
                  <div className="absolute left-[30%] top-0 bottom-0 w-1 bg-stone-700/60" />
                  
                  {/* Flashing courier dot */}
                  <div className="absolute left-[30%] top-[40%] bg-orange-500 w-3 h-3 rounded-full border-2 border-white shadow animate-ping" />
                  <div className="absolute left-[30%] top-[40%] bg-orange-500 w-2.5 h-2.5 rounded-full border border-white shadow" />

                  {/* Destination */}
                  <div className="absolute left-[30%] top-[70%] bg-emerald-500 w-2.5 h-2.5 rounded-full border border-white shadow" />
                  
                  <div className="relative bg-[#1A1A1A]/95 backdrop-blur p-2 rounded-xl text-center space-y-1 z-10 border border-white/5 shadow-md">
                    <p className="text-[8px] text-white font-extrabold">Estimated Arrival</p>
                    <span className="text-sm font-black text-[#FFB703] leading-none">12 Mins Remaining</span>
                  </div>
                </div>

                {/* Ride controls */}
                <div className="space-y-2 mt-3 text-stone-400">
                  <span className="text-[7.5px] uppercase font-bold tracking-wider">Courier statistics</span>
                  
                  <div className="flex items-center justify-between bg-[#1A1A1A] p-2 rounded-xl border border-white/5">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-stone-750 rounded-full overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=70" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-[8px] text-white font-bold">David W.</span>
                    </div>
                    <span className="text-[#FFB703] text-[8px] font-bold">★ 4.9</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Text download CTAs & QR Code */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left select-none">
            
            {/* Promo detail Header */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFB703] bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
                Premium Native Client
              </span>
              <h2 className="font-display font-black text-3xl sm:text-[42px] leading-tight text-white mt-3">
                Unlock The Complete <br />
                BiteRush Platform Suite
              </h2>
              <p className="text-stone-400 font-sans text-sm sm:text-base leading-relaxed max-w-[500px] mx-auto lg:mx-0">
                Download the BiteRush application to access GPS smart route geolocations, one-tap repeat orders, customized dietary filters, and direct rider support chats.
              </p>
            </div>

            {/* Utility points list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-3.5">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5A1F]">
                  <Zap size={15} />
                </div>
                <span className="text-stone-300 font-sans text-xs sm:text-sm font-semibold">Lightning Fast One-tap Checkout</span>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFB703]">
                  <Smartphone size={15} />
                </div>
                <span className="text-stone-300 font-sans text-xs sm:text-sm font-semibold">Geo-fenced Live Map Path</span>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={15} />
                </div>
                <span className="text-stone-300 font-sans text-xs sm:text-sm font-semibold">Strict Temperature Lock</span>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B6B]">
                  <Award size={15} />
                </div>
                <span className="text-stone-300 font-sans text-xs sm:text-sm font-semibold">Michelin-star Star Kitchens</span>
              </div>
            </div>

            {/* App downloads and QR Code Grid block */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              
              {/* App badges */}
              <div className="flex flex-col gap-3 w-full sm:w-auto max-w-[190px]">
                
                {/* App store */}
                <a 
                  href="#app-store"
                  onClick={(e) => { e.preventDefault(); alert("App Store simulation fired!"); }}
                  className="bg-black hover:bg-stone-850 border border-white/10 p-3.5 rounded-2xl flex items-center space-x-3 cursor-pointer shadow-md transition"
                >
                  <span className="text-2xl">🍎</span>
                  <div className="text-left leading-tight">
                    <p className="text-[7.5px] uppercase font-bold text-stone-400">Download on the</p>
                    <h5 className="font-display font-bold text-[10.5px] text-white">App Store</h5>
                  </div>
                </a>

                {/* Google Play */}
                <a 
                  href="#google-play"
                  onClick={(e) => { e.preventDefault(); alert("Google Play simulation fired!"); }}
                  className="bg-black hover:bg-stone-850 border border-white/10 p-3.5 rounded-2xl flex items-center space-x-3 cursor-pointer shadow-md transition"
                >
                  <span className="text-2xl">🤖</span>
                  <div className="text-left leading-tight">
                    <p className="text-[7.5px] uppercase font-bold text-stone-400">Get it on</p>
                    <h5 className="font-display font-bold text-[10.5px] text-white">Google Play</h5>
                  </div>
                </a>
              </div>

              {/* Vector SVG-like QR Code box */}
              <div className="bg-white/5 border border-white/10 p-4.5 rounded-[24px] flex items-center space-x-4 shrink-0">
                
                {/* Real-looking QR code SVG mock */}
                <div className="bg-white p-2 rounded-xl w-16 h-16 shrink-0 shadow-inner flex items-center justify-center relative">
                  <svg className="w-full h-full text-stone-900" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />
                    
                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />

                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />

                    <rect x="40" y="10" width="10" height="40" />
                    <rect x="50" y="40" width="20" height="10" />
                    <rect x="60" y="60" width="20" height="20" />
                    <rect x="40" y="70" width="10" height="15" />
                    <circle cx="50" cy="50" r="5" fill="#FF5A1F" />
                  </svg>
                </div>

                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#FFB703]">Camera Scan barcode</p>
                  <h4 className="font-display font-extrabold text-[12.5px] text-white leading-tight">Instant Download Link</h4>
                  <span className="text-[9px] text-stone-400 font-sans">Compatible with iOS & Android</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
