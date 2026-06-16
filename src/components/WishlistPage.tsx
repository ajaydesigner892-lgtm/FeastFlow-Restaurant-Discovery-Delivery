import React from 'react';
import { Heart, Trash2, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';
import { FoodItem } from '../types';
import { FOOD_ITEMS } from '../data';

interface WishlistPageProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (item: FoodItem, qty: number) => void;
  onNavigateToMenu: () => void;
}

export default function WishlistPage({
  favorites,
  onToggleFavorite,
  onAddToCart,
  onNavigateToMenu
}: WishlistPageProps) {
  // Filter favorite food items
  const favoriteItems = FOOD_ITEMS.filter((item) => favorites.includes(item.id));

  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 max-w-[1280px] mx-auto min-h-screen">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3.5">
        <div className="inline-flex items-center space-x-2 bg-[#FF5A1F]/10 text-[#FF5A1F] text-xs font-bold font-display px-3 py-1.5 rounded-full border border-orange-500/20">
          <Heart size={12} className="text-[#FF5A1F] fill-[#FF5A1F] animate-pulse" />
          <span>My Private Culinary Board</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-stone-900 animate-in fade-in">
          Your Selected <br />
          <span className="text-[#FF5A1F]">Gastronomic Favorites</span>
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          Keep track of your highly requested dishes. Add items directly to your cart or remove ones you've already thoroughly enjoyed.
        </p>
      </div>

      {/* Render favorite items list */}
      {favoriteItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto">
            🌹
          </div>
          <div>
            <h3 className="text-lg font-display font-extrabold text-stone-800">Your Gourmet Vault is Empty</h3>
            <p className="text-xs text-stone-400 max-w-xs mx-auto mt-2 leading-relaxed">
              When exploring our Elite Vault Menu, tap the heart icon on any gourmet dish to save it on this board!
            </p>
          </div>
          <button 
            onClick={onNavigateToMenu}
            className="bg-[#FF5A1F] hover:bg-[#E04E17] text-white font-display font-bold text-xs px-6 py-3 rounded-full transition shadow-md shadow-orange-500/10 active:scale-95 cursor-pointer inline-flex items-center space-x-1.5"
          >
            <span>Explore Elite Menu Now</span>
            <span>⚡</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in">
          {favoriteItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative"
            >
              
              {/* Trash/Remove Button */}
              <button
                onClick={() => onToggleFavorite(item.id)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur hover:bg-red-50 flex items-center justify-center text-stone-405 hover:text-red-600 shadow transition-all duration-300 cursor-pointer"
                title="Remove from board"
              >
                <Trash2 size={13} />
              </button>

              {/* Dish Image */}
              <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent" />
                <span className="absolute bottom-2.5 left-2.5 bg-stone-900/80 backdrop-blur text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              {/* Card Contents */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#FF5A1F] uppercase tracking-wider font-display">
                      ⏱️ {item.prepTime}
                    </span>
                    <span className="text-yellow-500 font-bold text-xs flex items-center space-x-0.5">
                      <span>★</span>
                      <span className="text-stone-800">{item.rating}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xs sm:text-sm text-stone-900 group-hover:text-[#FF5A1F] transition">
                    {item.name}
                  </h3>

                  <p className="text-[11px] text-stone-400 font-sans line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-dashed border-stone-100 flex items-center justify-between mt-auto">
                  <span className="text-sm font-display font-black text-stone-900">${item.price.toFixed(2)}</span>
                  
                  <button
                    onClick={() => {
                      onAddToCart(item, 1);
                      alert(`"${item.name}" has been added to your order cart! 🛒`);
                    }}
                    className="bg-stone-900 hover:bg-[#FF5A1F] text-white font-display font-semibold text-xs py-2 px-3.5 rounded-xl transition cursor-pointer flex items-center space-x-1.5 shadow-sm active:scale-95"
                  >
                    <ShoppingBag size={11} className="stroke-[2.5]" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Recommended dynamic board hint */}
      {favoriteItems.length > 0 && (
        <div className="mt-14 bg-gradient-to-r from-orange-400/10 to-amber-500/10 border border-orange-200/40 rounded-2xl p-5.5 flex items-start space-x-4">
          <AlertCircle className="text-[#FF5A1F] shrink-0 mt-0.5" size={18} />
          <div className="space-y-1">
            <h4 className="font-display font-black text-stone-900 text-xs sm:text-sm uppercase tracking-wide">Quick Ordering Hint</h4>
            <p className="text-stone-500 text-[11px] sm:text-xs leading-relaxed font-sans">
              Wishlisted elements are permanently buffered in your safe browser storage. You can checkout all saved elements collectively by pressing the "Buy Now" CTA, adding them as direct individual cart slots!
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
