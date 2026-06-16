import { FoodItem, Category, Restaurant, Testimonial } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'burgers',
    name: 'Burgers',
    icon: '🍔',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=250',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: '🍕',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=250',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'sushi',
    name: 'Sushi',
    icon: '🍣',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=250',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'asian',
    name: 'Asian',
    icon: '🍜',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=250',
    color: 'from-red-500 to-amber-600'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=250',
    color: 'from-pink-400 to-purple-600'
  },
  {
    id: 'coffee',
    name: 'Coffee',
    icon: '☕',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=250',
    color: 'from-yellow-700 to-amber-900'
  },
  {
    id: 'healthy_bowls',
    name: 'Healthy',
    icon: '🥗',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=250',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'mexican',
    name: 'Mexican',
    icon: '🌮',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=250',
    color: 'from-yellow-500 to-green-600'
  }
];

export const FOOD_ITEMS: FoodItem[] = [
  // Burgers
  {
    id: 'b1',
    name: 'Beef Spicy Burger',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=400',
    price: 4.00,
    rating: 4.8,
    reviewsCount: 142,
    description: 'Ground beef patty, fresh sesame brioche bun, cheese, organic lettuce, heirloom tomato, sliced onions, pickled cucumbers, and our signature hot chili chili mayo.',
    ingredients: ['Prime Beef Patty', 'Brioche Bun', 'Cheddar Cheese', 'Lettuce', 'Chili Mayo', 'Pickles'],
    prepTime: '15-20 min',
    category: 'burgers',
    tags: ['Spicy', 'Best Seller']
  },
  {
    id: 'b2',
    name: 'BBQ Double Cheese',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
    price: 3.00,
    rating: 4.9,
    reviewsCount: 98,
    description: 'Double flame-grilled Angus beef patties, double processed cheddar, crispy hickory smoked bacon, caramelized red onions and sweet honey BBQ sauce.',
    ingredients: ['Double Beef Patty', 'Caramelized Onion', 'Cheddar Cheese', 'Sweet BBQ Sauce', 'Bacon'],
    prepTime: '20 min',
    category: 'burgers',
    tags: ['Double Patty', 'BBQ']
  },
  {
    id: 'b3',
    name: 'Smoky Crispy Chicken',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&q=80&w=400',
    price: 3.50,
    rating: 4.7,
    reviewsCount: 88,
    description: 'Crispy deep-fried premium buttermilk chicken breast, spicy ranch sauce, shredded crisp iceberg lettuce and dill pickles on toasted bun.',
    ingredients: ['Buttermilk Chicken', 'Ranch Sauce', 'Iceberg Lettuce', 'Toasted Bun', 'Dill Pickles'],
    prepTime: '15 min',
    category: 'burgers',
    tags: ['Crispy', 'Chicken']
  },
  {
    id: 'b4',
    name: 'Truffle Mushroom Burger',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&q=80&w=400',
    price: 4.50,
    rating: 4.9,
    reviewsCount: 125,
    description: 'Flame-kissed prime beef, rich white truffle butter, sautéed wild mushrooms, melted Swiss emmental, and light roasted garlic aioli spread.',
    ingredients: ['Premium Beef', 'Wild Mushrooms', 'White Truffle Butter', 'Garlic Aioli', 'Swiss Cheese'],
    prepTime: '18 min',
    category: 'burgers',
    tags: ['Luxury', 'Vegetarian Option Available']
  },

  // Pizza
  {
    id: 'p1',
    name: 'Signature Pepperoni Splash',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=400',
    price: 7.50,
    rating: 4.9,
    reviewsCount: 310,
    description: 'Sourdough wood-fired crust, rustic house san marzano tomato reduction, overloaded spicy pepperoni crisps, and fresh mozzarella di bufala chunks.',
    ingredients: ['Sourdough Crust', 'San Marzano Tomatoes', 'Pepperoni Cups', 'Buffalo Mozzarella', 'Fresh Basil'],
    prepTime: '20-25 min',
    category: 'pizza',
    tags: ['Classic', 'Wood Fired']
  },
  {
    id: 'p2',
    name: 'Truffle & Wild Fungus Pizza',
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=400',
    price: 9.00,
    rating: 4.8,
    reviewsCount: 144,
    description: 'Elegant white cream Base with rich white truffle essence, wild mixed woodsy mushrooms, mozzarella, pecorino cheese, and aromatic microgreens.',
    ingredients: ['Mixed Wild Mushrooms', 'White Truffle Crema', 'Pecorino Romano', 'Arugula', 'EVOO'],
    prepTime: '22 min',
    category: 'pizza',
    tags: ['Gourmet', 'Vegetarian']
  },

  // Sushi
  {
    id: 's1',
    name: 'Golden Dragon Roll',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=400',
    price: 8.50,
    rating: 4.9,
    reviewsCount: 220,
    description: 'Eel and cool cucumber inside, topped with layers of thinly sliced buttery avocado, brilliant red tobiko caviar, sweet unagi sauce glaze, and fine sesame.',
    ingredients: ['Glazed Eel', 'Tempura Batter', 'Cream Cheese', 'Sashimi Grade Salmon', 'Avocado Slice'],
    prepTime: '25 min',
    category: 'sushi',
    tags: ['Signature', 'Fresh Raw']
  },
  {
    id: 's2',
    name: 'Premium Salmon Nigiri Set',
    image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&q=80&w=400',
    price: 7.00,
    rating: 4.8,
    reviewsCount: 165,
    description: 'Hand-pressed blocks of perfectly seasoned vinegared sushi rice topped with premium cuts of fresh fatty Atlantic salmon sashimis, served with pickled ginger.',
    ingredients: ['Atlantic Salmon', 'Sushi Rice', 'Wasabi Paste', 'Pickled Ginger', 'Artisanal Soy Sauce'],
    prepTime: '15 min',
    category: 'sushi',
    tags: ['Classic', 'Raw Raw']
  },

  // Asian noodles
  {
    id: 'a1',
    name: 'Spicy Chili Dan Dan',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400',
    price: 5.50,
    rating: 4.8,
    reviewsCount: 180,
    description: 'Fiery chewy ramen noodles, slow stewed minced pork belly, intense chili oil, velvety peanut sauce, blanched organic bok choy, and chopped scallions.',
    ingredients: ['Wheat Ramen Noodles', 'Minced Pork Belly', 'Sichuan Chili Oil', 'Peanut Butter Paste', 'Bok Choy'],
    prepTime: '15-20 min',
    category: 'asian',
    tags: ['Sichuan Hot', 'Highly Requested']
  },

  // Desserts
  {
    id: 'd1',
    name: 'Golden Caramel Waffle',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=400',
    price: 3.50,
    rating: 4.7,
    reviewsCount: 94,
    description: 'Belgian-style gold standard waffle topped with sweet vanilla ice cream, golden caramel swirl dust, organic raspberry compotes, and dark chocolate shreds.',
    ingredients: ['Waffle Dough', 'Gelato Ice Cream', 'Caramel Syrup', 'Mint Garnish', 'Raspberry Jam'],
    prepTime: '10 min',
    category: 'desserts',
    tags: ['Sweet Spot', 'Warm']
  },
  {
    id: 'd2',
    name: 'Pistachio Matcha Cake',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=400',
    price: 4.50,
    rating: 4.9,
    reviewsCount: 112,
    description: 'Layers of light organic matcha sponge cake with crunchy rich pistachio cream bits, glazed lightly in white chocolate fondant and organic cream cheese.',
    ingredients: ['Kyoto Matcha Powder', 'Iranian Pistachios', 'Vanilla Cream', 'Swiss White Chocolate', 'Eggs'],
    prepTime: '12 min',
    category: 'desserts',
    tags: ['Gourmet', 'Chef Spec']
  },

  // Coffee
  {
    id: 'c1',
    name: 'Spiced Pumpkin Latte',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400',
    price: 3.00,
    rating: 4.8,
    reviewsCount: 204,
    description: 'Artisanal single-origin double espresso with creamy steamed whole organic milk, rich pumpkin puree, sweet cinnamon, shaved nutmeg and whipped cloud cream.',
    ingredients: ['Arabica Espresso', 'Steamed Bio Milk', 'Cinnamon Spice', 'Nutmeg Powder', 'Whipped Cream'],
    prepTime: '8 min',
    category: 'coffee',
    tags: ['Seasonal', 'Cozy']
  },

  // Healthy bowl
  {
    id: 'h1',
    name: 'Spiced Avocado Salmon Bowl',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    price: 6.90,
    rating: 4.9,
    reviewsCount: 195,
    description: 'Flame-seared wild salmon, warm organic red quinoa, ripe sliced avocado, steamed edamame, crunchy radishes, topped with black sesame and custom sweet ginger soy dressing.',
    ingredients: ['Wild Salmon Steak', 'Organic Red Quinoa', 'Premium Avocado', 'Edamame Beans', 'Ginger Dressing'],
    prepTime: '18 min',
    category: 'healthy_bowls',
    tags: ['Keto Friendly', 'Healthy Balance']
  },

  // Mexican
  {
    id: 'm1',
    name: 'Smokehouse Pulled Beef Tacos',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=400',
    price: 4.50,
    rating: 4.8,
    reviewsCount: 121,
    description: 'Three hand-made soft corn tortillas packed with hickory-smoked beef brisket, fresh zesty mango salsa, spicy jalapenos, cilantro, and whipped avocado-lime cream.',
    ingredients: ['Smoked Brisket', 'Soft Corn Tortillas', 'Mango Habanero Salsa', 'Fresh Cilantro', 'Sour Cream'],
    prepTime: '14 min',
    category: 'mexican',
    tags: ['Flavour Bomb', 'Salsa Style']
  }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'SpiceCraft Kitchen',
    logo: '🌶️',
    rating: 4.9,
    reviewsCount: '1.2K',
    deliveryTime: '15-25 min',
    cuisine: 'Burgers & Grillhouse',
    bannerImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
    minOrder: '5.00',
    deliveryFee: '1.50',
    distance: '1.2 km',
    description: 'The absolute pinnacle of spicy flame-grilled smash burgers, hickory smoked tenders, and gourmet crispy sides curated by head chef Roberto Diaz.',
    followersCount: '24.2K',
    featured: true,
    products: [
      FOOD_ITEMS[0], // Beef Spicy Burger
      FOOD_ITEMS[1], // BBQ Double Cheese
      FOOD_ITEMS[2], // Smoky Crispy Chicken
      FOOD_ITEMS[11] // Spiced Pumpkin latte
    ]
  },
  {
    style: 'border',
    id: 'r2',
    name: 'BkBite Hub',
    logo: '🍔',
    rating: 4.8,
    reviewsCount: '850',
    deliveryTime: '10-20 min',
    cuisine: 'Gourmet Fast Food',
    bannerImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800',
    minOrder: '3.00',
    deliveryFee: 'Free',
    distance: '0.8 km',
    description: 'BkBite is a local culinary hero, known for crafting ultra-fresh, never-frozen comfort foods, thick gourmet hand-spun shakes, and extra-long loaded fries.',
    followersCount: '18.5K',
    featured: true,
    products: [
      FOOD_ITEMS[0], // Beef Spicy Burger
      FOOD_ITEMS[2], // Smoky Crispy Chicken
      FOOD_ITEMS[3], // Truffle Mushroom
      FOOD_ITEMS[9]  // Caramel Waffle
    ]
  } as any,
  {
    id: 'r3',
    name: 'Bella Sourdough Pizza',
    logo: '🍕',
    rating: 4.9,
    reviewsCount: '1.5K',
    deliveryTime: '20-30 min',
    cuisine: 'Neapolitan Wood Fired',
    bannerImage: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=800',
    minOrder: '8.00',
    deliveryFee: '2.00',
    distance: '2.5 km',
    description: 'True artisans of the stone furnace. Every pizza is baked at 450°C and uses 72-hour cold-fermented dough, yielding a perfect puffy charred crust.',
    followersCount: '32.1K',
    featured: true,
    products: [
      FOOD_ITEMS[4], // Pepperoni Pizza
      FOOD_ITEMS[5], // Truffle Wild Fungus Pizza
      FOOD_ITEMS[9], // Waffle
      FOOD_ITEMS[10] // Matcha Cake
    ]
  },
  {
    id: 'r4',
    name: 'Sakura Zen Sushi',
    logo: '🍣',
    rating: 4.9,
    reviewsCount: '980',
    deliveryTime: '25-35 min',
    cuisine: 'Fine Japanese & Sashimi',
    bannerImage: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=800',
    minOrder: '10.00',
    deliveryFee: '2.50',
    distance: '3.1 km',
    description: 'Traditional and fusion Japanese masterworks. We source our salmon and tuna three times a week straight from Tsukiji markets to bring raw perfection to you.',
    followersCount: '45K',
    featured: false,
    products: [
      FOOD_ITEMS[6], // Dragon Roll
      FOOD_ITEMS[7], // Nigiri Set
      FOOD_ITEMS[8], // Dan Dan Noodles
      FOOD_ITEMS[10] // Cake
    ]
  },
  {
    id: 'r5',
    name: 'The Green Garden Bowl',
    logo: '🥗',
    rating: 4.8,
    reviewsCount: '710',
    deliveryTime: '15-20 min',
    cuisine: 'Organic & Keto Foods',
    bannerImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    minOrder: '5.00',
    deliveryFee: '1.00',
    distance: '1.4 km',
    description: 'Super-charge your lifestyle with organic bowls packed with fresh superfoods, premium wild fish, and sugar-free house-infused matcha cold refreshments.',
    followersCount: '15.9K',
    featured: false,
    products: [
      FOOD_ITEMS[12], // Avoc Salmon Bowl
      FOOD_ITEMS[11], // latte
      FOOD_ITEMS[1],  // BBQ beef
      FOOD_ITEMS[13]  // Beef taco
    ]
  },
  {
    id: 'r6',
    name: 'El Fuego Cantina',
    logo: '🌮',
    rating: 4.7,
    reviewsCount: '630',
    deliveryTime: '18-28 min',
    cuisine: 'Authentic Street Mexican',
    bannerImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
    minOrder: '6.00',
    deliveryFee: '1.50',
    distance: '1.9 km',
    description: 'Rich, bold, and fiery! Generously packed hand-pressed soft tacos, huge cheesy quesadillas, loaded nacho platters, and spicy secret side salsas.',
    followersCount: '12.4K',
    featured: false,
    products: [
      FOOD_ITEMS[13], // Taco
      FOOD_ITEMS[1],  // BBQ beef
      FOOD_ITEMS[4],  // pepperoni pizza
      FOOD_ITEMS[9]   // sweet waffle
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sophia Sterling',
    role: 'Food Blogger & Connoisseur',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    feedback: "BiteRush completely raises the bar! The spicy beef burger from Burger Kraft was still smoking hot and the brioche was deliciously pillowy. Absolute Dribbble-tier design and performance!",
    date: 'Yesterday'
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    role: 'Senior Product Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    feedback: "As a designer, I'm highly critical of app structures. The BiteRush app is a masterpiece of smooth navigation and gorgeous visual hierarchy. Live tracking the driver is seamless!",
    date: '3 days ago'
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Health & Lifestyle Coach',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    feedback: "It's rare to get organic superfood bowls delivered fast without leakage or cold salads becoming soggy. The insulated BiteRush bags keep my hot items steaming and salads fresh!",
    date: '1 week ago'
  }
];
