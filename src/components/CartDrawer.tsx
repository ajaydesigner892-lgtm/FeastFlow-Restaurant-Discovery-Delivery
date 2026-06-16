import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, ShieldCheck, Tag, Check, Award } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (foodId: string, quantityDelta: number) => void;
  onRemoveItem: (foodId: string) => void;
  onPlaceOrder: (appliedPromo: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [instructions, setInstructions] = useState('');

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = promoCode.trim().toUpperCase();
    if (raw === 'BITE40') {
      setAppliedPromo('BITE40');
      setPromoSuccess('40% OFF coupon applied successfully! 🎉');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try codes like "BITE40"');
      setPromoSuccess('');
    }
  };

  const getSubtotal = () => cart.reduce((acc, item) => acc + (item.foodItem.price * item.quantity), 0);
  const getDiscount = () => {
    if (appliedPromo === 'BITE40') {
      return getSubtotal() * 0.40;
    }
    return 0;
  };
  const getDeliveryFee = () => (getSubtotal() > 0 ? 1.50 : 0);
  const getTotal = () => Math.max(0, getSubtotal() - getDiscount() + getDeliveryFee());

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main sliding panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl relative flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200/50 flex items-center justify-between bg-[#FFF8F3] shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FF5A1F] flex items-center justify-center text-white text-sm font-bold">
                🛒
              </div>
              <div>
                <h3 className="font-display font-black text-stone-900 text-base leading-none">Your Gourmet Cart</h3>
                <span className="text-[10.5px] text-stone-400 font-semibold mt-1 block">
                  {cart.length > 0 ? `${cart.reduce((ac, item) => ac + item.quantity, 0)} Items chosen` : 'Empty cart'}
                </span>
              </div>
            </div>
            
            <button 
              id="cart-close-btn"
              onClick={onClose}
              className="p-2 text-stone-900 bg-stone-100 hover:bg-red-50 hover:text-red-500 rounded-xl transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
            
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-4xl">🥫</span>
                <h4 className="font-display font-black text-lg text-stone-700">Your cart is completely empty</h4>
                <p className="text-stone-400 text-xs sm:text-[13px] leading-relaxed max-w-[260px] mx-auto">
                  Add savory main portions, desserts, or drinks from featured menus to checkout now.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#FF5A1F] text-white font-display font-bold py-3 px-6 rounded-xl text-xs shadow-md transition hover:bg-[#E04E17] active:scale-95"
                >
                  Start Adding Food ⚡
                </button>
              </div>
            ) : (
              <div className="space-y-4.5">
                {cart.map((item) => (
                  <div 
                    key={item.foodItem.id}
                    className="p-3 bg-stone-50 rounded-2xl border border-stone-100 flex items-start space-x-4 hover:shadow-sm transition"
                  >
                    {/* Item Image */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 shadow-inner">
                      <img 
                        src={item.foodItem.image} 
                        className="w-full h-full object-cover" 
                        alt={item.foodItem.name}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Name details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs text-stone-900 truncate">{item.foodItem.name}</h4>
                      <div className="flex items-center space-x-1 pl-0.5 mt-0.5 text-[9.5px] text-[#FF5A1F] font-bold">
                        <span>⭐</span>
                        <span>{item.foodItem.rating}</span>
                        <span className="text-stone-300">•</span>
                        <span className="text-stone-400">{item.foodItem.prepTime} Prep</span>
                      </div>
                      
                      {/* Pricing */}
                      <p className="text-[#FF5A1F] font-display font-extrabold text-[12.5px] mt-1">
                        ${(item.foodItem.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col items-end space-y-2 shrink-0">
                      <button 
                        onClick={() => onRemoveItem(item.foodItem.id)}
                        className="text-[10px] text-stone-300 hover:text-red-500 font-medium"
                      >
                        Remove
                      </button>
                      <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-stone-200 shadow-inner">
                        <button 
                          onClick={() => onUpdateQty(item.foodItem.id, -1)}
                          className="w-5.5 h-5.5 rounded-lg bg-stone-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-stone-600 transition"
                        >
                          <Minus size={9} className="stroke-[3.5]" />
                        </button>
                        <span className="font-bold text-[11px] text-stone-900 w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.foodItem.id, 1)}
                          className="w-5.5 h-5.5 rounded-lg bg-stone-100 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-center text-stone-600 transition"
                        >
                          <Plus size={9} className="stroke-[3.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Shipping Instruction textbox */}
                <div className="space-y-1 pt-2">
                  <label className="text-[10.5px] uppercase font-bold tracking-widest text-[#FF5A1F]">Gourmet Instructions</label>
                  <textarea
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Leave coupon in mailbox, extra seasoning, allergy alert, etc..."
                    className="w-full bg-stone-50 border border-stone-200/60 rounded-2xl p-3 text-xs focus:outline-none focus:border-[#FF5A1F] text-stone-900"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Pricing & checkout blocks if cart > 0 */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FFF8F3] border-t border-stone-200/50 space-y-4 shrink-0">
              
              {/* Promo input field */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5 pb-2">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3 flex items-center text-[#FF5A1F]">
                      <Tag size={13} />
                    </span>
                    <input 
                      type="text" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Apply Code (BITE40)" 
                      className="w-full bg-white border border-stone-200/60 rounded-xl py-2 pl-8.5 pr-2.5 text-xs text-stone-900 uppercase focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-[#1A1A1A] hover:bg-[#FF5A1F] text-white text-xs font-bold font-display px-4 rounded-xl transition cursor-pointer flex items-center"
                  >
                    Apply Coupon
                  </button>
                </div>

                {promoError && <p className="text-[10px] text-red-500 font-bold">{promoError}</p>}
                {promoSuccess && (
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1">
                    <Check size={10} className="stroke-[3.5]" />
                    <span>{promoSuccess}</span>
                  </p>
                )}
              </form>

              {/* pricing summary lists */}
              <div className="space-y-2 text-[13px] border-t border-stone-200/40 pt-3 select-none">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Save (40%)</span>
                    <span>-${getDiscount().toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-500">
                  <span>Insulated Delivery</span>
                  <span>${getDeliveryFee().toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-stone-900 font-display font-black text-base pt-2 border-t border-dashed border-stone-200">
                  <span>Grand Total</span>
                  <span className="text-[#FF5A1F]">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Placement CTA */}
              <button
                id="checkout-confirm-btn"
                onClick={() => {
                  onPlaceOrder(appliedPromo);
                  onClose();
                }}
                className="w-full bg-[#FF5A1F] hover:bg-[#E04E17] text-white font-display font-bold py-4 rounded-2xl shadow-xl shadow-orange-500/20 active:scale-95 duration-100 transition cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Express Secure Checkout</span>
                <span>⚡</span>
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[9px] font-bold uppercase tracking-wider text-stone-400">
                <ShieldCheck size={11} className="text-emerald-500" />
                <span>PCI-Compliant 256-Bit Encrypted Portal</span>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
