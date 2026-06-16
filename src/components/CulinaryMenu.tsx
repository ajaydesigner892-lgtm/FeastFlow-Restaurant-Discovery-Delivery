import React, { useState } from 'react';
import { Search, SlidersHorizontal, ShoppingBag, Flame, Sparkles, Clock, Star, ShieldCheck } from 'lucide-react';
import { FoodItem, Category } from '../types';
import { CATEGORIES, FOOD_ITEMS } from '../data';

interface CulinaryMenuProps {
  onAddToCart: (item: FoodItem, qty: number) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onViewFoodDetails?: (item: FoodItem) => void;
}

export default function CulinaryMenu({
  onAddToCart,
  favorites,
  onToggleFavorite,
  onViewFoodDetails
}: CulinaryMenuProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc' | 'popular'>('popular');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filter items
  const filteredItems = FOOD_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCat === 'all' || item.category === selectedCat;
    
    return matchesSearch && matchesCategory;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    // Default or popular
    return b.reviewsCount - a.reviewsCount;
  });

  const handleTriggerAddToCart = (item: FoodItem) => {
    onAddToCart(item, 1);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 max-w-[1280px] mx-auto min-h-screen">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3.5">
        <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-[#FF5A1F] text-xs font-bold font-display px-3 py-1.5 rounded-full border border-orange-500/20">
          <Sparkles size={12} className="animate-pulse" />
          <span>BiteRush Elite Culinary Vault</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-stone-900">
          Explore Our Delicious <br />
          <span className="text-[#FF5A1F]">Gourmet Masterpieces</span>
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          Order premium dishes prepared by elite five-star chefs. Pick your favorite, customize ingredients, and get speedy high-hygiene delivery.
        </p>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-100 mb-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Real-time Search */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              placeholder="Search dishes, ingredients (e.g. Salmon, Mushroom, Truffle...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200/80 rounded-2xl py-3.5 pl-11 pr-5 text-sm font-sans text-stone-800 placeholder-stone-450 focus:outline-none focus:border-[#FF5A1F] focus:bg-white transition-all duration-300 shadow-inner"
            />
          </div>

          {/* Sorter Selector */}
          <div className="flex items-center space-x-3 shrink-0">
            <SlidersHorizontal size={16} className="text-stone-400" />
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl py-2 px-3 text-xs font-bold text-stone-700 outline-none focus:border-[#FF5A1F] cursor-pointer"
            >
              <option value="popular">Popular Dishes 🔥</option>
              <option value="rating">Top Rated ⭐</option>
              <option value="priceAsc">Price: Low to High 💸</option>
              <option value="priceDesc">Price: High to Low 📈</option>
            </select>
          </div>

        </div>

        {/* Category horizontal bar */}
        <div className="border-t border-stone-100 pt-5">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition whitespace-nowrap cursor-pointer ${
                selectedCat === 'all'
                  ? 'bg-[#FF5A1F] text-white shadow-lg shadow-orange-500/25'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200/50'
              }`}
            >
              ✨ View All Masterpieces
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex items-center space-x-1.5 px-4.5 py-2.5 rounded-full text-xs font-bold tracking-wide transition whitespace-nowrap cursor-pointer ${
                  selectedCat === cat.id
                    ? 'bg-[#FF5A1F] text-white shadow-lg shadow-orange-500/25'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Grid List of Dishes */}
      {sortedItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm max-w-xl mx-auto">
          <span className="text-5xl">🥙</span>
          <h3 className="text-lg font-display font-extrabold text-stone-800 mt-4">No Gourmet Matches Found</h3>
          <p className="text-xs text-stone-400 max-w-xs mx-auto mt-2">
            We couldn't find any dishes matching "{searchTerm}". Try clearing your search or checking other categories.
          </p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCat('all'); }}
            className="mt-6 bg-stone-950 text-white font-display font-medium text-xs px-5 py-2.5 rounded-full hover:bg-[#FF5A1F] transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedItems.map((item) => {
            const isFav = favorites.includes(item.id);
            const isJustAdded = justAddedId === item.id;

            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative"
              >
                
                {/* Floating Tags on Image */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  {item.tags?.map((tag, i) => (
                    <span 
                      key={i} 
                      className="bg-stone-950/80 backdrop-blur text-[8.5px] uppercase tracking-wider font-extrabold text-white px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Favorite Heart Button */}
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur hover:bg-white flex items-center justify-center text-stone-400 hover:text-red-500 shadow transition-all duration-300"
                  title={isFav ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <span className={`text-base ${isFav ? 'text-red-500 scale-110' : 'text-stone-400'}`}>
                    {isFav ? '❤️' : '🤍'}
                  </span>
                </button>

                {/* Hero Dish Image */}
                <div 
                  className="relative h-44 w-full bg-stone-100 overflow-hidden cursor-pointer"
                  onClick={() => onViewFoodDetails?.(item)}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    referrerPolicy=" referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent" />
                  
                  {/* Preparation Timer overlay */}
                  <div className="absolute bottom-2 right-2 bg-stone-900/85 backdrop-blur text-white text-[9.5px] font-bold px-2 py-1 rounded flex items-center space-x-1.5">
                    <Clock size={10} className="text-orange-400" />
                    <span>{item.prepTime}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    
                    {/* Rating summary */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#FF5A1F] uppercase tracking-wider font-display shrink-0">
                        {item.category.toUpperCase()}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star size={11} className="fill-amber-400 text-amber-500" />
                        <span className="text-xs font-bold text-stone-850">{item.rating}</span>
                        <span className="text-[10px] text-stone-400">({item.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 
                      className="font-display font-extrabold text-sm text-stone-900 group-hover:text-[#FF5A1F] transition cursor-pointer"
                      onClick={() => onViewFoodDetails?.(item)}
                    >
                      {item.name}
                    </h3>

                    <p className="text-[11px] text-stone-400 font-sans line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Ingredient pills */}
                    <div className="flex flex-wrap gap-1 pt-1.5 pb-2">
                      {item.ingredients.slice(0, 3).map((ing, idx) => (
                        <span key={idx} className="bg-stone-50 border border-stone-100 text-stone-500 text-[8.5px] py-0.5 px-1.5 rounded-md">
                          {ing}
                        </span>
                      ))}
                      {item.ingredients.length > 3 && (
                        <span className="text-[8.5px] text-stone-400 font-semibold align-middle px-1">
                          +{item.ingredients.length - 3} more
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Card bottom footer */}
                  <div className="pt-3.5 border-t border-dashed border-stone-100 flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-stone-450 uppercase font-bold font-display leading-none">Price</span>
                      <span className="text-[15px] font-display font-black text-stone-900 mt-1">${item.price.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => handleTriggerAddToCart(item)}
                      className={`px-3.5 py-2 rounded-xl font-display font-bold text-xs cursor-pointer transition-all duration-300 flex items-center space-x-1.5 ${
                        isJustAdded 
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow'
                          : 'bg-stone-900 hover:bg-[#FF5A1F] text-white hover:shadow-lg hover:shadow-orange-500/10'
                      }`}
                    >
                      <ShoppingBag size={12} />
                      <span>{isJustAdded ? 'Added! ✅' : 'Add to Cart'}</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Hygiene and Safety Seals */}
      <div className="mt-20 bg-stone-900 text-stone-300 p-8.5 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400 shrink-0">
            <span className="text-xl">🥘</span>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-white text-xs uppercase tracking-wider">Premium Ingredients</h4>
            <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">Sourced fresh daily from organically certified bio-farms.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orangy shrink-0 text-orange-400">
            <span className="text-xl">🛵</span>
          </div>
          <div>
            <h4 className="font-display font-extrabold text-white text-xs uppercase tracking-wider">Double Insulated Bags</h4>
            <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">Keeps your hot burgers piping hot and cold salads chilled.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-display font-extrabold text-white text-xs uppercase tracking-wider">Contactless Seals</h4>
            <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">Triple physical tamper security check guarantee before leaving.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
