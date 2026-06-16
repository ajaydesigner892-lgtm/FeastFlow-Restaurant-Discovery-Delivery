import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Favorite Food',
      description: 'Browse verified menus from the city’s top gourmet kitchens. Filter by organic, calorie counts, or spice ratios.',
      bgEmoji: '🍔',
      colorClass: 'from-[#FF5A1F] to-[#FF6B6B]/20'
    },
    {
      step: '02',
      title: 'Place Your Order Securely',
      description: 'Apply voucher keys instantly, choose secure modern banking tokens or cards, and execute with zero checkout friction.',
      bgEmoji: '💳',
      colorClass: 'from-[#FFB703] to-[#FFC43D]/20'
    },
    {
      step: '03',
      title: 'Track Delivery Live & Enjoy',
      description: 'Follow our integrated real-time map displaying driver movement and receive insulated warm dishes straight to your foyer.',
      bgEmoji: '🛵',
      colorClass: 'from-emerald-500 to-teal-400/20'
    }
  ];

  return (
    <section id="about" className="py-20 bg-stone-100/50 border-t border-stone-200/40 relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 select-none">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5A1F] bg-[#FF5A1F]/10 px-4.5 py-1.5 rounded-full">
            The BiteRush Way
          </span>
          <h2 className="font-display font-black text-3xl sm:text-[48px] text-[#1A1A1A] mt-4 leading-tight">
            How It Works
          </h2>
          <p className="text-stone-500 font-sans text-sm sm:text-base mt-2">
            Satisfying your gourmet cravings is simpler than flipping a pancake. Get started in three seamless steps.
          </p>
        </div>

        {/* 3 Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* Connector dashed line for desktop */}
          <div className="hidden md:block absolute top-[28%] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-stone-300 -z-10" />

          {steps.map((s, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[28px] border border-stone-200/50 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group relative text-center flex flex-col items-center justify-between min-h-[340px]"
            >
              {/* Step indicator bubble */}
              <div className="absolute top-[-20px] bg-[#1A1A1A] group-hover:bg-[#FF5A1F] text-white font-display font-black text-xs px-4 py-1.5 rounded-full shadow-md transition-colors">
                Step {s.step}
              </div>

              {/* Glassmorphism Icon circle */}
              <div className={`mt-4 w-20 h-20 rounded-2xl bg-gradient-to-tr ${s.colorClass} flex items-center justify-center text-4xl shadow-inner group-hover:rotate-6 transition-transform duration-300`}>
                <span className="drop-shadow">{s.bgEmoji}</span>
              </div>

              {/* Card textual info */}
              <div className="space-y-2 mt-4">
                <h3 className="font-display font-black text-xl text-[#1A1A1A] group-hover:text-[#FF5A1F] transition-colors leading-snug">
                  {s.title}
                </h3>
                <p className="text-stone-500 font-sans text-xs sm:text-[13px] leading-relaxed max-w-[250px] mx-auto">
                  {s.description}
                </p>
              </div>

              {/* Card subtle footprint */}
              <div className="mt-4 text-[9px] uppercase font-bold tracking-widest text-[#FFB703] font-mono group-hover:tracking-wider transition-all">
                Swift Comfort ⚡
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
