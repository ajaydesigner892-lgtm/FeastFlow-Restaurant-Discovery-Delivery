import React from 'react';
import { TESTIMONIALS } from '../data';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-[#FFF8F3] relative overflow-hidden select-none">
      
      {/* Decorative gradient blob */}
      <div className="absolute top-[30%] left-[-100px] w-96 h-96 bg-[#FF5A1F]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-100px] w-80 h-80 bg-[#FFB703]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10 w-full">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5A1F] bg-[#FF5A1F]/10 px-4.5 py-1.5 rounded-full">
            Heartfelt Reviews
          </span>
          <h2 className="font-display font-black text-3xl sm:text-[48px] text-[#1A1A1A] mt-4 leading-tight">
            Customer Testimonials
          </h2>
          <p className="text-stone-500 font-sans text-sm sm:text-base mt-2">
            Hear from Michelin reviewers, tech product managers, and daily food lovers who choose BiteRush.
          </p>
        </div>

        {/* 3 Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <div 
              key={t.id} 
              className="glass-panel rounded-[28px] p-8 border border-white bg-white/70 shadow-sm hover:shadow-xl transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[290px]"
            >
              <div className="space-y-4">
                {/* Star review list */}
                <div className="flex space-x-1 text-[#FFB703] text-sm">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={15} className="fill-[#FFB703]" />
                  ))}
                </div>

                {/* Feedback Review */}
                <p className="text-stone-700 italic font-sans text-sm sm:text-[14.5px] leading-relaxed">
                  "{t.feedback}"
                </p>
              </div>

              {/* Reviewer Meta info */}
              <div className="flex items-center space-x-4 pt-5 mt-6 border-t border-dashed border-stone-200/50">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-orange-100 shrink-0 shadow-inner">
                  <img src={t.avatar} className="w-full h-full object-cover" alt={t.name} referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-extrabold text-[#1A1A1A] text-sm leading-tight truncate">
                    {t.name}
                  </h4>
                  <p className="text-stone-400 text-[10px] font-sans font-medium mt-0.5 truncate">
                    {t.role}
                  </p>
                </div>
                <span className="text-[10px] text-stone-300 font-mono font-bold shrink-0">
                  {t.date}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export { TESTIMONIALS };
