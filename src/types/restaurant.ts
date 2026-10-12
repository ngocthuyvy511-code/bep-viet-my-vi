export type Language = 'vi' | 'en';

export type Region = 'bac' | 'trung' | 'nam' | 'toanquoc';

export type DishCategory = 
  | 'pho_bun' 
  | 'com_xoi' 
  | 'mon_cuon_banh' 
  | 'mon_chinh_kho_xao' 
  | 'mon_chay' 
  | 'trang_mieng_che' 
  | 'do_uong';

export interface DishCustomization {
  id: string;
  nameVi: string;
  nameEn: string;
  options: {
    labelVi: string;
    labelEn: string;
    priceDelta: number;
  }[];
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number; // 1-5
  date: string;
  commentVi: string;
  commentEn: string;
  dishId: string;
  verifiedOrder?: boolean;
}

export interface Dish {
  id: string;
  nameVi: string;
  nameEn: string;
  category: DishCategory;
  price: number;
  originalPrice?: number;
  image: string;
  descriptionVi: string;
  descriptionEn: string;
  region: Region;
  spicyLevel: 0 | 1 | 2 | 3; // 0: None, 1: Mild, 2: Medium, 3: Hot
  isVegetarian?: boolean;
  isBestSeller?: boolean;
  isChefSpecial?: boolean;
  calories: number;
  prepTimeMinutes: number;
  ingredientsVi: string[];
  ingredientsEn: string[];
  tasteProfile: {
    sweet: number; // 1-5
    sour: number;  // 1-5
    salty: number; // 1-5
    spicy: number; // 1-5
    richness: number; // 1-5 (đậm đà/béo)
  };
  rating: number;
  reviewsCount: number;
  customizations?: DishCustomization[];
  reviews: Review[];
}

export interface CartItem {
  cartItemId: string;
  dish: Dish;
  quantity: number;
  selectedOptions: Record<string, string>; // { customizationId: optionLabelVi }
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'received' | 'cooking' | 'ready' | 'served' | 'completed';

export interface Order {
  id: string;
  tableNumber: string;
  orderType: 'dine_in' | 'takeaway';
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  pointsUsed: number;
  pointsDiscount: number;
  tip: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethodId;
  paymentStatus: 'pending' | 'paid';
  transactionId?: string;
}

export type DiningZone = 'main_hall' | 'bamboo_garden' | 'hoi_an_balcony' | 'vip_imperial';

export interface Reservation {
  id: string;
  code: string;
  guestName: string;
  phone: string;
  email?: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  zone: DiningZone;
  specialRequests?: string;
  tableNumber?: string;
  createdAt: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
}

export type MemberTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface Voucher {
  id: string;
  code: string;
  titleVi: string;
  titleEn: string;
  discountType: 'fixed' | 'percent';
  discountValue: number; // e.g. 50000 or 15 (percent)
  minSpend: number;
  pointsRequired: number;
  expiresAt: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  phone: string;
  tier: MemberTier;
  points: number;
  totalSpent: number;
  ordersCount: number;
  joinedDate: string;
  vouchers: Voucher[];
}

export type PaymentMethodId = 'momo' | 'zalopay' | 'vnpay' | 'viettelpay' | 'card' | 'cash';

export interface ServiceRequest {
  id: string;
  tableNumber: string;
  type: 'condiments' | 'ice_towels' | 'tea' | 'clear_dishes' | 'bill' | 'other';
  titleVi: string;
  titleEn: string;
  status: 'sent' | 'attending' | 'completed';
  createdAt: string;
  staffName?: string;
}

export interface TasteSurvey {
  regionPreference: Region | 'all';
  spicyPreference: 'none' | 'mild' | 'spicy';
  mealType: 'quick' | 'comfort' | 'family' | 'vegetarian' | 'refreshing';
  flavorTone: 'light' | 'balanced' | 'rich';
  weatherFeeling: 'hot_cool_refresh' | 'rainy_warm_soup' | 'any';
}
