import React, { useState } from 'react';
import { Star, Clock, Heart, ChevronRight, ShoppingBag } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantsGridProps {
  onViewMenu: (restaurant: Restaurant) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  selectedCategoryId: string;
}

// 6 Restaurants explicitly requested by parent instructions
const PREMIUM_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Urban Grill',
    logo: '🔥',
    rating: 4.9,
    reviewsCount: '1.8K',
    deliveryTime: '15-20 min',
    cuisine: 'Burgers & Fries',
    bannerImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
    minOrder: '10.00',
    deliveryFee: 'Free',
    distance: '0.9 km',
    description: 'Serving prime premium wood flame grilled beef burger smash patties, crispy long french fries, and draft milkshakes in a gold tin box.',
    followersCount: '41.5K',
    featured: true,
    products: [
      {
        id: 'u1',
        name: 'Prime Truffle Smash Burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
        price: 13.50,
        rating: 4.9,
        reviewsCount: 142,
        description: 'Truffle-infused prime custom smash beef patty, caramelized red onions, melted Swiss cheese, fresh lettuce, and our secret chef sauce.',
        ingredients: ['Angus Beef', 'Truffle Butter', 'Brioche Bun', 'Swiss Cheese', 'Onion'],
        prepTime: '20 min',
        category: 'burgers'
      },
      {
        id: 'u2',
        name: 'Hickory Smokehouse Fries',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=400',
        price: 5.00,
        rating: 4.8,
        reviewsCount: 98,
        description: 'Crispy skin-on artisan french fries loaded with hickory smoked sea salt, rich melt-down cheddar, and scallions.',
        ingredients: ['Rosemary Idaho Potatoes', 'Cheddar Dust', 'Hickory Salt', 'Scallions'],
        prepTime: '10 min',
        category: 'burgers'
      },
      {
        id: 'u3',
        name: 'Artisan Vanilla Milkshake',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400',
        price: 6.50,
        rating: 4.7,
        reviewsCount: 88,
        description: 'Hand-churned milk gelato milkshake blended with real Madagascar vanilla beans, topped with mountain heavy whipping cold cream.',
        ingredients: ['Vanilla Gelato', 'Whole Organic Milk', 'Whipped Cream', 'Vanilla pods'],
        prepTime: '8 min',
        category: 'coffee'
      }
    ]
  },
  {
    id: 'rest-2',
    name: 'Napoli House',
    logo: '🍕',
    rating: 4.8,
    reviewsCount: '2.5K',
    deliveryTime: '20-25 min',
    cuisine: 'Italian Pizza',
    bannerImage: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=800',
    minOrder: '15.00',
    deliveryFee: '$2.00',
    distance: '1.4 km',
    description: 'Voted top Neapolitan tables. Every pizza is baked at 450°C and uses 72-hour cold-fermented sourdough, yielding a perfect puffy charred crust.',
    followersCount: '58.2K',
    featured: true,
    products: [
      {
        id: 'n1',
        name: 'Sourdough Pepperoni Supreme',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=400',
        price: 16.00,
        rating: 4.9,
        reviewsCount: 310,
        description: 'Double cured pepperoni sausage slices, rustic San Marzano tomato reduction, overloaded direct buffalo mozzarella di bufala chunks, and fresh basil.',
        ingredients: ['Sourdough', 'Tomato', 'Pepperoni', 'Mozzarella', 'Basil'],
        prepTime: '15 min',
        category: 'pizza'
      },
      {
        id: 'n2',
        name: 'Truffle & Wild Fungus Pizza',
        image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=400',
        price: 18.00,
        rating: 4.8,
        reviewsCount: 144,
        description: 'Rich white truffle crema, wild mixed woodsy mushrooms, mozzarella, pecorino cheese, and aromatic micro arugula greens.',
        ingredients: ['Truffle Crema', 'Wild Mushrooms', 'Pecorino Romano', 'Arugula'],
        prepTime: '18 min',
        category: 'pizza'
      }
    ]
  },
  {
    id: 'rest-3',
    name: 'Sushi Wave',
    logo: '🍣',
    rating: 4.9,
    reviewsCount: '920',
    deliveryTime: '25-30 min',
    cuisine: 'Japanese Sushi',
    bannerImage: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=800',
    minOrder: '18.00',
    deliveryFee: 'Free',
    distance: '2.5 km',
    description: 'Premium raw sashimi arrays, crafted dragon rolls, and traditional handmade nigiri curated using fish shipped from Tsujiki daily.',
    followersCount: '28.9K',
    featured: false,
    products: [
      {
        id: 'sushi-1',
        name: 'Golden Dragon Roll Set',
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=400',
        price: 19.50,
        rating: 4.9,
        reviewsCount: 220,
        description: 'Premium roasted unagi and cool cucumber inside, wrapped in buttery ripe avocado sheets, red caviar bursts, and unagi sweet glaze.',
        ingredients: ['Roasted Eel', 'Cucumber', 'Avocado Slice', 'Tobiko Caviar', 'Unagi Glaze'],
        prepTime: '20 min',
        category: 'sushi'
      },
      {
        id: 'sushi-2',
        name: 'Maguro & Salmon Nigiri Set',
        image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&q=80&w=400',
        price: 17.00,
        rating: 4.8,
        reviewsCount: 165,
        description: 'Hand-pressed blocks of vinegared sushi rice topped with premium cuts of fresh fatty salmon and select bluefin sashimi slices.',
        ingredients: ['Atlantic Salmon', 'Bluefin Tuna', 'Wasabi Paste', 'Sushi Rice'],
        prepTime: '15 min',
        category: 'sushi'
      }
    ]
  },
  {
    id: 'rest-4',
    name: 'Taco Fiesta',
    logo: '🌮',
    rating: 4.7,
    reviewsCount: '510',
    deliveryTime: '10-15 min',
    cuisine: 'Mexican Tacos',
    bannerImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
    minOrder: '8.00',
    deliveryFee: '$1.50',
    distance: '1.1 km',
    description: 'Explosive authentic Latin street menus. Handmade blue corn tortillas stuffed with juicy smoked brisket, fresh direct mango salsa, and lime-avocado creams.',
    followersCount: '19.4K',
    featured: false,
    products: [
      {
        id: 'm1',
        name: 'Mango Habanero Beef Tacos',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=400',
        price: 12.00,
        rating: 4.8,
        reviewsCount: 121,
        description: 'Three hand-made soft corn tortillas packed with hickory-smoked beef brisket, fresh zesty mango salsa, spicy jalapenos, and lime-sour cream.',
        ingredients: ['Smoked Brisket', 'Soft Corn Tortillas', 'Mango Salsa', 'Fresh Cilantro', 'Sour Cream'],
        prepTime: '12 min',
        category: 'mexican'
      }
    ]
  },
  {
    id: 'rest-5',
    name: 'Green Bowl',
    logo: '🥗',
    rating: 4.8,
    reviewsCount: '1.1K',
    deliveryTime: '15-20 min',
    cuisine: 'Healthy Food',
    bannerImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    minOrder: '12.00',
    deliveryFee: 'Free',
    distance: '1.8 km',
    description: 'A vibrant wellness selection. Fuel your high-performance schedule with clean organic bowls packed with premium wild fish, quinoa, and bio avocado salad wraps.',
    followersCount: '34.1K',
    featured: true,
    products: [
      {
        id: 'h1',
        name: 'Avo-Salmon Quinoa Superbowl',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
        price: 14.90,
        rating: 4.9,
        reviewsCount: 195,
        description: 'Flame-seared wild sockeye salmon, warm organic red quinoa, ripe sliced avocado, steamed organic edamame, and custom ginger soy dressing.',
        ingredients: ['Wild Salmon', 'Red Quinoa', 'Premium Avocado', 'Edamame Beans', 'Ginger Dressing'],
        prepTime: '15 min',
        category: 'healthy_bowls'
      }
    ]
  },
  {
    id: 'rest-6',
    name: 'Sweet Heaven',
    logo: '🍰',
    rating: 4.9,
    reviewsCount: '840',
    deliveryTime: '15-20 min',
    cuisine: 'Desserts & Sweets',
    bannerImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    minOrder: '6.00',
    deliveryFee: '$2.50',
    distance: '2.1 km',
    description: 'Satisfying gourmet sugar spots. Layered organic matcha mousse cakes, Belgian warm waffles, custom pistachio fudge, and artisanal dark coco.',
    followersCount: '48.9K',
    featured: true,
    products: [
      {
        id: 'd1',
        name: 'Warm Belgian Caramel Waffle',
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=400',
        price: 9.50,
        rating: 4.7,
        reviewsCount: 94,
        description: 'Warm gold-grade Belgian waffle topped with custom organic vanilla bean ice cream, golden caramel swirl dust, and dark chocolate shreds.',
        ingredients: ['Waffle Dough', 'Vanilla Ice Cream', 'Caramel Syrup', 'Belgium Chocolate'],
        prepTime: '12 min',
        category: 'desserts'
      },
      {
        id: 'd2',
        name: 'Kyoto Matcha Pistachio Cake',
        image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=400',
        price: 11.00,
        rating: 4.9,
        reviewsCount: 112,
        description: 'Layers of organic Kyoto matcha sponge cake with crunchy rich pistachio cream bits, glazed lightly in white chocolate fondant.',
        ingredients: ['Kyoto Matcha', 'Iranian Pistachios', 'Swiss White Chocolate', 'Organic Milk'],
        prepTime: '10 min',
        category: 'desserts'
      }
    ]
  }
];

export default function RestaurantsGrid({ 
  onViewMenu, 
  favorites, 
  onToggleFavorite,
  selectedCategoryId
}: RestaurantsGridProps) {
  
  // Filter based on selectedCategory state
  const filteredRestaurants = selectedCategoryId === 'all' 
    ? PREMIUM_RESTAURANTS
    : PREMIUM_RESTAURANTS.filter(rest => {
        // If selectedCategoryId is "healthy", find healthy_bowls
        const targetCategory = selectedCategoryId === 'healthy' ? 'healthy_bowls' : selectedCategoryId;
        return rest.products.some(p => p.category === targetCategory);
      });

  return (
    <section id="restaurants" className="py-20 bg-white relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 select-none">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF5A1F] bg-[#FF5A1F]/10 px-4.5 py-1.5 rounded-full">
              Hygienic legends
            </span>
            <h2 className="font-display font-black text-3xl sm:text-[48px] text-[#1A1A1A] mt-4 leading-tight">
              Featured Restaurants
            </h2>
            <p className="text-stone-500 font-sans text-sm sm:text-base mt-2">
              Discover verified local star tables offering quick delivery, handpicked ingredients, and high rating culinary standards.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-sm font-bold text-[#FF5A1F] flex items-center bg-[#FF5A1F]/5 px-4.5 py-2.5 rounded-full border border-[#FF5A1F]/10 shrink-0">
            <span>Verified Delivery Spots</span>
            <span className="ml-1.5 font-mono text-stone-900 bg-white px-2 py-0.5 rounded-full shadow-sm text-xs">
              {PREMIUM_RESTAURANTS.length} total
            </span>
          </div>
        </div>

        {/* 6 Restaurant Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.length === 0 ? (
            <div className="col-span-full py-16 text-center border border-dashed border-stone-200 rounded-[28px] bg-stone-50">
              <span className="text-4xl text-stone-300">🥫</span>
              <h3 className="font-display font-bold text-lg text-stone-700 mt-4">No matching food spots found</h3>
              <p className="text-stone-400 mt-1 text-sm">Try selecting a different culinary category filter from above!</p>
            </div>
          ) : (
            filteredRestaurants.map((rest) => {
              const isFav = favorites.includes(rest.id);
              
              return (
                <div 
                  key={rest.id} 
                  className="bg-white rounded-[24px] border border-stone-200/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 group flex flex-col justify-between"
                >
                  {/* Banner image & Heart button */}
                  <div className="h-52 relative overflow-hidden bg-stone-100 shrink-0">
                    <img 
                      src={rest.bannerImage} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt={rest.name}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                    
                    {/* Top rating badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-[10px] font-extrabold text-[#1A1A1A] uppercase shadow-md flex items-center space-x-1.5">
                      <Star className="text-[#FFB703] fill-[#FFB703]" size={11} />
                      <span>{rest.rating} ({rest.reviewsCount})</span>
                    </div>

                    {/* Delivery Time Badge */}
                    <div className="absolute bottom-4 right-4 bg-[#FF5A1F] text-white px-3.5 py-1.5 rounded-xl text-[10.5px] font-extrabold shadow-md flex items-center space-x-1">
                      <Clock size={11} />
                      <span>{rest.deliveryTime}</span>
                    </div>

                    {/* Favorite hover circle */}
                    <button 
                      id={`fav-btn-${rest.id}`}
                      onClick={() => onToggleFavorite(rest.id)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md text-stone-400 hover:text-red-500 hover:scale-115 transition"
                      title="Favorite restaurant"
                    >
                      <Heart size={16} fill={isFav ? '#EF4444' : 'none'} className={isFav ? 'text-red-500' : ''} />
                    </button>
                  </div>

                  {/* Body textual content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    
                    {/* Title & Cuisine */}
                    <div>
                      <div className="flex justify-between items-center">
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1A1A1A] group-hover:text-[#FF5A1F] transition-colors leading-tight">
                          {rest.name}
                        </h3>
                        <div className="w-9 h-9 rounded-full bg-[#FFF8F3] border border-orange-100 flex items-center justify-center shrink-0 text-lg shadow-inner">
                          {rest.logo}
                        </div>
                      </div>
                      
                      <p className="text-stone-400 text-xs font-semibold mt-1">
                        Cuisine: <span className="text-stone-600 font-bold">{rest.cuisine}</span>
                      </p>
                      
                      <p className="text-stone-500 text-xs leading-relaxed mt-2.5 truncate">
                        {rest.description}
                      </p>
                    </div>

                    {/* Details row */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-dashed border-stone-100 text-[11px] text-stone-500 font-semibold">
                      <div className="flex items-center space-x-1">
                        <span>📍</span>
                        <span className="text-[#FF5A1F]">{rest.distance}</span>
                      </div>
                      <div className="inline-block w-1 h-1 bg-stone-300 rounded-full" />
                      <div>
                        Delivery: <strong className="text-emerald-600">{rest.deliveryFee === 'Free' ? 'Free' : rest.deliveryFee}</strong>
                      </div>
                      <div className="inline-block w-1 h-1 bg-stone-300 rounded-full" />
                      <div>
                        Min: <strong>${rest.minOrder}</strong>
                      </div>
                    </div>

                    {/* Action CTA */}
                    <button 
                      id={`view-menu-${rest.id}`}
                      onClick={() => onViewMenu(rest)}
                      className="w-full bg-[#FFF8F3] group-hover:bg-[#FF5A1F] text-[#FF5A1F] group-hover:text-white font-display font-bold text-xs py-3.5 rounded-2xl transition-all duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-orange-500/10 flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <ShoppingBag size={13} />
                      <span>View Menu</span>
                      <ChevronRight size={13} className="stroke-[3]" />
                    </button>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
export { PREMIUM_RESTAURANTS };
