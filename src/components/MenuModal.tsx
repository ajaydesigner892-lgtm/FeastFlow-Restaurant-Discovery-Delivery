import React, { useState } from 'react';
import { X, Star, Clock, ShoppingBag, Plus, Minus, Check, Heart } from 'lucide-react';
import { Restaurant, FoodItem } from '../types';

interface MenuModalProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (food: FoodItem, quantity: number) => void;
}

export const ADDONS = [
  { name: 'Double Cheddar Melt Chunks', price: 1.50 },
  { name: 'Crispy Garlic Bacon Chips', price: 2.00 },
  { name: 'Chef Hot Chili Salsa Dip', price: 0.75 },
  { name: 'Insulated Double Thermal box wrap', price: 1.20 }
];

export default function MenuModal({
  restaurant,
  isOpen,
  onClose,
  onAddToCart,
}: MenuModalProps) {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [localQty, setLocalQty] = useState(1);
  const [addonSelections, setAddonSelections] = useState<string[]>([]);
  const [isFaved, setIsFaved] = useState(false);

  if (!isOpen || !restaurant) return null;

  // Render list of products belonging to restaurant, or default backup
  const foodList = restaurant.products && restaurant.products.length > 0 
    ? restaurant.products 
    : [];

  const handleToggleAddon = (name: string) => {
    setAddonSelections((prev) => 
      prev.includes(name) ? prev.filter((ad) => ad !== name) : [...prev, name]
    );
  };

  const handleAddItemToCart = (item: FoodItem) => {
    // Add item to cart with quantity
    onAddToCart(item, localQty);
    
    // Close secondary selection or prompt success
    setSelectedFood(null);
    setLocalQty(1);
    setAddonSelections([]);
    alert(`Success: Added ${localQty} portion of "${item.name}" to your BiteRush Cart drawer! 🛒`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden font-sans select-none">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1A1A1A]/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative z-10 flex flex-col mx-4 animate-in zoom-in-95 duration-250">
        
        {/* Banner image layout */}
        <div className="h-44 relative shrink-0">
          <img 
            src={restaurant.bannerImage} 
            className="w-full h-full object-cover" 
            alt={restaurant.name}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          {/* Close button */}
          <button 
            id="menu-modal-close"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/95 backdrop-blur rounded-xl text-stone-900 border border-stone-200 shadow hover:bg-orange-50 cursor-pointer active:scale-95 transition"
          >
            <X size={18} />
          </button>

          {/* Restaurant details */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-white">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-[#FF5A1F] text-white px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider mb-2">
                <span>{restaurant.cuisine}</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white drop-shadow">
                {restaurant.name}
              </h2>
              <p className="text-gray-300 text-xs mt-1.5 max-w-xl line-clamp-1">{restaurant.description}</p>
            </div>

            <div className="flex items-center space-x-4 ml-auto shrink-0 text-xs font-semibold bg-black/40 backdrop-blur px-4 py-2.5 rounded-2xl border border-white/10 shadow">
              <div className="flex items-center space-x-1">
                <Star className="text-[#FFB703] fill-[#FFB703]" size={12} />
                <span>{restaurant.rating} Rating</span>
              </div>
              <span className="text-stone-500">•</span>
              <div className="flex items-center space-x-1">
                <Clock size={12} className="text-[#FF5A1F]" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <span className="text-stone-500">•</span>
              <div>
                Min Order: <span>${restaurant.minOrder}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Split body layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left panel is the product menu listing */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6">
            <h3 className="font-display font-black text-lg text-stone-950 mb-4 pb-2 border-b border-stone-105">
              🍳 Culinary Specialties
            </h3>

            {foodList.length === 0 ? (
              <p className="text-stone-400 text-xs">No active items on the cooker right now.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {foodList.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setSelectedFood(item);
                      setLocalQty(1);
                      setAddonSelections([]);
                    }}
                    className={`p-3 bg-stone-50 hover:bg-orange-50/20 rounded-2xl border transition-all cursor-pointer flex space-x-3.5 items-start ${
                      selectedFood?.id === item.id 
                        ? 'border-[#FF5A1F] shadow bg-orange-50/10' 
                        : 'border-stone-200/40 hover:shadow-sm'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 shadow-inner">
                      <img 
                        src={item.image} 
                        className="w-full h-full object-cover" 
                        alt={item.name}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs text-stone-950 truncate leading-snug">{item.name}</h4>
                      <p className="text-stone-500 text-[10.5px] line-clamp-2 leading-relaxed mt-0.5">{item.description}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[#FF5A1F] font-display font-extrabold text-sm">${item.price.toFixed(2)}</span>
                        <span className="text-[10px] text-stone-400 font-bold">★ {item.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right panel handles item customization (Addons, quantities trigger, add-to-cart button) */}
          <div className="w-[320px] border-l border-stone-200/50 bg-[#FFF8F3] p-6 flex flex-col justify-between shrink-0 overflow-y-auto no-scrollbar">
            {selectedFood ? (
              <div className="space-y-4.5 flex-1 flex flex-col justify-between text-left h-full">
                <div className="space-y-4">
                  {/* Miniature selected food image header */}
                  <div className="flex items-center space-x-3 pb-3.5 border-b border-stone-200/40">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 shadow-inner">
                      <img src={selectedFood.image} className="w-full h-full object-cover" alt="Custom item" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-xs text-stone-900 leading-tight">{selectedFood.name}</h4>
                      <p className="text-[#FF5A1F] font-display font-black text-[11.5px] mt-0.5">${selectedFood.price.toFixed(2)} portion</p>
                    </div>
                  </div>

                  {/* Addon checkboxes */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF5A1F]">Gourmet Addons (Optional)</span>
                    <div className="space-y-1.5 text-[11px] font-semibold text-stone-700">
                      {ADDONS.map((addon, index) => {
                        const isSelect = addonSelections.includes(addon.name);
                        
                        return (
                          <div 
                            key={index}
                            onClick={() => handleToggleAddon(addon.name)}
                            className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                              isSelect 
                                ? 'bg-white border-[#FF5A1F] text-stone-900 shadow-sm' 
                                : 'bg-white/40 border-stone-200/60 text-stone-500 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[8px] ${
                                isSelect ? 'bg-[#FF5A1F] border-[#FF5A1F] text-white' : 'border-stone-300'
                              }`}>
                                {isSelect && '✓'}
                              </div>
                              <span className="truncate max-w-[150px]">{addon.name}</span>
                            </div>
                            <span className="text-[10px] text-[#FF5A1F] shrink-0 font-bold">+${addon.price.toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div className="space-y-2 pt-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF5A1F]">Portion Quantity</span>
                    <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-2xl border border-stone-200 shadow-inner">
                      <button 
                        onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-orange-50 text-stone-600 flex items-center justify-center transition cursor-pointer"
                      >
                        <Minus size={11} className="stroke-[3]" />
                      </button>
                      <span className="font-display font-[800] text-sm text-stone-900">{localQty}</span>
                      <button 
                        onClick={() => setLocalQty((q) => q + 1)}
                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-orange-50 text-stone-600 flex items-center justify-center transition cursor-pointer"
                      >
                        <Plus size={11} className="stroke-[3]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confirm pricing & add to card */}
                <div className="pt-6 border-t border-stone-200/40 shrink-0 mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-stone-500 text-xs font-bold font-sans">Item Subtotal</span>
                    <span className="font-display font-[900] text-base text-[#FF5A1F]">
                      ${(selectedFood.price * localQty).toFixed(2)}
                    </span>
                  </div>

                  <button
                    id="add-custom-item-cart"
                    onClick={() => handleAddItemToCart(selectedFood)}
                    className="w-full bg-[#FF5A1F] hover:bg-[#E04E17] text-white font-display font-bold py-3.5 rounded-2xl text-[11.5px] tracking-wide transition shadow-lg shadow-orange-500/20 active:scale-95 duration-75 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <ShoppingBag size={12} className="stroke-[2.5]" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3.5">
                <span className="text-3xl">🍲</span>
                <h4 className="font-display font-extrabold text-sm text-stone-700 leading-tight">Portion customization</h4>
                <p className="text-stone-400 text-[10.5px] leading-relaxed max-w-[180px]">
                  Click any specialty dish on the left to select quantities, customize addons, and confirm addition to your cart.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
export type { MenuModalProps };
