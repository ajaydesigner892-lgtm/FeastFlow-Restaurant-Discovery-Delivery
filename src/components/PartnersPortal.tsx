import React, { useState } from 'react';
import { Search, MapPin, Heart, ArrowRight, Star, Clock, Sparkles } from 'lucide-react';
import { Restaurant } from '../types';
import { RESTAURANTS } from '../data';

interface PartnersPortalProps {
  onViewMenu: (restaurant: Restaurant) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function PartnersPortal({
  onViewMenu,
  favorites,
  onToggleFavorite
}: PartnersPortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'ALL' | 'TOP' | 'FREE' | 'CLOSE'>('ALL');

  // Filter restaurants
  const filteredRestaurants = RESTAURANTS.filter((rest) => {
    const matchesSearch = rest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rest.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rest.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filterMode === 'TOP') {
      return rest.rating >= 4.8;
    }
    if (filterMode === 'FREE') {
      return rest.deliveryFee.toLowerCase() === 'free';
    }
    if (filterMode === 'CLOSE') {
      // Distance is formatted like "1.2 km", let's check values under 1.5 km
      const distanceVal = parseFloat(rest.distance);
      return distanceVal <= 1.5;
    }
    
    return true;
  });

  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 max-w-[1280px] mx-auto min-h-screen">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3.5">
        <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-700 text-xs font-bold font-display px-3 py-1.5 rounded-full border border-amber-500/20">
          <Sparkles size={12} className="animate-spin-slow" />
          <span>BiteRush Gourmet Partners</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-stone-900">
          Our Top Curated <br />
          <span className="text-[#FF5A1F]">Kitchen Guilds</span>
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          We integrate only with restaurants maintaining a 4.5+ star rating and passed strict daily health and quality checks. Discover culinary mastery near you.
        </p>
      </div>

      {/* Searching & Filters Grid */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-100 mb-10 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              placeholder="Search by restaurant name or cuisine (e.g. Sushi, Burgers, Neapolitan, Fast Food...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200/80 rounded-2xl py-3.5 pl-11 pr-5 text-sm font-sans text-stone-800 placeholder-stone-450 focus:outline-none focus:border-[#FF5A1F] focus:bg-white transition-all duration-300 shadow-inner"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                filterMode === 'ALL'
                  ? 'bg-stone-900 text-white shadow'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              All Kitchens
            </button>
            <button
              onClick={() => setFilterMode('TOP')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                filterMode === 'TOP'
                  ? 'bg-amber-500 text-white shadow'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              ⭐ Superstars (4.8+ Rating)
            </button>
            <button
              onClick={() => setFilterMode('FREE')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                filterMode === 'FREE'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              💸 Free Delivery
            </button>
            <button
              onClick={() => setFilterMode('CLOSE')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                filterMode === 'CLOSE'
                  ? 'bg-rose-500 text-white shadow'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              📍 Nearby (≤ 1.5 km)
            </button>
          </div>

        </div>
      </div>

      {/* Restaurants list cards */}
      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm max-w-xl mx-auto">
          <span className="text-5xl">🏪</span>
          <h3 className="text-lg font-display font-extrabold text-stone-800 mt-4">No Restaurant Partners Match</h3>
          <p className="text-xs text-stone-400 max-w-xs mx-auto mt-2">
            We couldn't locate any dining partners matching your exact tags. Try reset or viewing other locations.
          </p>
          <button 
            onClick={() => { setSearchTerm(''); setFilterMode('ALL'); }}
            className="mt-6 bg-[#FF5A1F] text-white font-display font-bold text-xs px-5 py-2.5 rounded-full hover:bg-[#E04E17] transition shadow-md"
          >
            Show All Partner Guilds
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((rest) => {
            const isFav = favorites.includes(rest.id);
            return (
              <div 
                key={rest.id}
                className="bg-white rounded-3xl border border-stone-200/45 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                
                {/* Banner Wrapper */}
                <div className="relative h-48 bg-stone-100 overflow-hidden">
                  <img 
                    src={rest.bannerImage} 
                    alt={rest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  {/* Free Delivery float */}
                  {rest.deliveryFee.toLowerCase() === 'free' && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[9.5px] uppercase font-black px-3 py-1 rounded-md shadow border border-emerald-400/20">
                      Free Delivery ⚡
                    </div>
                  )}

                  {/* Rating float */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur text-stone-900 text-[10.5px] font-extrabold px-2.5 py-1 rounded-lg shadow-md flex items-center space-x-1">
                    <span className="text-amber-500">⭐</span>
                    <span>{rest.rating}</span>
                  </div>

                  {/* Logo overlay on banner bottom */}
                  <div className="absolute bottom-3 left-4 flex items-center space-x-2.5">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-xl border border-stone-100 transform group-hover:rotate-6 transition">
                      {rest.logo}
                    </div>
                    <div>
                      <h3 className="text-white font-display font-black text-sm drop-shadow">{rest.name}</h3>
                      <p className="text-gray-200 text-[10px] leading-none mt-1 font-mono tracking-wide">{rest.cuisine}</p>
                    </div>
                  </div>

                </div>

                {/* Description Body */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-stone-500 leading-relaxed font-sans line-clamp-3">
                    {rest.description}
                  </p>

                  {/* Stats Grid inside card */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-dashed border-stone-150 text-center">
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center justify-center space-x-0.5">
                        <Clock size={11} className="text-orange-500" />
                        <span>{rest.deliveryTime}</span>
                      </div>
                      <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Speed</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        {rest.distance}
                      </div>
                      <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Distance</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 text-orange-600">
                        ${rest.minOrder}
                      </div>
                      <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Min Order</span>
                    </div>
                  </div>

                  {/* Followers & Call To Action */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider font-mono">Fans</span>
                      <span className="text-xs font-black text-[#FF5A1F]">{rest.followersCount} Followers</span>
                    </div>

                    <button
                      onClick={() => onViewMenu(rest)}
                      className="bg-stone-950 hover:bg-[#FF5A1F] text-white font-display font-extrabold text-xs py-2.5 px-4 rounded-xl shadow transition duration-300 cursor-pointer flex items-center space-x-1"
                    >
                      <span>Explore Menu</span>
                      <ArrowRight size={12} className="stroke-[2.5]" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Multi-cuisine culinary network statement */}
      <div className="mt-20 border border-amber-200/50 bg-[#FFFBF7] p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h4 className="font-display font-extrabold text-stone-900 text-lg">Are you a premium local restaurant owner?</h4>
          <p className="text-xs text-stone-500 leading-relaxed font-sans">
            Join the BiteRush exclusive culinary delivery shield. Benefit from our double-insulated cold-heat high hygiene technology, lower service splits, and premium high-paying customer networks.
          </p>
        </div>
        <button 
          onClick={() => alert("Simulated Merchant Application Portal! 🍳 Join our premium logistics loop today!")}
          className="bg-[#FF5A1F] text-white hover:bg-[#E04E17] transition-all font-display font-bold text-xs tracking-wider px-6 py-3.5 rounded-full shrink-0 shadow-lg shadow-orange-500/10 active:scale-95"
        >
          Join Merch Network ⚡
        </button>
      </div>

    </div>
  );
}
