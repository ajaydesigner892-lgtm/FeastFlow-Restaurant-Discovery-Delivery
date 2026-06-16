import React from 'react';

export default function TrustedBy() {
  const partners = [
    { name: 'Urban Grill', icon: '🔥', style: 'text-rose-500' },
    { name: 'Napoli House', icon: '🍕', style: 'text-amber-500' },
    { name: 'Sushi Wave', icon: '🍣', style: 'text-rose-400' },
    { name: 'Taco Fiesta', icon: '🌮', style: 'text-emerald-500' },
    { name: 'Coffee Lab', icon: '☕', style: 'text-amber-700' },
    { name: 'Sweet Heaven', icon: '🍰', style: 'text-pink-500' }
  ];

  return (
    <section id="trusted-by" className="py-12 bg-white border-y border-stone-200/30">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          
          <p className="font-display font-bold text-xs uppercase tracking-widest text-stone-500 text-center">
            Trusted by 500+ premium restaurants across the country
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full max-w-5xl items-center justify-items-center">
            {partners.map((p, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2.5 opacity-65 hover:opacity-100 transform hover:scale-[1.05] transition-all cursor-pointer duration-200 group text-center"
              >
                <span className={`text-2xl group-hover:scale-110 transition-transform ${p.style}`}>
                  {p.icon}
                </span>
                <span className="font-display font-extrabold text-[#1a1a1a] text-sm tracking-tight group-hover:text-[#FF5A1F] transition-colors">
                  {p.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
