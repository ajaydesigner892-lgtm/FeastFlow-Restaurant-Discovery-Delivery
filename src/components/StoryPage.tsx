import React from 'react';
import { ChefHat, Globe, Shield, Sparkles, HeartHandshake, Award, Activity, Leaf } from 'lucide-react';

export default function StoryPage() {
  const chefs = [
    {
      name: 'Chef Roberto Diaz',
      role: 'Master of Flame & Smash Burgers',
      bio: 'Trained in French classic haute cuisine, Roberto spent 12 years perfecting hickory wood firing before establishing SpiceCraft. His signature smash is legendary.',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
      tag: '🔥 Flame Pioneer'
    },
    {
      name: 'Kenji Takahashi',
      role: 'Sashimi Fusion Architect',
      bio: 'A third-generation sushi artisan from Kanagawa, Kenji bridges ancestral curing with California citrus-wasabi emulsions. Each grain of rice is vinegar calibrated.',
      avatar: 'https://images.unsplash.com/photo-1581333123614-01a7a48b1b4d?auto=format&fit=crop&q=80&w=200',
      tag: '🍣 Rice Master'
    },
    {
      name: 'Mia Rosini',
      role: 'Neapolitan Dough Artist',
      bio: 'Mia brought her family sourdough base from Naples. Fermented under precise moisture lock for 72 hours, her wood-fired crusts possess unparalleled puffiness.',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=200',
      tag: '🍕 Crumb Structure'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 max-w-[1280px] mx-auto min-h-screen">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#FF5A1F]/10 text-[#FF5A1F] text-xs font-bold font-display px-3.5 py-1.5 rounded-full border border-orange-500/20">
          <ChefHat size={12} className="animate-bounce" />
          <span>The BiteRush Gastronomy Creed</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-stone-900 leading-tight">
          Where High Technology <br />
          Meets <span className="text-[#FF5A1F]">Artisanal Gastronomy</span>
        </h1>
        <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
          BiteRush is not typical fast-food. We are an upscale gastronomic shield bridging local legendary kitchen nodes with precision luxury logistics. Here is our promise.
        </p>
      </div>

      {/* Grid of 3 standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        
        {/* standard 1 */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6.5 shadow hover:shadow-xl transition relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full transform translate-x-8 -translate-y-8" />
          <div className="w-12 h-12 bg-orange-100 text-[#FF5A1F] rounded-2xl flex items-center justify-center text-xl mb-5">
            <Leaf size={24} />
          </div>
          <h3 className="font-display font-[900] text-stone-900 text-base mb-2">101% Organic Raw Sourcing</h3>
          <p className="text-xs text-stone-500 leading-relaxed font-sans">
            Our kitchens are strictly bound in our charter. Fresh Atlantic salmon flown directly three times a week, heirloom tomatoes plucked at peak sugar maturity, and pesticide-free butter.
          </p>
        </div>

        {/* standard 2 */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6.5 shadow hover:shadow-xl transition relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full transform translate-x-8 -translate-y-8" />
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-xl mb-5">
            <Award size={24} />
          </div>
          <h3 className="font-display font-[900] text-stone-900 text-base mb-2">72-Hour Sourdough Ferment</h3>
          <p className="text-xs text-stone-500 leading-relaxed font-sans">
            Our pizzerias operate under high discipline. We utilize a 100-year-old mother yeast, locked in a cold fermentation cycle of 72 hours, rendering crusts rich in organic proteins and easily digestible.
          </p>
        </div>

        {/* standard 3 */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6.5 shadow hover:shadow-xl transition relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full transform translate-x-8 -translate-y-8" />
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mb-5">
            <Shield size={24} />
          </div>
          <h3 className="font-display font-[900] text-stone-900 text-base mb-2">Double Insulated Safe Seals</h3>
          <p className="text-xs text-stone-500 leading-relaxed font-sans">
            Standard delivery leaks flavor. BiteRush courier scooters utilize proprietary heated/chilled dynamic drawers, accompanied by physical wax anti-tamper seals, ensuring your meal meets chef temperatures.
          </p>
        </div>

      </div>

      {/* The Chefs Showcase */}
      <div className="bg-stone-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden mb-20 shadow-2xl">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF5A1F]/10 rounded-full blur-[140px]" />
        
        <div className="relative z-15 text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-amber-400 font-display text-[10px] uppercase font-black tracking-widest">Gourmet Directors</span>
          <h2 className="font-display font-black text-2xl sm:text-[36px] text-white">The Elite Culinary Guild</h2>
          <p className="text-stone-400 text-xs sm:text-sm">Meet the award-winning culinary masterminds crafting your daily delivery delights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-15">
          {chefs.map((chef, i) => (
            <div 
              key={i}
              className="bg-stone-900/40 backdrop-blur border border-white/5 p-5.5 rounded-2xl flex flex-col items-center text-center space-y-4 hover:border-white/10 transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400">
                <img src={chef.avatar} alt={chef.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <span className="bg-amber-400/10 text-amber-300 text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border border-amber-400/20">
                  {chef.tag}
                </span>
                <h4 className="font-display font-bold text-white text-sm pt-2">{chef.name}</h4>
                <p className="text-[10px] text-stone-400 font-mono font-medium">{chef.role}</p>
              </div>
              <p className="text-[11px] text-stone-400 font-sans leading-relaxed">
                "{chef.bio}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Culinary Logistics Infographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left infographic box */}
        <div className="space-y-6">
          <div className="space-y-2.5">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5A1F] font-mono">Logistical Precision</span>
            <h2 className="font-display font-black text-35 text-stone-900 leading-tight">The 15-Minute Hot Box Commitment</h2>
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              Cooking standard cuisines is easy, preserving premium sensory quality outside a physical restaurant is incredibly complex. That is why BiteRush spends months tuning our logistics. We utilize hyper-local grid distribution centers so couriers are never more than 1.5 miles from your kitchen point.
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#FF5A1F] font-bold text-xs flex items-center justify-center shrink-0">1</span>
              <div>
                <h4 className="text-xs font-bold text-stone-900 font-display">Thermal Lock Containment</h4>
                <p className="text-[11px] text-stone-400">Carbon-fiber shell preserves 91% humidity resistance and strict constant dry heat.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#FF5A1F] font-bold text-xs flex items-center justify-center shrink-0">2</span>
              <div>
                <h4 className="text-xs font-bold text-stone-900 font-display">Hyper-Local Wave Dispatches</h4>
                <p className="text-[11px] text-stone-400">Dynamic AI routing avoids heavy school zones, high street jams, and red delays.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right illustrative box */}
        <div className="bg-gradient-to-tr from-orange-400 via-[#FF5A1F] to-[#BF360C] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden h-[340px] flex flex-col justify-between">
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute top-[20%] right-[-50px] w-52 h-52 bg-white/10 rounded-full blur-2xl animate-pulse" />
          
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-white/20 backdrop-blur text-[9.5px] uppercase font-black tracking-widest px-3 py-1 rounded-full border border-white/10">
              ⚡ BiteRush Shield
            </span>
            <span className="text-yellow-300 font-mono text-xs font-bold">Hygiene Level: 100A</span>
          </div>

          <div className="relative z-10 space-y-2">
            <span className="text-3xl">🛡️</span>
            <h3 className="font-display font-[900] text-lg sm:text-xl text-white">Full Sourdough and Sushi Seal Guaranteed</h3>
            <p className="text-[11px] text-orange-100 font-sans leading-relaxed">
              Every parcel is protected under double safety wrap locks to eliminate direct wind leakages, preserving the absolute high-fidelity presentation standard of your food elements.
            </p>
          </div>

          <div className="relative z-10 text-orange-200 text-[10px] font-mono border-t border-white/15 pt-2.5 flex justify-between items-center">
            <span>Verified safe delivery systems</span>
            <span>Est. 2026 tech logistics</span>
          </div>
        </div>

      </div>

    </div>
  );
}
