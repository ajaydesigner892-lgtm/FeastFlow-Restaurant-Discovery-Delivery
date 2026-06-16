import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PromoBannerProps {
  onClaimOffer: (code: string) => void;
}

export default function PromoBanner({ onClaimOffer }: PromoBannerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('BITE40');
    setCopied(true);
    onClaimOffer('BITE40');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="offers" className="py-16 bg-[#FFF8F3] overflow-hidden select-none">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Banner Card Container with Orange-Red Gradient */}
        <div className="bg-gradient-to-r from-[#FF5A1F] via-[#FF6B6B] to-[#EF3B00] rounded-[32px] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Glass floating accents */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 transform pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-12 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          {/* Floating Food illustrations requested by parent plan */}
          <div className="absolute top-8 left-16 text-4xl animate-float opacity-30 select-none pointer-events-none hidden xl:block">🍔</div>
          <div className="absolute bottom-6 left-[40%] text-4xl animate-float-slow opacity-25 select-none pointer-events-none hidden xl:block">🍟</div>
          <div className="absolute top-10 right-24 text-4xl animate-float-fast opacity-30 select-none pointer-events-none hidden xl:block">🍕</div>

          {/* Left Text Detail Column */}
          <div className="space-y-4 max-w-2xl text-center lg:text-left z-10 relative">
            <span className="bg-[#FFB703] text-stone-950 font-display font-black text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md inline-block">
              🔥 First Order Special
            </span>
            <h2 className="font-display font-black text-3xl sm:text-[42px] leading-tight tracking-tight text-white drop-shadow-sm">
              Get Up To 40% OFF On Your First Order
            </h2>
            <p className="text-orange-50 font-sans text-sm sm:text-base leading-relaxed max-w-lg mt-2">
              Use code <strong className="text-yellow-300 font-extrabold font-mono text-lg">BITE40</strong> and enjoy exclusive premium savings immediately at checkout on our gourmet restaurants.
            </p>
          </div>

          {/* Right Action voucher code block */}
          <div className="flex flex-col items-center justify-center shrink-0 w-full lg:w-auto z-10 space-y-4">
            
            {/* Voucher code plate */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center justify-between space-x-6 min-w-[260px] sm:min-w-[290px] shadow-lg">
              <div>
                <p className="text-[9px] uppercase tracking-wider font-extrabold text-orange-200">Exclusive Promo Code</p>
                <div className="font-mono font-black text-2xl text-yellow-300 tracking-wider mt-0.5">BITE40</div>
              </div>
              
              <button 
                id="claim-promo-btn"
                onClick={handleCopy}
                className="bg-white hover:bg-yellow-100 text-[#FF5A1F] hover:scale-105 active:scale-95 p-3 rounded-xl transition duration-150 shadow-md flex items-center justify-center space-x-1"
                title="Copy and Apply Coupon Code"
              >
                {copied ? (
                  <>
                    <Check size={16} className="stroke-[3]" />
                    <span className="text-[10px] font-bold">Applied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span className="text-[10px] font-bold">Claim</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-yellow-250 font-bold tracking-wide italic select-none">
              {copied ? 'Voucher is applied & copies! Checkout soon!' : 'Click Claim to instantly copy & register discount!'}
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
