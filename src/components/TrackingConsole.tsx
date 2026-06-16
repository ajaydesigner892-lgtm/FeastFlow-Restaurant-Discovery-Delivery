import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, MapPin, Check, Send, Phone, Star, ShieldCheck, HelpCircle, Flame, Navigation } from 'lucide-react';
import { OrderState } from '../types';

export default function TrackingConsole() {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(20);
  const [eta, setEta] = useState(18);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'rider'; text: string; time: string }[]>([
    { sender: 'rider', text: 'Hi! I am David, your BiteRush courier. I have secured your hot parcel in our double-insulated thermo bag, starting route now! 🛵', time: '11:41 PM' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-drive simulation increments
  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setProgress((prev) => {
          let next = prev + 8;
          if (next >= 100) {
            next = 100;
            setIsActive(false);
          }
          return next;
        });

        setEta((prev) => {
          const next = prev - 1;
          return next < 1 ? 1 : next;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Handle auto driver updates as progress changes
  useEffect(() => {
    const timeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (progress >= 45 && progress < 70 && chatMessages.length === 1) {
      setChatMessages(prev => [...prev, {
        sender: 'rider',
        text: 'Just cleared the central commercial block intersection. Sourdoughs are completely warm inside. ETA dropping! ⏱️',
        time: timeFormatted
      }]);
    } else if (progress >= 75 && progress < 95 && chatMessages.length === 2) {
      setChatMessages(prev => [...prev, {
        sender: 'rider',
        text: 'I am turning onto your apartment street now. Traffic looks quiet, expecting high-quality handover! 🏡',
        time: timeFormatted
      }]);
    } else if (progress === 100 && chatMessages.length < 4) {
      setChatMessages(prev => [...prev, {
        sender: 'rider',
        text: 'Arrived! I am currently at your lobby parking entrance. Welcome to BiteRush Gourmet experience! 🎉 Enjoy your meal!',
        time: timeFormatted
      }]);
    }
  }, [progress, chatMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleStartSimulation = () => {
    setProgress(15);
    setEta(18);
    setIsActive(true);
    setChatMessages([
      { sender: 'rider', text: 'Hi! I am David, your BiteRush courier. I have secured your hot parcel in our double-insulated thermo bag, starting route now! 🛵', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  const handleReset = () => {
    setProgress(20);
    setEta(20);
    setIsActive(false);
    setChatMessages([
      { sender: 'rider', text: 'Session reset. Driver state: Ready at Kitchen Hub 🌶️', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    const timeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: timeFormatted }]);
    setChatInput('');

    // Simulate Rider auto-answer
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'rider',
          text: "Copy that! Speeding up safely. I will call you as soon as I pull into your delivery zone. 🛵👍",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  // Milestones helper
  const orderConfirmed = progress >= 15;
  const preparingFood = progress >= 40;
  const outForDelivery = progress >= 75;
  const delivered = progress >= 100;

  // Map coordinates computations
  const riderX = 50 + (progress / 100) * 440; // moves from 50 to 490
  const riderY = 160 - Math.sin((progress / 100) * Math.PI) * 45; // curve height

  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 max-w-[1280px] mx-auto min-h-screen">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-2 bg-stone-900 text-amber-400 text-xs font-bold font-display px-3.5 py-1.5 rounded-full border border-stone-850">
          <Navigation size={12} className="text-[#FF5A1F] animate-bounce-subtle" />
          <span>BiteRush Precision Live Dispatch Console</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-stone-900">
          Track Your Active <br />
          <span className="text-[#FF5A1F]">Gourmet Journey</span>
        </h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          Monitor your premium hot box transportation via our state-of-the-art telemetry maps and chat directly with your verified driver.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COMPONENT: Interactive MAP and manual control triggers */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="bg-[#111] rounded-3xl p-5 shadow-2xl border-4 border-stone-950/80 flex flex-col justify-between h-full min-h-[440px]">
            
            {/* Topbar decoration of dispatcher */}
            <div className="flex justify-between items-center bg-stone-900/90 px-4 py-3 rounded-2xl border border-white/5 mb-4">
              <div className="flex items-center space-x-2.5">
                <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${isActive ? 'bg-emerald-500 animate-ping' : 'bg-red-500 animate-pulse'}`} />
                <span className="text-[10.5px] font-mono tracking-wider font-extrabold text-stone-300 uppercase">
                  BiteRush-HQ-ROUTING-SHIELD v4.02 (LIVE)
                </span>
              </div>
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
            </div>

            {/* Custom SVG telemetry map component */}
            <div className="relative flex-1 bg-stone-900 rounded-2xl overflow-hidden border border-white/5 shadow-inner p-4 min-h-[280px]">
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              
              {/* Route lines */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Gray backing street */}
                <path 
                  d="M 50 160 Q 180 80, 290 170 T 500 160" 
                  fill="none" 
                  stroke="#2E2E2E" 
                  strokeWidth="10" 
                  strokeLinecap="round" 
                />
                {/* Golden active vector */}
                <path 
                  d="M 50 160 Q 180 80, 290 170 T 500 160" 
                  fill="none" 
                  stroke="#FF5A1F" 
                  strokeWidth="5" 
                  strokeDasharray="500"
                  strokeDashoffset={500 - (progress * 5)}
                  strokeLinecap="round" 
                  className="transition-all duration-300"
                />
                
                {/* Station check nodes */}
                <circle cx="50" cy="160" r="10" fill="#FFB703" stroke="#111" strokeWidth="2.5" />
                <circle cx="500" cy="160" r="12" fill="#FF5A1F" stroke="#111" strokeWidth="2.5" className="animate-ping opacity-45" />
                <circle cx="500" cy="160" r="10" fill="#FF5A1F" stroke="#111" strokeWidth="2.5" />
              </svg>

              {/* Text descriptions */}
              <div className="absolute left-4 bottom-14 bg-stone-950/95 border border-white/5 p-2 rounded-xl text-[9px] font-bold text-white shadow-lg space-y-1">
                <span className="text-yellow-400 block font-mono">ORIGIN KITCHEN</span>
                <span className="text-stone-300">SpiceCraft Artisan Bistro</span>
              </div>

              <div className="absolute right-4 bottom-14 bg-stone-950/95 border border-white/5 p-2 rounded-xl text-[9px] font-bold text-white shadow-lg space-y-1 text-right">
                <span className="text-[#FF5A1F] block font-mono">YOUR THRESHOLD</span>
                <span className="text-stone-300">Premium Doorstep Dropoff</span>
              </div>

              {/* Dynamic Vehicle Positioning */}
              <div 
                className="absolute transform -translate-x-1/2 -translate-y-8 bg-[#FF5A1F] border border-white px-2.5 py-1 rounded-full shadow-2xl flex items-center justify-center space-x-1 text-xs transition-all duration-500"
                style={{ left: `${riderX}px`, top: `${riderY}px` }}
              >
                <span className="text-xs">🛵</span>
              </div>

              {/* Bottom live stats popup */}
              <div className="absolute bottom-3 left-4 bg-stone-950/90 border border-white/15 px-3 py-1.5 rounded-lg text-[10px] font-sans font-bold flex items-center space-x-2 text-stone-300">
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-[#FF5A1F]'}`} />
                <span>Rider Speed: {isActive ? '34 km/h' : '0 km/h'} • Distance remaining: {Math.max(0, (5 - (progress / 20))).toFixed(1)} km</span>
              </div>

            </div>

            {/* Simulated ride controllers */}
            <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-stone-400 text-xs space-y-0.5">
                <p>Telemetry System State: <strong className={isActive ? 'text-emerald-400' : 'text-[#FF5A1F]'}>{isActive ? 'Transmitting active coordinates...' : 'Paused'}</strong></p>
                <p className="text-[10px] text-stone-500 font-mono">Packet Signal strength: 100% (Hyper-Local RF network)</p>
              </div>

              <div className="flex space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleStartSimulation}
                  className="flex-1 sm:flex-initial bg-[#FF5A1F] hover:bg-[#E04E17] text-white font-display font-extrabold py-3 px-5 rounded-xl cursor-pointer text-xs flex items-center justify-center space-x-2 transition active:scale-95 shadow"
                >
                  <Play size={12} className={isActive ? 'animate-spin' : ''} />
                  <span>{progress === 100 ? 'Restart Ride' : 'Run Simulated Courier'}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-display font-medium py-3 px-4 rounded-xl text-xs transition active:scale-95"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COMPONENT: Milestones list & Courier Private Chat board */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Progress list milestones wrapper */}
          <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-xl space-y-5">
            <h3 className="font-display font-black text-stone-950 text-base border-b border-stone-100 pb-3 flex items-center justify-between">
              <span>Delivery Milestone Track</span>
              <span className="text-[10px] text-stone-400 font-mono">SLOT: BR-TRACK-Y92</span>
            </h3>

            <div className="space-y-4">
              
              {/* Step 1 */}
              <div className="flex items-start space-x-3.5 relative">
                <div className="w-0.5 h-10 bg-stone-100 absolute left-4 top-7" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow transition-all ${
                  orderConfirmed ? 'bg-emerald-500 text-white font-bold' : 'bg-stone-105 text-stone-400'
                }`}>
                  {orderConfirmed ? <Check size={13} className="stroke-[3]" /> : '1'}
                </div>
                <div>
                  <h4 className={`font-display font-bold text-xs ${orderConfirmed ? 'text-stone-900' : 'text-stone-400'}`}>
                    Order Received & Checked ✔
                  </h4>
                  <p className="text-stone-500 text-[10px] mt-0.5">Verified at kitchen routing terminal.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-3.5 relative">
                <div className="w-0.5 h-10 bg-stone-100 absolute left-4 top-7" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow transition-all ${
                  preparingFood ? 'bg-emerald-500 text-white font-bold' : 'bg-stone-100 text-stone-400'
                }`}>
                  {preparingFood ? <Check size={13} className="stroke-[3]" /> : '2'}
                </div>
                <div>
                  <h4 className={`font-display font-bold text-xs ${preparingFood ? 'text-stone-900' : 'text-stone-400'}`}>
                    Artisanal Prep Complete ✔
                  </h4>
                  <p className="text-stone-500 text-[10px] mt-0.5">Dishes sealed in thermal packaging.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-3.5 relative">
                <div className="w-0.5 h-10 bg-stone-100 absolute left-4 top-7" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow transition-all ${
                  outForDelivery ? 'bg-emerald-500 text-white font-bold' : 'bg-stone-100 text-stone-400'
                }`}>
                  {outForDelivery ? <Check size={13} className="stroke-[3]" /> : '3'}
                </div>
                <div>
                  <h4 className={`font-display font-bold text-xs ${outForDelivery ? 'text-stone-900' : 'text-stone-400'}`}>
                    Rider in Route Carriage ✔
                  </h4>
                  <p className="text-stone-500 text-[10px] mt-0.5">David is on his courier scooter.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-3.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow transition-all ${
                  delivered ? 'bg-emerald-500 text-white font-bold animate-bounce-subtle' : 'bg-stone-100 text-stone-400'
                }`}>
                  {delivered ? <Check size={13} className="stroke-[3]" /> : '4'}
                </div>
                <div>
                  <h4 className={`font-display font-bold text-xs ${delivered ? 'text-[#FF5A1F] font-black' : 'text-stone-400'}`}>
                    Handover Delivered 🎉
                  </h4>
                  <p className="text-stone-500 text-[10px] mt-0.5">Seals verified. Dig in and bon appétit!</p>
                </div>
              </div>

            </div>
          </div>

          {/* DRIVER CONTACT CHAT console */}
          <div className="bg-[#111] rounded-3xl p-5 border border-stone-900 shadow-2xl space-y-4 text-white">
            <div className="flex items-center space-x-3.5 pb-3.5 border-b border-white/5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" 
                  className="w-full h-full object-cover" 
                  alt="Courier profile"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-black text-sm text-white flex items-center space-x-1.5">
                  <span>David Williamson</span>
                  <span className="bg-amber-400 text-black text-[8px] font-black px-1.5 py-0.5 rounded">RIDER</span>
                </h4>
                <div className="flex items-center space-x-1 mt-0.5 text-stone-400 text-[10px]">
                  <span>⭐ 4.9</span>
                  <span>•</span>
                  <span>Active on Vespa 50cc</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-stone-500 text-[8.5px] uppercase font-bold">Estimated Arrival</p>
                <p className="font-display font-extrabold text-[#FFB703] text-lg leading-none mt-1">{eta} Mins</p>
              </div>
            </div>

            {/* Scrollable messages container */}
            <div className="bg-stone-950/80 rounded-2xl p-4.5 h-[160px] overflow-y-auto no-scrollbar space-y-3.5 text-xs">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'items-start'}`}
                >
                  <span className="text-[8.5px] font-mono text-stone-500 mb-0.5 font-bold uppercase">{msg.sender === 'user' ? 'You' : 'David'} • {msg.time}</span>
                  <div className={`p-3 rounded-2xl leading-relaxed text-xs shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[#FF5A1F] text-white rounded-tr-none' 
                      : 'bg-stone-900 border border-white/5 text-stone-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Message input */}
            <form onSubmit={handleSendChat} className="flex space-x-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type response back to driver..." 
                className="flex-1 bg-stone-950 border border-stone-850 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FF5A1F] placeholder-stone-600 font-sans"
              />
              <button 
                type="submit"
                className="bg-[#FF5A1F] hover:bg-[#E04E17] transition-all p-3 rounded-xl text-white flex items-center justify-center shrink-0 active:scale-95 shadow"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
