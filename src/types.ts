export interface FoodItem {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  ingredients: string[];
  prepTime: string;
  category: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name or emoji
  image: string;
  color: string;
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewsCount: string;
  deliveryTime: string;
  cuisine: string;
  bannerImage: string;
  minOrder: string;
  deliveryFee: string;
  distance: string;
  description: string;
  followersCount: string;
  products: FoodItem[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  feedback: string;
  date: string;
}

export interface OrderState {
  status: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
  progress: number; // 0 to 100
  etaMinutes: number;
  riderName: string;
  riderRating: number;
  riderPhone: string;
  riderAvatar: string;
  routeStep: number; // For tracking map coordinates movement
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  selectedAddons?: string[];
}
