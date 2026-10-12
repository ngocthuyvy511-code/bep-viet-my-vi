import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Dish, 
  CartItem, 
  Language, 
  Order, 
  Reservation, 
  MemberProfile, 
  Voucher, 
  PaymentMethodId, 
  ServiceRequest, 
  TasteSurvey,
  Review
} from '../types/restaurant';
import { initialDishes } from '../data/dishes';
import { translations } from '../data/translations';

interface RestaurantContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.vi;
  
  // Table & Dining Mode
  tableNumber: string;
  setTableNumber: (table: string) => void;
  diningType: 'dine_in' | 'takeaway';
  setDiningType: (type: 'dine_in' | 'takeaway') => void;
  
  // Dishes
  dishes: Dish[];
  addDishReview: (dishId: string, review: Omit<Review, 'id' | 'date'>) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (dish: Dish, quantity?: number, selectedOptions?: Record<string, string>, instructions?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  totalCartItemsCount: number;
  
  // Pricing adjustments
  appliedVoucher: Voucher | null;
  applyVoucherCode: (code: string) => boolean;
  removeVoucher: () => void;
  usePoints: boolean;
  setUsePoints: (use: boolean) => void;
  pointsDiscount: number;
  voucherDiscount: number;
  tipAmount: number;
  setTipAmount: (amount: number) => void;
  orderTotal: number;
  
  // Orders & Payment
  orders: Order[];
  currentPendingOrder: Order | null;
  placeOrder: (paymentMethod: PaymentMethodId, payNow: boolean) => Order;
  markOrderAsPaid: (orderId: string, transactionId: string) => void;
  
  // Table Reservation
  reservations: Reservation[];
  createReservation: (reservationData: Omit<Reservation, 'id' | 'code' | 'createdAt' | 'status'>) => Reservation;
  
  // Membership & Loyalty
  member: MemberProfile;
  redeemVoucher: (voucherId: string) => boolean;
  
  // Call Staff
  serviceRequests: ServiceRequest[];
  callStaff: (type: ServiceRequest['type'], titleVi: string, titleEn: string) => void;
  
  // Modals & UI States
  selectedDish: Dish | null;
  setSelectedDish: (dish: Dish | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isPaymentOpen: boolean;
  setIsPaymentOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isTasteAdvisorOpen: boolean;
  setIsTasteAdvisorOpen: (open: boolean) => void;
  isCallStaffOpen: boolean;
  setIsCallStaffOpen: (open: boolean) => void;
  isLoyaltyOpen: boolean;
  setIsLoyaltyOpen: (open: boolean) => void;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (open: boolean) => void;
  
  // Search and Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
}

const initialVouchers: Voucher[] = [
  {
    id: 'vouch-50k',
    code: 'VIET50',
    titleVi: 'Giảm 50.000đ cho đơn từ 200.000đ',
    titleEn: '50,000 VND off for orders from 200,000 VND',
    discountType: 'fixed',
    discountValue: 50000,
    minSpend: 200000,
    pointsRequired: 300,
    expiresAt: '2026-12-31'
  },
  {
    id: 'vouch-10pct',
    code: 'MYVI10',
    titleVi: 'Giảm 10% tổng hóa đơn (Tối đa 100.000đ)',
    titleEn: '10% off total bill (Max 100,000 VND)',
    discountType: 'percent',
    discountValue: 10,
    minSpend: 150000,
    pointsRequired: 500,
    expiresAt: '2026-12-31'
  },
  {
    id: 'vouch-caphe',
    code: 'TANGTRUNG',
    titleVi: 'Tặng 01 Cà Phê Trứng Hà Nội (Trị giá 55.000đ)',
    titleEn: 'Complimentary Hanoi Egg Coffee (55,000 VND value)',
    discountType: 'fixed',
    discountValue: 55000,
    minSpend: 180000,
    pointsRequired: 250,
    expiresAt: '2026-11-30'
  }
];

const initialMember: MemberProfile = {
  id: 'mem-8899',
  name: 'Nguyễn Thành Nam',
  phone: '0908 123 456',
  tier: 'gold',
  points: 1250,
  totalSpent: 4250000,
  ordersCount: 8,
  joinedDate: '2026-03-15',
  vouchers: [initialVouchers[0]]
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');
  const [tableNumber, setTableNumber] = useState<string>('Bàn 08');
  const [diningType, setDiningType] = useState<'dine_in' | 'takeaway'>('dine_in');
  
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [usePoints, setUsePoints] = useState<boolean>(false);
  const [tipAmount, setTipAmount] = useState<number>(0);
  
  const [member, setMember] = useState<MemberProfile>(initialMember);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPendingOrder, setCurrentPendingOrder] = useState<Order | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'res-101',
      code: 'BV-8823',
      guestName: 'Nguyễn Thành Nam',
      phone: '0908 123 456',
      guestsCount: 4,
      date: '2026-10-12',
      timeSlot: '19:00',
      zone: 'hoi_an_balcony',
      specialRequests: 'Bàn cạnh lan can ngắm phố, chuẩn bị ghế ăn cho trẻ nhỏ',
      tableNumber: 'Bàn B02',
      createdAt: '2026-10-11 14:20',
      status: 'confirmed'
    }
  ]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  
  // Modal states
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [isTasteAdvisorOpen, setIsTasteAdvisorOpen] = useState<boolean>(false);
  const [isCallStaffOpen, setIsCallStaffOpen] = useState<boolean>(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState<boolean>(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState<boolean>(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const t = translations[language];

  // Add review to dish
  const addDishReview = (dishId: string, newRev: Omit<Review, 'id' | 'date'>) => {
    setDishes(prev => prev.map(d => {
      if (d.id !== dishId) return d;
      const reviewObj: Review = {
        ...newRev,
        id: `rev-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        verifiedOrder: true
      };
      const updatedReviews = [reviewObj, ...d.reviews];
      const newRating = Number((updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length).toFixed(1));
      return {
        ...d,
        rating: newRating,
        reviewsCount: d.reviewsCount + 1,
        reviews: updatedReviews
      };
    }));
  };

  // Cart operations
  const addToCart = (dish: Dish, quantity: number = 1, selectedOptions: Record<string, string> = {}, instructions?: string) => {
    // calculate unit price with customizations
    let extraCost = 0;
    if (dish.customizations) {
      dish.customizations.forEach(cust => {
        const chosen = selectedOptions[cust.id];
        if (chosen) {
          const opt = cust.options.find(o => o.labelVi === chosen || o.labelEn === chosen);
          if (opt) extraCost += opt.priceDelta;
        }
      });
    }

    const unitPrice = dish.price + extraCost;
    const cartItemId = `${dish.id}-${JSON.stringify(selectedOptions)}-${instructions || ''}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + quantity, totalPrice: (item.quantity + quantity) * unitPrice }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          dish,
          quantity,
          selectedOptions,
          specialInstructions: instructions,
          unitPrice,
          totalPrice: unitPrice * quantity
        }
      ];
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        return {
          ...item,
          quantity: newQty,
          totalPrice: newQty * item.unitPrice
        };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
    setUsePoints(false);
    setTipAmount(0);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Vouchers & Points calculation
  const applyVoucherCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const found = initialVouchers.find(v => v.code.toUpperCase() === clean);
    if (found) {
      if (cartSubtotal >= found.minSpend) {
        setAppliedVoucher(found);
        return true;
      }
    }
    return false;
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
  };

  // Points conversion: 1 point = 100 VND
  const availablePointsValue = member.points * 100;
  const maxPointsDiscount = Math.min(availablePointsValue, Math.floor(cartSubtotal * 0.5)); // max 50% of bill
  const pointsDiscount = usePoints ? maxPointsDiscount : 0;

  let voucherDiscount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'fixed') {
      voucherDiscount = appliedVoucher.discountValue;
    } else {
      voucherDiscount = Math.min(Math.round((cartSubtotal * appliedVoucher.discountValue) / 100), 100000);
    }
  }

  const orderTotal = Math.max(0, cartSubtotal - pointsDiscount - voucherDiscount + tipAmount);

  // Place order
  const placeOrder = (paymentMethod: PaymentMethodId, payNow: boolean): Order => {
    const orderId = `BV-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      tableNumber: diningType === 'dine_in' ? tableNumber : 'Mang về (Takeaway)',
      orderType: diningType,
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: voucherDiscount,
      pointsUsed: usePoints ? Math.round(pointsDiscount / 100) : 0,
      pointsDiscount,
      tip: tipAmount,
      totalAmount: orderTotal,
      status: 'received',
      paymentMethod,
      paymentStatus: payNow ? 'paid' : 'pending',
      transactionId: payNow ? `TXN-${Date.now().toString().slice(-6)}` : undefined
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentPendingOrder(newOrder);

    // If points used, deduct from member
    if (newOrder.pointsUsed > 0) {
      setMember(prev => ({
        ...prev,
        points: Math.max(0, prev.points - newOrder.pointsUsed)
      }));
    }

    // Award loyalty points for order: 1% - 10% depending on tier
    // e.g. 1 point per 10,000 VND
    const earnedPoints = Math.round(orderTotal / 10000);
    setMember(prev => ({
      ...prev,
      points: prev.points + earnedPoints,
      totalSpent: prev.totalSpent + orderTotal,
      ordersCount: prev.ordersCount + 1
    }));

    clearCart();
    return newOrder;
  };

  const markOrderAsPaid = (orderId: string, transactionId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          paymentStatus: 'paid',
          transactionId
        };
      }
      return o;
    }));
    if (currentPendingOrder?.id === orderId) {
      setCurrentPendingOrder(prev => prev ? { ...prev, paymentStatus: 'paid', transactionId } : null);
    }
  };

  // Kitchen simulation: advance order status automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev.map(o => {
        if (o.status === 'received') return { ...o, status: 'cooking' };
        if (o.status === 'cooking') return { ...o, status: 'ready' };
        if (o.status === 'ready') return { ...o, status: 'served' };
        return o;
      }));
    }, 28000); // progressive advance for realistic live demo

    return () => clearInterval(interval);
  }, []);

  // Reservation
  const createReservation = (data: Omit<Reservation, 'id' | 'code' | 'createdAt' | 'status'>): Reservation => {
    const code = `BV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRes: Reservation = {
      ...data,
      id: `res-${Date.now()}`,
      code,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'confirmed'
    };
    setReservations(prev => [newRes, ...prev]);
    return newRes;
  };

  // Redeem voucher
  const redeemVoucher = (voucherId: string): boolean => {
    const voucher = initialVouchers.find(v => v.id === voucherId);
    if (!voucher) return false;
    if (member.points >= voucher.pointsRequired) {
      setMember(prev => ({
        ...prev,
        points: prev.points - voucher.pointsRequired,
        vouchers: [...prev.vouchers, voucher]
      }));
      return true;
    }
    return false;
  };

  // Call staff
  const callStaff = (type: ServiceRequest['type'], titleVi: string, titleEn: string) => {
    const req: ServiceRequest = {
      id: `req-${Date.now()}`,
      tableNumber,
      type,
      titleVi,
      titleEn,
      status: 'sent',
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      staffName: 'Lan Anh (Phục vụ khu A)'
    };
    setServiceRequests(prev => [req, ...prev]);

    // Automatically simulate staff attending after 4 seconds
    setTimeout(() => {
      setServiceRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'attending' } : r));
    }, 3500);
  };

  return (
    <RestaurantContext.Provider value={{
      language,
      setLanguage,
      t,
      tableNumber,
      setTableNumber,
      diningType,
      setDiningType,
      dishes,
      addDishReview,
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartSubtotal,
      totalCartItemsCount,
      appliedVoucher,
      applyVoucherCode,
      removeVoucher,
      usePoints,
      setUsePoints,
      pointsDiscount,
      voucherDiscount,
      tipAmount,
      setTipAmount,
      orderTotal,
      orders,
      currentPendingOrder,
      placeOrder,
      markOrderAsPaid,
      reservations,
      createReservation,
      member,
      redeemVoucher,
      serviceRequests,
      callStaff,
      selectedDish,
      setSelectedDish,
      isCartOpen,
      setIsCartOpen,
      isPaymentOpen,
      setIsPaymentOpen,
      isReservationOpen,
      setIsReservationOpen,
      isTasteAdvisorOpen,
      setIsTasteAdvisorOpen,
      isCallStaffOpen,
      setIsCallStaffOpen,
      isLoyaltyOpen,
      setIsLoyaltyOpen,
      isOrdersOpen,
      setIsOrdersOpen,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedRegion,
      setSelectedRegion
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
