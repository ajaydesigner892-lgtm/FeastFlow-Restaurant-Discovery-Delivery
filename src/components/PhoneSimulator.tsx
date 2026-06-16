import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ArrowLeft, ShoppingBag, Star, Clock, MapPin, 
  User, ChevronRight, SlidersHorizontal, Check, Plus, 
  Minus, Send, Phone, Heart, Share2, Sparkles, Filter
} from 'lucide-react';
import { FoodItem, Category, Restaurant, CartItem, OrderState } from '../types';
import { CATEGORIES, FOOD_ITEMS, RESTAURANTS } from '../data';

interface PhoneSimulatorProps {
  initialScreen?: string;
  onScreenChange?: (screen: string) => void;
}

export default function PhoneSimulator({ initialScreen = 'WELCOME', onScreenChange }: PhoneSimulatorProps) {
  // Mobile Navigation state
  const [currentScreen, setCurrentScreen] = useState<string>(initialScreen);
  // Navigation history stacks for backing out of nested states
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  
  // Selected Data state
  const [selectedFood, setSelectedFood] = useState<FoodItem>(FOOD_ITEMS[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(RESTAURANTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<string>('');
  
  // Heart/Favorite elements
  const [favorites, setFavorites] = useState<string[]>(['b1', 'b4', 'p1']);

  // Order state tracking
  const [order, setOrder] = useState<OrderState>({
    status: 'confirmed',
    progress: 15,
    etaMinutes: 20,
    riderName: 'David Williamson',
    riderRating: 4.8,
    riderPhone: '+1 (555) 782-9902',
    riderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', // friendly rider avatar
    routeStep: 0
  });

  // Chat message state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'rider', text: string, time: string}[]>([
    { sender: 'rider', text: 'Hi! I am at BK Bites kitchen, preparing your order now. Standard delivery is 20 mins!', time: '09:41' },
  ]);

  // Handle manual navigation within phone framework
  const navigateTo = (screen: string) => {
    setHistoryStack(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
    if (onScreenChange) onScreenChange(screen);
  };

  const navigateBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack(prev => prev.slice(0, -1));
      setCurrentScreen(prev);
      if (onScreenChange) onScreenChange(prev);
    } else {
      navigateTo('HOME');
    }
  };

  // Sync prop changes
  useEffect(() => {
    if (initialScreen && initialScreen !== currentScreen) {
      setCurrentScreen(initialScreen);
    }
  }, [initialScreen]);

  // Run a live tracking simulation when screen is 'TRACKING'
  useEffect(() => {
    let interval: any;
    if (currentScreen === 'TRACKING') {
      interval = setInterval(() => {
        setOrder(prev => {
          let nextProgress = prev.progress + 6;
          let nextStatus = prev.status;
          let nextEta = prev.etaMinutes;
          let nextStep = prev.routeStep + 1;

          if (nextProgress >= 100) {
            nextProgress = 100;
            nextStatus = 'delivered';
            nextEta = 0;
          } else if (nextProgress >= 75) {
            nextStatus = 'on_the_way';
            nextEta = Math.max(3, 20 - Math.floor(nextProgress / 5));
          } else if (nextProgress >= 40) {
            nextStatus = 'preparing';
            nextEta = Math.max(12, 20 - Math.floor(nextProgress / 5));
          }

          // Trigger automated rider responses
          if (nextStatus === 'preparing' && prev.status === 'confirmed') {
            setChatMessages(c => [...c, {
              sender: 'rider',
              text: 'The kitchen completed cooking! Delicious burgers are freshly packed, starting my ride now.',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          } else if (nextStatus === 'on_the_way' && prev.status === 'preparing') {
            setChatMessages(c => [...c, {
              sender: 'rider',
              text: 'I am on my scooter heading to your address. Traffic seems thin so expect a hot meal!',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          } else if (nextStatus === 'delivered' && prev.status === 'on_the_way') {
            setChatMessages(c => [...c, {
              sender: 'rider',
              text: 'Arrived! Im at your lobby gate. Hope you love BiteRush ⚡ Enjoy your meal!',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          }

          return {
            ...prev,
            progress: nextProgress,
            status: nextStatus as any,
            etaMinutes: nextEta,
            routeStep: nextStep
          };
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentScreen]);

  // Reset tracking state if order is placed
  const startNewTracking = () => {
    setOrder({
      status: 'confirmed',
      progress: 10,
      etaMinutes: 20,
      riderName: 'David Williamson',
      riderRating: 4.8,
      riderPhone: '+1 (555) 782-9902',
      riderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      routeStep: 0
    });
    setChatMessages([
      { sender: 'rider', text: 'Hi! I am David, your courier. Preparing cooking status from BkBite Hub now! ETA: 20 mins.', time: '09:41' }
    ]);
  };

  // Add to cart helper
  const addToCartHelper = (item: FoodItem, qtyInput = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.foodItem.id === item.id);
      if (existing) {
        return prev.map(i => i.foodItem.id === item.id ? { ...i, quantity: i.quantity + qtyInput } : i);
      }
      return [...prev, { foodItem: item, quantity: qtyInput }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.foodItem.id === id) {
          const newQty = i.quantity + delta;
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  // Favorite toggling
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const timeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'user', text: chatInput, time: timeFormatted }]);
    setChatInput('');
    
    // Simulate rider typing back
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        sender: 'rider',
        text: "Thanks for checking! I will keep you posted here.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  // Calculations
  const getSubtotal = () => cart.reduce((acc, item) => acc + (item.foodItem.price * item.quantity), 0);
  const getDiscount = () => {
    if (appliedPromo === 'BITE40') {
      return getSubtotal() * 0.40;
    }
    return 0;
  };
  const getDeliveryFee = () => (getSubtotal() > 0 ? 1.50 : 0);
  const getTotal = () => Math.max(0, getSubtotal() - getDiscount() + getDeliveryFee());

  const applyPromoCode = (code: string) => {
    const raw = code.trim().toUpperCase();
    if (raw === 'BITE40') {
      setAppliedPromo('BITE40');
      setPromoSuccess('40% coupon applied successfully! 🎉');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try codes like "BITE40"');
      setPromoSuccess('');
    }
  };

  // Inline styling helper for maps
  const renderSimulatedMap = () => {
    const progress = order.progress;
    // Simple line on SVG to show route moving
    const riderX = 50 + (progress * 2.2); // moves from 50 to 270 on x axis
    const riderY = 160 - (Math.sin((progress / 100) * Math.PI) * 50); // curve upward and down

    return (
      <div className="relative w-full h-44 bg-slate-100 rounded-2xl overflow-hidden border border-amber-100 shadow-inner">
        {/* Abstract Map Background Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#FF5A1F 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        {/* Map Elements */}
        {/* Primary Pathway */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Street line */}
          <path d="M 50 160 C 120 110, 200 110, 270 160" fill="none" stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" />
          <path d="M 50 160 C 120 110, 200 110, 271 160" fill="none" stroke="#FF5A1F" strokeWidth="4" strokeDasharray="1000" strokeDashoffset={1000 - (progress * 10)} strokeLinecap="round" />
          
          {/* Restaurant Marker */}
          <circle cx="50" cy="160" r="10" fill="#FFC43D" stroke="#FFF" strokeWidth="2" />
          {/* Customer Marker */}
          <circle cx="270" cy="160" r="12" fill="#FF5A1F" stroke="#FFF" strokeWidth="2" className="animate-ping opacity-35" />
          <circle cx="270" cy="160" r="10" fill="#FF5A1F" stroke="#FFF" strokeWidth="2" />
          
          {/* Rider Marker */}
          <circle cx={riderX} cy={riderY} r="9" fill="#FFF" stroke="#FF5A1F" strokeWidth="2" />
        </svg>

        {/* Labels */}
        <div className="absolute left-2 top-[120px] text-[10px] font-bold text-gray-500 bg-white px-1.5 py-0.5 rounded shadow">
          {selectedRestaurant.name}
        </div>
        <div className="absolute right-4 top-[125px] text-[10px] font-bold text-white bg-orange-600 px-1.5 py-0.5 rounded shadow">
          Your Home
        </div>

        {/* Floating Rider head on map */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-[26px] bg-white border border-orange-500 rounded-full p-0.5 shadow-md flex items-center justify-center transition-all duration-300"
          style={{ left: `${riderX}px`, top: `${riderY}px` }}
        >
          <span className="text-xs">🛵</span>
        </div>
      </div>
    );
  };

  return (
    <div id="bite-rush-phone-sim" className="relative mx-auto w-[330px] h-[670px] rounded-[44px] bg-black p-3.5 shadow-2xl border-[5px] border-amber-950/20 overflow-hidden select-none">
      {/* Top Dynamic Island Area */}
      <div className="absolute top-0 inset-x-0 h-8 bg-black flex items-center justify-center z-50">
        <div className="w-28 h-4.5 bg-black rounded-full flex items-center justify-around px-2 text-[10px] text-white">
          <span className="text-[10px] font-bold pl-1 font-mono">9:41</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900/40" />
          <div className="flex space-x-1 items-center">
            <span className="text-[8px]">📶</span>
            <span className="text-[8px]">🔋</span>
          </div>
        </div>
      </div>

      {/* Main Screen Container */}
      <div className="w-full h-full rounded-[30px] bg-[#FFF8F3] overflow-hidden relative flex flex-col pt-4">

        {/* =========================================
            SCREEN 1: WELCOME SCREEN
            ========================================= */}
        {currentScreen === 'WELCOME' && (
          <div className="flex-1 flex flex-col bg-gradient-to-b from-[#EA4C14] to-[#BF360C] text-white relative px-5 justify-between py-6">
            {/* Ambient Background Circles */}
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-orange-400/25 blur-2xl" />
            <div className="absolute bottom-20 right-5 w-40 h-40 rounded-full bg-amber-400/20 blur-3xl animate-pulse-subtle" />

            {/* Small Brand Header */}
            <div className="flex items-center space-x-2 mt-4 self-center bg-white/10 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-lg">⚡</span>
              <span className="font-display font-bold tracking-wider text-sm text-yellow-300">BITERUSH</span>
            </div>

            {/* Huge Realistic Burger Centerpiece */}
            <div className="relative flex-1 flex items-center justify-center py-4">
              <div className="absolute w-52 h-52 bg-yellow-500/10 rounded-full blur-2xl animate-spin-slow" />
              
              {/* Spinning 3D Look Food Image */}
              <div className="relative z-10 w-48 h-48 animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=350" 
                  alt="Delicious burger"
                  className="w-full h-full object-contain rounded-full shadow-2xl border-4 border-white/20"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Micro elements */}
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-black font-display font-extrabold text-[10px] px-2 py-1 rounded-full shadow-lg transform rotate-6 border border-white flex items-center space-x-0.5">
                  <span>⭐</span>
                  <span>4.9</span>
                </div>
                
                <div className="absolute bottom-1 -left-3 bg-[#1A120B] text-white font-sans font-bold text-[9px] px-2 py-1 rounded-full shadow-lg transform -rotate-6 border border-white/10">
                  ⚡ 15 min delivery
                </div>
              </div>
            </div>

            {/* Welcome Typography */}
            <div className="relative z-10 text-center mb-5">
              <h1 className="font-display font-extrabold text-2xl tracking-normal leading-tight text-white mb-2.5">
                Step Into <br/>
                <span className="text-amber-300 drop-shadow">Flavor World</span>
              </h1>
              <p className="text-orange-100 text-[11px] leading-relaxed max-w-[240px] mx-auto">
                Discover the best restaurants in your city and get delicious, hot meals delivered in minutes.
              </p>
            </div>

            {/* Splash Buttons */}
            <div className="space-y-2.5 mb-2 relative z-10">
              <button 
                id="btn-splash-get-started"
                className="w-full bg-white hover:bg-yellow-100 active:scale-95 transition text-[#FF5A1F] font-display font-bold py-3 px-5 rounded-2xl shadow-xl text-xs flex items-center justify-center space-x-1.5"
                onClick={() => navigateTo('HOME')}
              >
                <span>Get Started</span>
                <ChevronRight size={14} className="stroke-[3]" />
              </button>
              
              <button 
                id="btn-splash-login"
                className="w-full bg-orange-700/40 hover:bg-orange-700/60 active:scale-95 transition text-white border border-white/10 font-sans font-medium py-2.5 rounded-2xl text-[10px]"
                onClick={() => navigateTo('HOME')}
              >
                I already have an account
              </button>

              <p className="text-[8px] text-center text-orange-200/70 pt-1">
                By continuing, you accept our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
              </p>
            </div>
          </div>
        )}

        {/* =========================================
            SCREEN 2: HOME SCREEN
            ========================================= */}
        {currentScreen === 'HOME' && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-16 px-4">
            
            {/* Header: Location & Profile */}
            <div className="flex items-center justify-between mt-3 mb-4 shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
                  <MapPin size={14} className="stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">Deliver to</div>
                  <div className="text-[11px] font-bold text-gray-900 flex items-center">
                    <span>Mirpur, Dhaka</span>
                    <span className="text-[8px] ml-1 text-orange-500">▼</span>
                  </div>
                </div>
              </div>
              
              {/* Cart shortcut */}
              <div className="relative flex space-x-1.5">
                <button 
                  id="btn-home-cart"
                  className="w-8 h-8 rounded-full bg-white shadow-sm hover:shadow border border-amber-100/50 flex items-center justify-center text-gray-700 relative"
                  onClick={() => navigateTo('CART')}
                >
                  <ShoppingBag size={14} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-600 text-white font-bold text-[8px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce-subtle">
                      {cart.reduce((ac, x) => ac + x.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Extra Discount Promotional Slip */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-2xl text-white mb-4 relative overflow-hidden shrink-0 shadow-md">
              <div className="absolute right-0 top-0 bottom-0 w-28 bg-white/10 transform rotate-12 translate-x-4 skew-x-3 pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="bg-amber-400 text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded">HOT PROMO</span>
                  </div>
                  <h3 className="font-display font-extrabold text-sm text-yellow-300 mt-1">27% EXTRA DISCOUNT</h3>
                  <p className="text-[9px] text-orange-100 mt-0.5">Enjoy your first order with a special voucher discount!</p>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shrink-0 shadow">
                  <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=150" alt="burger float" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>

            {/* Custom Search bar */}
            <div className="relative mb-5 shrink-0">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                <Search size={14} />
              </div>
              <input 
                id="phone-search-input"
                type="text" 
                placeholder="Search food, cuisines or spots..." 
                className="w-full bg-white border border-amber-100/70 shadow-sm rounded-xl py-2 pl-9 pr-8 text-xs focus:outline-none focus:border-orange-500 text-gray-800 font-sans"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-2.5 flex items-center">
                <button className="p-1 text-orange-500 hover:text-orange-600">
                  <SlidersHorizontal size={13} />
                </button>
              </div>
            </div>

            {/* Categories segment */}
            <div className="mb-4 shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-xs text-gray-900">Categories</span>
                <span className="text-[9px] text-orange-600 font-bold hover:underline cursor-pointer">Clear</span>
              </div>
              <div className="flex space-x-2.5 overflow-x-auto no-scrollbar py-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className={`flex flex-col items-center p-1.5 rounded-2xl min-w-[55px] cursor-pointer transition-all duration-300 ${
                      selectedCategory.id === cat.id 
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25 scale-105' 
                        : 'bg-white text-gray-700 border border-amber-50/70 hover:bg-amber-50/50 shadow-sm'
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      navigateTo('CATEGORY');
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base mb-1 ${
                      selectedCategory.id === cat.id ? 'bg-white/20' : 'bg-orange-50'
                    }`}>
                      {cat.icon}
                    </div>
                    <span className="text-[9px] font-bold tracking-tight">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Foods Grid matching Search or Default */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-xs text-gray-900">Popular Dishes</span>
                <span className="text-[9px] text-gray-400 font-medium">Trending 🔥</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2.5">
                {FOOD_ITEMS.filter(it => 
                  searchQuery ? it.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
                ).slice(0, 4).map((dish) => (
                  <div 
                    key={dish.id} 
                    className="bg-white rounded-2xl p-2 border border-amber-50 shadow-sm hover:shadow transition-all relative flex flex-col justify-between cursor-pointer"
                    onClick={() => {
                      setSelectedFood(dish);
                      navigateTo('FOOD_DETAILS');
                    }}
                  >
                    {/* Favorite Icon */}
                    <button 
                      className="absolute right-2 top-2 z-10 w-6 h-6 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition"
                      onClick={(e) => toggleFavorite(dish.id, e)}
                    >
                      <Heart size={11} fill={favorites.includes(dish.id) ? '#EF4444' : 'none'} className={favorites.includes(dish.id) ? 'text-red-500' : ''} />
                    </button>
                    
                    <div>
                      {/* Image */}
                      <div className="w-full h-24 rounded-xl overflow-hidden bg-amber-50 mb-1.5 relative">
                        <img 
                          src={dish.image} 
                          alt={dish.name} 
                          className="w-full h-full object-cover transition hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <h4 className="font-display font-bold text-[10px] text-gray-900 leading-tight truncate">{dish.name}</h4>
                      
                      <div className="flex items-center space-x-1 mt-0.5 mb-1.5">
                        <span className="text-yellow-500 text-[8px]">⭐</span>
                        <span className="text-gray-800 text-[8px] font-bold">{dish.rating}</span>
                        <span className="text-gray-400 text-[8px]">({dish.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-1 border-t border-dashed border-gray-100">
                      <span className="text-orange-600 font-display font-extrabold text-[10px]">${dish.price.toFixed(2)}</span>
                      <button 
                        className="w-5.5 h-5.5 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition active:scale-90"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCartHelper(dish, 1);
                        }}
                      >
                        <Plus size={10} className="stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Restaurants */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-display font-bold text-xs text-gray-900">Popular Restaurants</span>
                <span className="text-[9px] text-orange-600 font-bold hover:underline cursor-pointer">See All</span>
              </div>

              <div className="space-y-2.5">
                {RESTAURANTS.slice(0, 2).map((rest) => (
                  <div 
                    key={rest.id}
                    className="bg-white rounded-2xl p-2 border border-amber-50 shadow-sm hover:shadow transition flex space-x-2.5 cursor-pointer relative"
                    onClick={() => {
                      setSelectedRestaurant(rest);
                      navigateTo('RESTAURANT_HUB');
                    }}
                  >
                    {/* Badge */}
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[7px] font-extrabold px-1 py-0.5 rounded z-10">
                      50% OFF
                    </div>

                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 relative shrink-0">
                      <img 
                        src={rest.bannerImage} 
                        alt={rest.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-center space-x-1 justify-between">
                          <h4 className="font-display font-bold text-[11px] text-gray-900 truncate">{rest.name}</h4>
                          <span className="text-gray-400 text-[10.5px] hover:text-red-500 flex items-center shrink-0">
                            <Heart size={10} />
                          </span>
                        </div>
                        <p className="text-[8.5px] text-gray-500 truncate mt-0.5">{rest.cuisine}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2.5 text-[8.5px] mt-1 text-gray-600">
                        <div className="flex items-center space-x-0.5">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-bold text-gray-800">{rest.rating}</span>
                        </div>
                        <div className="flex items-center space-x-0.5">
                          <span>⏱️</span>
                          <span>{rest.deliveryTime}</span>
                        </div>
                        <div className="flex items-center space-x-0.5">
                          <span>📦</span>
                          <span className="text-emerald-600 font-semibold">{rest.deliveryFee === 'Free' ? 'Free' : `$${rest.deliveryFee}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* =========================================
            SCREEN 3: RESTAURANT HUB
            ========================================= */}
        {currentScreen === 'RESTAURANT_HUB' && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-16">
            {/* Header image */}
            <div className="h-28 relative shrink-0">
              <img 
                src={selectedRestaurant.bannerImage} 
                className="w-full h-full object-cover" 
                alt={selectedRestaurant.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/3" />
              
              {/* Back Button */}
              <button 
                className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-gray-700 shadow shadow-black/10 hover:bg-orange-50 active:scale-90 transition"
                onClick={navigateBack}
              >
                <ArrowLeft size={13} className="stroke-[2.5]" />
              </button>

              {/* Heart and share */}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="w-7 h-7 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-gray-700 shadow shadow-black/10 hover:bg-orange-50 active:scale-90 transition">
                  <Heart size={11} className="text-red-500 fill-red-500" />
                </button>
                <button className="w-7 h-7 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-gray-700 shadow shadow-black/10 hover:bg-orange-50 active:scale-90 transition">
                  <Share2 size={11} />
                </button>
              </div>

              {/* Title & Floating Info */}
              <div className="absolute bottom-2 left-4 right-4">
                <h3 className="font-display font-extrabold text-xs text-white drop-shadow-sm">{selectedRestaurant.name}</h3>
                <p className="text-[8px] text-gray-200 mt-0.5 truncate">{selectedRestaurant.cuisine} • {selectedRestaurant.distance}</p>
              </div>
            </div>

            {/* Restaurant description & Stats */}
            <div className="p-4 flex-1">
              <div className="flex justify-between items-center bg-white p-2.5 rounded-2xl border border-amber-50 shadow-sm mb-4">
                <div className="text-center flex-1">
                  <div className="text-xs font-bold text-gray-800 flex items-center justify-center">
                    <span className="text-yellow-500 mr-0.5">⭐</span>
                    {selectedRestaurant.rating}
                  </div>
                  <div className="text-[7.5px] text-gray-400 uppercase tracking-tight mt-0.5">Rating</div>
                </div>
                <div className="w-px h-6 bg-gray-100" />
                <div className="text-center flex-1">
                  <div className="text-[11px] font-bold text-gray-800">{selectedRestaurant.deliveryTime}</div>
                  <div className="text-[7.5px] text-gray-400 uppercase tracking-tight mt-0.5">Delivery</div>
                </div>
                <div className="w-px h-6 bg-gray-100" />
                <div className="text-center flex-1">
                  <div className="text-[11px] font-bold text-orange-600">{selectedRestaurant.followersCount}</div>
                  <div className="text-[7.5px] text-gray-400 uppercase tracking-tight mt-0.5">Followers</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">About Restaurant</h4>
                <p className="text-[10px] text-gray-600 leading-relaxed">{selectedRestaurant.description}</p>
                <div className="flex space-x-1.5 mt-2.5">
                  <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-display font-bold text-[9px] py-1.5 px-3 rounded-lg flex items-center justify-center space-x-1 shadow-sm active:scale-95 transition">
                    <span>Follow</span>
                  </button>
                  <button className="flex-1 bg-white hover:bg-amber-50 text-gray-700 border border-amber-100 font-display font-bold text-[9px] py-1.5 px-3 rounded-lg flex items-center justify-center space-x-1 shadow-sm active:scale-95 transition">
                    <span>Chat Info</span>
                  </button>
                </div>
              </div>

              {/* Menu listings */}
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-1.5">
                  <span className="font-display font-bold text-xs text-gray-900">Popular Menu items</span>
                  <span className="text-[8.5px] text-gray-400">Total {selectedRestaurant.products?.length || 0}</span>
                </div>

                <div className="space-y-2.5">
                  {(selectedRestaurant.products || FOOD_ITEMS.slice(0, 3)).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setSelectedFood(item);
                        navigateTo('FOOD_DETAILS');
                      }}
                      className="bg-white rounded-xl p-2 border border-amber-50 shadow-sm flex space-x-2.5 cursor-pointer hover:shadow transition"
                    >
                      <div className="w-12 h-12 rounded-lg bg-orange-50 overflow-hidden shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h5 className="font-display font-bold text-[10px] text-gray-900 truncate leading-tight">{item.name}</h5>
                            <span className="text-orange-600 font-display font-extrabold text-[10.5px] ml-1 shrink-0">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-[8px] text-gray-400 truncate mt-0.5">{item.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center space-x-1 text-[8.5px] text-gray-500">
                            <span>⭐</span>
                            <span className="font-bold text-gray-800">{item.rating}</span>
                          </div>
                          <button 
                            className="bg-amber-100 hover:bg-orange-600 hover:text-white text-orange-600 font-bold text-[8px] py-0.5 px-2 rounded-full transition active:scale-90"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCartHelper(item, 1);
                            }}
                          >
                            + Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================
            SCREEN 4: FOOD DETAILS SCREEN
            ========================================= */}
        {currentScreen === 'FOOD_DETAILS' && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-16">
            
            {/* Header / Big burger display */}
            <div className="h-44 bg-gradient-to-b from-orange-100 to-amber-50 relative flex items-center justify-center py-2 shrink-0">
              {/* Back button */}
              <button 
                className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-gray-700 shadow shadow-black/10 hover:bg-orange-50 active:scale-95 transition"
                onClick={navigateBack}
              >
                <ArrowLeft size={13} className="stroke-[2.5]" />
              </button>

              <button 
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-gray-700 shadow shadow-black/10 hover:bg-orange-50 active:scale-95 transition"
                onClick={() => toggleFavorite(selectedFood.id)}
              >
                <Heart size={11} fill={favorites.includes(selectedFood.id) ? '#EF4444' : 'none'} className={favorites.includes(selectedFood.id) ? 'text-red-500' : ''} />
              </button>

              {/* Floating food visual */}
              <div className="w-32 h-32 animate-float shrink-0">
                <img 
                  src={selectedFood.image} 
                  alt={selectedFood.name} 
                  className="w-full h-full object-contain rounded-full shadow-lg border border-white"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Content area */}
            <div className="p-4 flex-1">
              {/* Badges */}
              <div className="flex space-x-1 px-0.5 mb-1.5">
                <div className="bg-orange-100 text-orange-600 text-[8px] font-bold px-2 py-0.5 rounded-full">
                  🔥 Best Seller
                </div>
                <div className="bg-amber-100 text-yellow-800 text-[8px] font-bold px-2 py-0.5 rounded-full">
                  ⏱️ {selectedFood.prepTime}
                </div>
              </div>

              {/* Food Details Title */}
              <h3 className="font-display font-extrabold text-sm text-gray-900 leading-snug">{selectedFood.name}</h3>
              
              <div className="flex items-center justify-between mt-1 mb-3.5 pb-2.5 border-b border-gray-100">
                <div className="flex items-center space-x-1.5 text-[10px] text-gray-600">
                  <div className="flex items-center space-x-0.5">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-bold text-gray-800">{selectedFood.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{selectedFood.reviewsCount} Reviews</span>
                </div>
                
                {/* Product price */}
                <div className="text-orange-600 font-display font-extrabold text-sm">
                  ${selectedFood.price.toFixed(2)}
                </div>
              </div>

              {/* Description paragraph */}
              <div className="mb-4">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Description</h4>
                <p className="text-[10px] text-gray-600 leading-relaxed">
                  {selectedFood.description}
                </p>
              </div>

              {/* Ingredients list with custom bubbles */}
              <div className="mb-5">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Key Ingredients</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFood.ingredients.map((ing, k) => (
                    <span key={k} className="bg-white border border-amber-100/80 text-gray-600 text-[8.5px] font-semibold py-1 px-2.5 rounded-xl shadow-sm">
                      ✨ {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to Cart panel with quantity counter */}
              <div className="bg-orange-50 border border-orange-100 p-3 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-2.5 bg-white px-2.5 py-1 rounded-xl border border-orange-100 shadow-sm">
                  {/* Local state increment for details */}
                  <span className="text-[9.5px] font-bold text-gray-500">Quantity</span>
                  <div className="flex items-center space-x-1.5 pl-1.5 border-l border-gray-100">
                    <span className="text-orange-600 font-bold text-xs pointer-events-none">1</span>
                  </div>
                </div>

                <button 
                  id="btn-detail-add-to-cart"
                  className="flex-1 ml-3 bg-orange-600 hover:bg-orange-700 text-white font-display font-bold text-[10.5px] py-2.5 rounded-xl shadow-md active:scale-95 transition flex items-center justify-center space-x-1"
                  onClick={() => {
                    addToCartHelper(selectedFood, 1);
                    navigateTo('CART');
                  }}
                >
                  <ShoppingBag size={11} className="stroke-[2.5]" />
                  <span>Add To Cart</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* =========================================
            SCREEN 5: CATEGORY FILTER GRAPH
            ========================================= */}
        {currentScreen === 'CATEGORY' && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-16 px-4">
            
            {/* Header */}
            <div className="flex items-center space-x-2 mt-3 mb-4 shrink-0">
              <button 
                className="w-7 h-7 rounded-full bg-white border border-amber-100 flex items-center justify-center text-gray-700 shadow-sm hover:bg-orange-50 active:scale-90 transition"
                onClick={navigateBack}
              >
                <ArrowLeft size={13} className="stroke-[2.5]" />
              </button>
              <div>
                <h3 className="font-display font-bold text-xs text-gray-900">{selectedCategory.name} Selection</h3>
                <p className="text-[8.5px] text-gray-400">Fresh and quick delivery list</p>
              </div>
            </div>

            {/* Quick stats / filters menu inside */}
            <div className="flex space-x-1.5 mb-4 shrink-0 overflow-x-auto no-scrollbar pb-1">
              <span className="bg-orange-100 text-orange-600 text-[8px] font-bold px-2 py-1 rounded-lg border border-orange-100 flex items-center">
                <SlidersHorizontal size={8} className="mr-1" /> Sort count
              </span>
              <span className="bg-white text-gray-600 border border-amber-100 text-[8px] font-semibold px-2 py-1 rounded-lg">
                Rating 4.8+
              </span>
              <span className="bg-white text-gray-600 border border-amber-100 text-[8px] font-semibold px-2 py-1 rounded-lg">
                Under $5.00
              </span>
            </div>

            {/* List match */}
            <div className="space-y-2.5">
              {FOOD_ITEMS.filter(it => it.category === selectedCategory.id).length === 0 ? (
                <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
                  <p className="text-xs text-gray-400">No other items in this category.</p>
                  <button 
                    className="mt-2 text-[10px] text-orange-600 font-bold underline"
                    onClick={() => navigateTo('HOME')}
                  >
                    Go back Home
                  </button>
                </div>
              ) : (
                FOOD_ITEMS.filter(it => it.category === selectedCategory.id).map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl p-2.5 border border-amber-50 shadow-sm flex space-x-3 cursor-pointer hover:shadow transition relative"
                    onClick={() => {
                      setSelectedFood(item);
                      navigateTo('FOOD_DETAILS');
                    }}
                  >
                    <div className="w-16 h-16 rounded-xl bg-orange-50 overflow-hidden relative shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-bold text-[10.5px] text-gray-900 leading-tight truncate">{item.name}</h4>
                          <span className="text-orange-600 font-semibold text-[10.5px] ml-1 shrink-0 font-display">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="text-[8.5px] text-gray-400 truncate mt-0.5">{item.description}</p>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center space-x-2 text-[8.5px] text-gray-500">
                          <div className="flex items-center space-x-0.5">
                            <span className="text-yellow-500">⭐</span>
                            <span className="font-bold text-gray-800">{item.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{item.prepTime}</span>
                        </div>

                        {/* Direct add button */}
                        <button 
                          className="w-5.5 h-5.5 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition active:scale-90"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCartHelper(item, 1);
                          }}
                        >
                          <Plus size={10} className="stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* =========================================
            SCREEN 6: CART SCREEN
            ========================================= */}
        {currentScreen === 'CART' && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-16 px-4">
            
            {/* Header */}
            <div className="flex items-center space-x-2 mt-3 mb-4 shrink-0">
              <button 
                className="w-7 h-7 rounded-full bg-white border border-amber-100 flex items-center justify-center text-gray-700 shadow-sm hover:bg-orange-50 active:scale-95 transition"
                onClick={navigateBack}
              >
                <ArrowLeft size={13} className="stroke-[2.5]" />
              </button>
              <div>
                <h3 className="font-display font-bold text-xs text-gray-900">My Basket</h3>
                <p className="text-[8.5px] text-gray-400">Order from BK Bites & cafes</p>
              </div>
            </div>

            {/* Cart products listing */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-10 bg-white rounded-3xl border border-dashed border-amber-200/60 p-5 mt-2">
                <span className="text-3xl mb-3">🛒</span>
                <p className="text-[11px] font-bold text-gray-800">Your basket is empty</p>
                <p className="text-[9px] text-gray-400 text-center mt-1">Add items from the menu to start your flavors adventure!</p>
                <button 
                  id="btn-cart-empty-go-shop"
                  className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-display font-bold text-[9px] py-1.5 px-4 rounded-xl transition shadow-sm"
                  onClick={() => navigateTo('HOME')}
                >
                  Shop Best Dishes
                </button>
              </div>
            ) : (
              <div className="space-y-3 mb-4 flex-1">
                {cart.map((item) => (
                  <div 
                    key={item.foodItem.id} 
                    className="bg-white rounded-2xl p-2 border border-amber-50 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                      <div className="w-11 h-11 rounded-xl bg-orange-50 overflow-hidden shrink-0">
                        <img 
                          src={item.foodItem.image} 
                          alt={item.foodItem.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 pr-1">
                        <h4 className="font-display font-bold text-[10px] text-gray-900 leading-tight truncate">{item.foodItem.name}</h4>
                        <p className="text-orange-600 font-bold text-[10px] mt-0.5">${item.foodItem.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Stepper counts */}
                    <div className="flex items-center space-x-2 bg-gray-50 p-1 rounded-xl border border-gray-100 shrink-0">
                      <button 
                        className="w-5 h-5 rounded-lg bg-white flex items-center justify-center text-gray-600 shadow-sm hover:bg-orange-100 hover:text-orange-600 cursor-pointer active:scale-90"
                        onClick={() => updateCartQty(item.foodItem.id, -1)}
                      >
                        <Minus size={9} className="stroke-[3]" />
                      </button>
                      <span className="text-[10px] font-bold w-4.5 text-center text-gray-800">{item.quantity}</span>
                      <button 
                        className="w-5 h-5 rounded-lg bg-white flex items-center justify-center text-gray-600 shadow-sm hover:bg-orange-100 hover:text-orange-600 cursor-pointer active:scale-90"
                        onClick={() => updateCartQty(item.foodItem.id, 1)}
                      >
                        <Plus size={9} className="stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Promo Code Entry Box */}
                <div className="bg-white p-3 rounded-2xl border border-amber-50 shadow-sm mt-4">
                  <div className="text-[10px] font-bold text-gray-700 mb-1.5 flex items-center">
                    <span>🏷️ Coupon Discount</span>
                    <span className="ml-auto text-[8px] text-orange-500 font-mono">Use "BITE40" key</span>
                  </div>
                  <div className="flex space-x-1.5">
                    <input 
                      id="promo-code-input"
                      type="text" 
                      placeholder="Enter promo (e.g. BITE40)" 
                      className="flex-1 bg-amber-50/50 rounded-xl px-2.5 py-1.5 text-[9.5px] border border-transparent focus:outline-none focus:border-orange-400 placeholder:text-gray-400 font-mono text-gray-700"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          applyPromoCode(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <button 
                      className="bg-[#1A120B] hover:bg-orange-600 text-white font-display font-medium text-[8.5px] px-3 rounded-xl transition active:scale-92"
                      onClick={() => {
                        const val = (document.getElementById('promo-code-input') as HTMLInputElement)?.value;
                        if (val) {
                          applyPromoCode(val);
                          (document.getElementById('promo-code-input') as HTMLInputElement).value = '';
                        }
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-red-500 text-[8px] mt-1 font-sans">{promoError}</p>}
                  {promoSuccess && <p className="text-green-600 text-[8px] mt-1 font-bold font-sans">{promoSuccess}</p>}
                </div>

                {/* Checkout Summary Calculations */}
                <div className="bg-white p-3 rounded-2xl border border-amber-50 shadow-sm space-y-2 mt-4 text-[9.5px]">
                  <div className="flex justify-between text-gray-500">
                    <span>Basket Subtotal</span>
                    <span className="font-semibold text-gray-800">${getSubtotal().toFixed(2)}</span>
                  </div>
                  {getDiscount() > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Voucher Code (40% OFF)</span>
                      <span>-${getDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery fee</span>
                    <span className="font-semibold text-gray-800">${getDeliveryFee().toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gray-100 my-1" />
                  <div className="flex justify-between text-xs font-bold text-gray-900 pt-0.5">
                    <span>Total Amount</span>
                    <span className="text-[#FF5A1F]">${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order CTA Section */}
                <div className="pt-3">
                  <button 
                    id="btn-cart-checkout"
                    className="w-full bg-[#FF5A1F] hover:bg-[#E04E17] text-white font-display font-bold py-3 px-4 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center space-x-1"
                    onClick={() => {
                      startNewTracking();
                      navigateTo('TRACKING');
                    }}
                  >
                    <span>Place Food Order</span>
                    <ChevronRight size={13} className="stroke-[3]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================
            SCREEN 7: TRACKING SCREEN
            ========================================= */}
        {currentScreen === 'TRACKING' && (
          <div className="flex-1 flex flex-col pt-3 pb-16 px-4 overflow-y-auto no-scrollbar">
            
            {/* Header */}
            <div className="flex items-center space-x-2 mb-3 shrink-0">
              <button 
                className="w-7 h-7 rounded-full bg-white border border-amber-100 flex items-center justify-center text-gray-700 shadow-sm hover:bg-[#FFF8F3]"
                onClick={() => navigateTo('HOME')}
              >
                <ArrowLeft size={13} className="stroke-[2.5]" />
              </button>
              <div>
                <h3 className="font-display font-bold text-xs text-gray-900">Delivery Status</h3>
                <p className="text-[8.5px] text-gray-400">ID: #BR-98442Z</p>
              </div>
            </div>

            {/* Simulated Live Route Map View */}
            {renderSimulatedMap()}

            {/* ETA Card Overlay */}
            <div className="bg-white p-3 rounded-2xl border border-amber-50 shadow-sm -mt-5 relative z-10 mx-1 mb-4 flex items-center justify-between">
              <div>
                <p className="text-[8px] uppercase tracking-wider text-gray-400 font-bold">Estimated Arrival</p>
                <h3 className="font-display font-extrabold text-sm text-gray-900 mt-0.5">
                  {order.status === 'delivered' ? 'Food Arrived! 🎉' : `${order.etaMinutes} - ${order.etaMinutes + 5} Minutes`}
                </h3>
              </div>
              <div className="bg-orange-100 text-orange-600 font-bold text-[9px] px-2 py-1 rounded-lg">
                🛵 Fast Courier
              </div>
            </div>

            {/* Order Courier/Rider Info Spot */}
            <div className="bg-amber-50/50 p-2.5 rounded-2xl border border-amber-100/60 mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-orange-200">
                  <img src={order.riderAvatar} className="w-full h-full object-cover" alt="rider avatar" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-800">{order.riderName}</h4>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className="text-yellow-500 text-[8px]">⭐</span>
                    <span className="text-gray-500 text-[8px] font-semibold">{order.riderRating} (100+ deliveries)</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1.5">
                <a href={`tel:${order.riderPhone}`} className="w-6.5 h-6.5 rounded-full bg-white flex items-center justify-center text-orange-600 border border-amber-200/50 hover:bg-orange-50 transition active:scale-90 shadow-sm">
                  <Phone size={10} />
                </a>
              </div>
            </div>

            {/* Realtime Delivery Milestones Stepper */}
            <div className="bg-white p-3 rounded-2xl border border-amber-50 shadow-sm space-y-3.5 mb-4 text-[9.5px]">
              <div className="flex items-start space-x-2.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border text-[8px] font-bold ${
                  order.progress >= 15 ? 'bg-orange-600 text-white border-transparent' : 'border-gray-200 text-gray-400'
                }`}>
                  {order.progress >= 15 ? '✓' : '1'}
                </div>
                <div className="flex-1 leading-tight">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Order Confirmed</span>
                    <span className="text-gray-400 font-mono text-[8px]">09:41 PM</span>
                  </div>
                  <p className="text-gray-500 text-[8px] mt-0.5">Kitchen received your reservation ticket</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border text-[8px] font-bold ${
                  order.progress >= 40 ? 'bg-orange-600 text-white border-transparent' : 'border-gray-200 text-gray-400'
                }`}>
                  {order.progress >= 40 ? '✓' : '2'}
                </div>
                <div className="flex-1 leading-tight">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span className={order.progress >= 40 ? 'text-gray-950 font-bold' : 'text-gray-400 font-medium'}>Preparing Cooking</span>
                    <span className="text-gray-400 font-mono text-[8px]">{order.progress >= 40 ? '09:45 PM' : '--:--'}</span>
                  </div>
                  <p className="text-gray-500 text-[8px] mt-0.5">{order.progress >= 40 ? 'Chef is packing raw warm items' : 'Awaiting confirmation step'}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border text-[8px] font-bold ${
                  order.progress >= 75 ? 'bg-orange-600 text-white border-transparent' : 'border-gray-200 text-gray-400'
                }`}>
                  {order.progress >= 75 ? '✓' : '3'}
                </div>
                <div className="flex-1 leading-tight">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span className={order.progress >= 75 ? 'text-gray-950 font-bold' : 'text-gray-400 font-medium'}>Foods On The Way</span>
                    <span className="text-gray-400 font-mono text-[8px]">{order.progress >= 75 ? '09:54 PM' : '--:--'}</span>
                  </div>
                  <p className="text-gray-500 text-[8px] mt-0.5">{order.progress >= 75 ? 'Rider on route via express lanes' : 'Awaiting cooking finished'}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border text-[8px] font-bold ${
                  order.progress >= 100 ? 'bg-orange-600 text-white border-transparent' : 'border-gray-200 text-gray-400'
                }`}>
                  {order.progress >= 100 ? '✓' : '4'}
                </div>
                <div className="flex-1 leading-tight">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span className={order.progress >= 100 ? 'text-gray-950 font-bold' : 'text-gray-400 font-medium'}>Delivered To Customer</span>
                    <span className="text-gray-400 font-mono text-[8px]">{order.progress >= 100 ? '09:59 PM' : '--:--'}</span>
                  </div>
                  <p className="text-gray-500 text-[8px] mt-0.5">Handed over directly to you or lobby spot</p>
                </div>
              </div>
            </div>

            {/* Rider Chat Box inside app */}
            <div className="bg-white rounded-2xl border border-amber-50 shadow-sm overflow-hidden flex flex-col h-44 shrink-0">
              <div className="bg-[#1A120B] p-2 flex items-center space-x-1.5 font-display text-[9px] font-bold text-white uppercase tracking-wider">
                <span className="animate-ping w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Live Chat with {order.riderName}</span>
              </div>
              
              {/* Chat lines feed */}
              <div className="flex-1 p-2 overflow-y-auto space-y-1.5 bg-amber-50/20 text-[8.5px] leading-tight">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto'}`}>
                    <div className={`p-1.5 rounded-xl ${msg.sender === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                    <span className="text-[7px] text-gray-400 mt-0.5">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-1 px-2 border-t border-gray-100 flex items-center space-x-1">
                <input 
                  type="text" 
                  placeholder="Message courier..." 
                  className="flex-1 bg-gray-50 rounded-lg p-1 text-[8.5px] border-none focus:outline-none focus:ring-1 focus:ring-orange-200"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendChat();
                  }}
                />
                <button 
                  className="p-1 text-orange-600 hover:text-orange-700 disabled:opacity-30 self-center"
                  onClick={handleSendChat}
                  disabled={!chatInput.trim()}
                >
                  <Send size={11} />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* BOTTOM TAB SIMULATOR NAVIGATION (Only shown in logged-in state of home/categories/cart/etc) */}
        {currentScreen !== 'WELCOME' && (
          <div className="absolute bottom-0 inset-x-0 h-14 bg-white/95 backdrop-blur border-t border-amber-100/80 px-4 flex justify-around items-center z-40">
            <button 
              id="tab-sim-home"
              onClick={() => {
                setHistoryStack([]);
                setCurrentScreen('HOME');
              }}
              className={`flex flex-col items-center flex-1 cursor-pointer py-1.5 ${currentScreen === 'HOME' ? 'text-orange-600 font-bold' : 'text-gray-400'}`}
            >
              <span className="text-sm">🏠</span>
              <span className="text-[8px] mt-0.5 font-sans font-bold">Home</span>
            </button>
            <button 
              id="tab-sim-menu"
              onClick={() => {
                setSelectedCategory(CATEGORIES[0]);
                navigateTo('CATEGORY');
              }}
              className={`flex flex-col items-center flex-1 cursor-pointer py-1.5 ${currentScreen === 'CATEGORY' ? 'text-orange-600 font-bold' : 'text-gray-400'}`}
            >
              <span className="text-sm">🍕</span>
              <span className="text-[8px] mt-0.5 font-sans font-bold">Menu</span>
            </button>
            <button 
              id="tab-sim-cart"
              onClick={() => navigateTo('CART')}
              className={`flex flex-col items-center flex-1 cursor-pointer py-1.5 relative ${currentScreen === 'CART' ? 'text-orange-600 font-bold' : 'text-gray-400'}`}
            >
              <span className="text-sm">🛒</span>
              <span className="text-[8px] mt-0.5 font-sans font-bold">Cart</span>
              {cart.length > 0 && (
                <div className="absolute right-4.5 top-0.5 bg-orange-600 text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-sans">
                  {cart.reduce((ac, x) => ac + x.quantity, 0)}
                </div>
              )}
            </button>
            <button 
              id="tab-sim-delivery"
              onClick={() => navigateTo('TRACKING')}
              className={`flex flex-col items-center flex-1 cursor-pointer py-1.5 ${currentScreen === 'TRACKING' ? 'text-orange-600 font-bold' : 'text-gray-400'}`}
            >
              <span className="text-sm">🛵</span>
              <span className="text-[8px] mt-0.5 font-sans font-bold">Track</span>
            </button>
          </div>
        )}

        {/* Apple Simulated Home Indicator Bar */}
        <div className="absolute bottom-1 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-24 h-1 bg-gray-300 rounded-full" />
        </div>

      </div>
    </div>
  );
}
