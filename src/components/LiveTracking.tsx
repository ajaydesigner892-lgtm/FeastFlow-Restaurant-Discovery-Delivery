import React, { useState, useEffect } from 'react';
import { Map, Check, Star, MessageSquare, Phone, RefreshCw, Send } from 'lucide-react';

export default function LiveTracking() {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(15);
  const [eta, setEta] = useState(18);
  const [chatMessages, setChatMessages] = useState<string[]>([
    "Hi there! I just picked up your BiteRush parcel from Urban Grill.",
    "Bags of food are locked inside my insulated thermo compartment. Heading out on route!"
  ]);
  const [chatInput, setChatInput] = useState('');
  const [routeStep, setRouteStep] = useState(0);

  // Auto-drive simulation increments
  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setProgress((prev) => {
          let next = prev + 5;
          if (next >= 100) {
            next = 100;
            setIsActive(false);
          }
          return next;
        });

        setRouteStep((prev) => prev + 1);

        setEta((prev) => {
          const next = prev - 1;
          return next < 1 ? 1 : next;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleStartSimulation = () => {
    setProgress(15);
    setEta(18);
    setIsActive(true);
    setChatMessages([
      "Greeting from BiteRush! I am David Williamson, your delivery rider today.",
      "The kitchen completed baking. Sourdoughs are boxed. Starting my scooter engine now! 🛵"
    ]);
  };

  const handleReset = () => {
    setProgress(0);
    setEta(20);
    setIsActive(false);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, `You: ${userMsg}`]);
    setChatInput('');

    // Simulate Rider auto-answer
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        "David: Understood! I’m taking the expressway to keep your food hot and fresh. See you shortly!"
      ]);
    }, 1500);
  };

  // Determine active states for the milestones
  const orderConfirmed = progress >= 0;
  const preparingFood = progress >= 40;
  const outForDelivery = progress >= 70;
  const delivered = progress >= 100;

  // Calculat route positioning
  const riderPercentage = progress;
  // Let's create sweet coordinates for the delivery vehicle along a path
  const riderX = 50 + (riderPercentage * 3.5); // moves from 50 to 400
  const riderY = 160 - Math.sin((riderPercentage / 100) * Math.PI) * 45; // curve height

  return (
    <section id="live-tracking" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[20%] left-[-150px] w-96 h-96 bg-[#FF5A1F]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-150px] w-[500px] h-[500px] bg-[#FFB703]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10 w-full">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 select-none">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFB703] bg-white/10 px-4.5 py-1.5 rounded-full border border-white/10">
            Precision Logistics
          </span>
          <h2 className="font-display font-black text-3xl sm:text-[48px] leading-tight text-white mt-4">
            Live Order Tracking
          </h2>
          <p className="text-stone-400 font-sans text-sm sm:text-base mt-2">
            Seamlessly monitor your food delivery journey from our state-of-the-art live dispatch control module.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Laptop/Dashboard Mockup & SVG delivery map */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Dashboard Container mimicking a Silicon Valley dispatcher screen */}
            <div className="w-full bg-[#1A1A1A] rounded-[32px] p-4.5 shadow-2xl border-4 border-stone-800 relative">
              
              {/* Dashboard Header decoration */}
              <div className="flex justify-between items-center bg-[#252525]/80 px-4 py-2.5 rounded-2xl mb-4.5">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 bg-[#FF5A1F] rounded-full animate-ping shrink-0" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-300">
                    BiteRush Routing Engine v4.0
                  </span>
                </div>
                <div className="flex space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                </div>
              </div>

              {/* Map Canvas with animated route line */}
              <div className="relative w-full h-[280px] sm:h-[340px] bg-[#1a1c1d] rounded-2xl overflow-hidden border border-white/5 shadow-inner">
                
                {/* Simulated Street Grid background */}
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                
                {/* SVG Route lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Base grey street road */}
                  <path 
                    d="M 50 160 Q 150 70, 250 170 T 420 160" 
                    fill="none" 
                    stroke="#2D3135" 
                    strokeWidth="11" 
                    strokeLinecap="round" 
                  />
                  {/* Flashing golden active path */}
                  <path 
                    d="M 50 160 Q 150 70, 250 170 T 420 160" 
                    fill="none" 
                    stroke="#FF5A1F" 
                    strokeWidth="6" 
                    strokeDasharray="400"
                    strokeDashoffset={400 - (progress * 4)}
                    strokeLinecap="round" 
                    className="transition-all duration-500"
                  />
                  
                  {/* Restaurant base node */}
                  <circle cx="50" cy="160" r="14" fill="#FFB703" stroke="#FFF" strokeWidth="2.5" />
                  {/* Destination customer base node */}
                  <circle cx="420" cy="160" r="14" fill="#FF5A1F" stroke="#FFF" strokeWidth="2.5" className="animate-pulse" />
                </svg>

                {/* Floating tags */}
                <div className="absolute left-3 top-[180px] bg-[#1A1A1A]/95 border border-[#FFB703]/30 px-3 py-1 rounded-xl text-[10px] font-bold text-white shadow">
                  🍳 Epicurean Kitchen (Urban Grill)
                </div>

                <div className="absolute right-4 top-[180px] bg-[#1A1A1A]/95 border border-[#FF5A1F]/30 px-3 py-1 rounded-xl text-[10px] font-bold text-white shadow">
                  🏡 Your Residence (Delivery Gate)
                </div>

                {/* Simulated live rider icon vehicle */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-9 bg-[#FF5A1F] border-2 border-white px-2.5 py-1.5 rounded-full shadow-lg flex items-center justify-center space-x-1 text-xs transition-all duration-500 hover:scale-110"
                  style={{ 
                    left: `${50 + (progress / 100) * 370}px`, 
                    top: `${160 - Math.sin((progress / 100) * Math.PI) * 55}px` 
                  }}
                >
                  <span className="text-sm">🛵</span>
                </div>

                {/* Live Distance tracker snippet popup */}
                <div className="absolute bottom-4 left-4 bg-[#1A1A1A]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-[11px] font-sans font-bold flex items-center space-x-2 border border-white/10 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>GPS Tracking active: {100 - progress}% remaining</span>
                </div>

              </div>

              {/* Simulation triggers controls */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-xs">
                <div>
                  <p className="text-stone-400 font-sans">
                    Status: <strong className={isActive ? 'text-emerald-500' : 'text-stone-500'}>{isActive ? 'Scooter Rolling...' : 'Idle'}</strong>
                  </p>
                </div>
                <div className="flex space-x-3.5 w-full sm:w-auto">
                  <button
                    id="track-run-btn"
                    onClick={handleStartSimulation}
                    className="flex-1 sm:flex-initial bg-[#FF5A1F] hover:bg-[#E04E17] text-white font-display font-extrabold py-3.5 px-6 rounded-2xl w-full text-[11.5px] cursor-pointer flex items-center justify-center space-x-2.5 transition active:scale-95 shadow-md"
                  >
                    <RefreshCw size={13} className={isActive ? 'animate-spin' : ''} />
                    <span>Run Simulated Ride</span>
                  </button>
                  <button
                    id="track-reset-btn"
                    onClick={handleReset}
                    className="shrink-0 bg-stone-800 hover:bg-stone-700 text-stone-300 font-display font-medium py-3 px-4.5 rounded-2xl text-[11px] transition active:scale-95"
                  >
                    Reset Map
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Milestones lists tracker & Driver Card */}
          <div className="lg:col-span-5 space-y-6 select-none">
            
            {/* Live Tracking Card (Milestones Timeline) */}
            <div className="bg-[#1A1A1A] rounded-[32px] p-6 border border-white/5 shadow-2xl space-y-5">
              <h3 className="font-display font-extrabold text-lg text-[#FFB703] border-b border-white/5 pb-3 flex items-center justify-between">
                <span>Progress Milestone</span>
                <span className="text-xs text-stone-450 font-mono">ID: BR-8829-19A</span>
              </h3>

              {/* Vertical timeline steps */}
              <div className="space-y-4">
                
                {/* Step 1 */}
                <div className="flex items-start space-x-3.5 relative">
                  <div className="w-0.5 h-10 bg-stone-700 absolute left-4 top-7 -z-10" />
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    orderConfirmed ? 'bg-emerald-500 text-white font-bold' : 'bg-stone-800 text-stone-500'
                  }`}>
                    {orderConfirmed ? <Check size={14} className="stroke-[3.5]" /> : '1'}
                  </div>
                  <div>
                    <h4 className={`font-display font-bold text-sm ${orderConfirmed ? 'text-white' : 'text-stone-500'}`}>
                      Order Confirmed ✔
                    </h4>
                    <p className="text-stone-400 text-[11px] font-sans mt-0.5">Your ticket is processed and verified in-app.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-3.5 relative">
                  <div className="w-0.5 h-10 bg-stone-700 absolute left-4 top-7 -z-10" />
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    preparingFood ? 'bg-emerald-500 text-white font-bold' : 'bg-stone-800 text-stone-500'
                  }`}>
                    {preparingFood ? <Check size={14} className="stroke-[3.5]" /> : '2'}
                  </div>
                  <div>
                    <h4 className={`font-display font-bold text-sm ${preparingFood ? 'text-white' : 'text-stone-500'}`}>
                      Preparing Food ✔
                    </h4>
                    <p className="text-stone-400 text-[11px] font-sans mt-0.5">Top-chef Roberto is baking your gourmet delicacies.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-3.5 relative">
                  <div className="w-0.5 h-10 bg-stone-700 absolute left-4 top-7 -z-10" />
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    outForDelivery ? 'bg-emerald-500 text-white font-bold' : 'bg-stone-800 text-stone-500'
                  }`}>
                    {outForDelivery ? <Check size={14} className="stroke-[3.5]" /> : '3'}
                  </div>
                  <div>
                    <h4 className={`font-display font-bold text-sm ${outForDelivery ? 'text-white' : 'text-stone-500'}`}>
                      Out for Delivery ✔
                    </h4>
                    <p className="text-stone-400 text-[11px] font-sans mt-0.5">David Williamson is speeding down streets with your boxes.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-3.5">
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    delivered ? 'bg-emerald-500 text-white font-bold animate-bounce-subtle' : 'bg-stone-800 text-stone-500'
                  }`}>
                    {delivered ? <Check size={14} className="stroke-[3.5]" /> : '4'}
                  </div>
                  <div>
                    <h4 className={`font-display font-bold text-sm ${delivered ? 'text-white font-black' : 'text-stone-500'}`}>
                      Delivered {delivered ? '🎉' : '○'}
                    </h4>
                    <p className="text-stone-400 text-[11px] font-sans mt-0.5">Courier hands off warm insulated bags. Feast time!</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Premium Driver Card */}
            <div className="bg-[#1A1A1A] rounded-[32px] p-5.5 border border-white/5 shadow-2xl space-y-4">
              <div className="flex items-center space-x-4">
                {/* Driver Avatar */}
                <div className="w-13 h-13 rounded-2xl overflow-hidden border-2 border-[#FFB703] shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                    className="w-full h-full object-cover" 
                    alt="Courier David Williamson profile"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-black text-sm text-white">David Williamson</h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="text-[#FFB703] text-xs">★</span>
                    <span className="text-white text-xs font-bold">4.9 Rider Rating</span>
                    <span className="text-stone-500 text-[10px]">• Verified Courier</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-stone-500 text-[9px] uppercase tracking-wider font-bold">Est arrival</div>
                  <div className="font-display font-black text-xl text-[#FFB703] leading-none mt-1">
                    {eta} Min{eta > 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              {/* Chat log wrapper */}
              <div className="bg-stone-900 rounded-2xl p-3 h-[100px] overflow-y-auto no-scrollbar border border-white/2.5 space-y-2.5 text-[10.5px]">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="leading-relaxed border-b border-white/2 pb-1.5 last:border-b-0">
                    <span className="text-amber-400 font-extrabold pr-1.5">★ {msg.startsWith('You:') ? 'Visitor:' : 'David:'}</span>
                    <span className="text-stone-300">{msg.replace('You: ', '').replace('David: ', '')}</span>
                  </div>
                ))}
              </div>

              {/* Chat action form */}
              <form onSubmit={handleSendChat} className="flex space-x-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask driver to ring doorbell, leave at box, etc..." 
                  className="flex-1 bg-stone-900 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5A1F]"
                />
                <button 
                  type="submit"
                  className="bg-[#FF5A1F] hover:bg-[#E04E17] p-2.5 rounded-xl transition cursor-pointer text-white flex items-center justify-center shrink-0"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
