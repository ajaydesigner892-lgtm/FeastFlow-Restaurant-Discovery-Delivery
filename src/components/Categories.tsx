import React from 'react';
import { CATEGORIES } from '../data';

interface CategoriesProps {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export default function Categories({ selectedCategoryId, onSelectCategory }: CategoriesProps) {
  // Let's attach fictional counts corresponding to categories
  const counts: Record<string, number> = {
    burgers: 42,
    pizza: 28,
    sushi: 35,
    asian: 19,
    desserts: 24,
    coffee: 16,
    healthy_bowls: 31,
    mexican: 22
  };

  return (
    <section id="categories" className="py-20 bg-[#FFF8F3] relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-[#FFB703]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5A1F] bg-[#FF5A1F]/10 px-4.5 py-1.5 rounded-full">
            Top Pleasures
          </span>
          <h2 className="font-display font-black text-3xl sm:text-[48px] text-[#1A1A1A] mt-4 leading-tight">
            Browse Categories
          </h2>
          <p className="text-stone-500 font-sans text-sm sm:text-base mt-2">
            Select a delicious category to filter our signature menu cards and explore instant gourmet pairings.
          </p>
        </div>

        {/* 8 Premium rounded category cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            const itemCount = counts[cat.id] || 25;
            
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-5 rounded-[24px] bg-white border cursor-pointer select-none text-center transform transition-all duration-300 ${
                  isSelected 
                    ? 'border-[#FF5A1F] shadow-lg shadow-orange-500/10 scale-105 bg-gradient-to-b from-white to-[#FFF8F3]' 
                    : 'border-stone-200/40 shadow-sm hover:shadow-md hover:-translate-y-1.5'
                }`}
              >
                {/* Circular image wrapper */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-tr from-[#FFF3EB] to-[#FFF8F3] mx-auto border-2 border-dashed border-stone-200 group flex items-center justify-center p-0.5 relative mb-4">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-sm font-sans mr-1">{cat.icon}</span>
                  <h4 className="font-display font-extrabold text-[#1A1A1A] text-[13.5px] leading-tight">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] text-stone-400 font-mono font-medium">
                    {itemCount} Items
                  </p>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="mt-3 w-1.5 h-1.5 bg-[#FF5A1F] rounded-full mx-auto animate-ping" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
