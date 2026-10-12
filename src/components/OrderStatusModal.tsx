import React from 'react';
import { 
  X, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  UtensilsCrossed, 
  Flame, 
  Check, 
  CreditCard,
  ChefHat
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { OrderStatus } from '../types/restaurant';

export const OrderStatusModal: React.FC = () => {
  const { 
    isOrdersOpen, 
    setIsOrdersOpen, 
    orders, 
    setIsPaymentOpen, 
    t, 
    language 
  } = useRestaurant();

  if (!isOrdersOpen) return null;

  const statusSteps: { key: OrderStatus; label: string; icon: string }[] = [
    { key: 'received', label: 'Bếp nhận đơn', icon: '📝' },
    { key: 'cooking', label: 'Đang nấu', icon: '🔥' },
    { key: 'ready', label: 'Chuẩn bị ra món', icon: '🍽️' },
    { key: 'served', label: 'Đã lên bàn', icon: '✨' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'received': return 0;
      case 'cooking': return 1;
      case 'ready': return 2;
      case 'served':
      case 'completed': return 3;
      default: return 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-[#D97706]/40 overflow-hidden my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8C1D18] via-[#A8251F] to-[#6B1410] text-[#FFFDF9] p-5 relative border-b border-[#F59E0B]/30 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#7F1D1D] flex items-center justify-center font-bold shadow">
              <ChefHat className="w-5 h-5 text-[#8C1D18]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-black text-white">
                {t.orderTracking.title}
              </h2>
              <p className="text-xs text-[#FDE68A]/90 font-light">
                Theo dõi tiến độ nấu món trực tiếp từ gian bếp Món Việt
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrdersOpen(false)}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Orders list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-16 text-stone-400 text-xs space-y-2">
              <Receipt className="w-10 h-10 mx-auto text-stone-300" />
              <p>Bạn chưa gửi đơn gọi món nào.</p>
            </div>
          ) : (
            orders.map(order => {
              const currentStepIdx = getStepIndex(order.status);
              return (
                <div key={order.id} className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-md space-y-4">
                  {/* Order Top Summary */}
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-serif font-black text-base text-[#8C1D18]">
                          Đơn #{order.id}
                        </span>
                        <span className="text-xs bg-[#FEF3C7] text-[#78350F] px-2 py-0.5 rounded-full font-bold">
                          {order.tableNumber}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400">
                        Thời gian gọi: {order.createdAt}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-stone-900 block">
                        {order.totalAmount.toLocaleString('vi-VN')}đ
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                        order.paymentStatus === 'paid' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.paymentStatus === 'paid' ? '✓ Đã thanh toán' : 'Chưa thanh toán'}
                      </span>
                    </div>
                  </div>

                  {/* Kitchen Status Timeline Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      {statusSteps.map((st, idx) => (
                        <div key={st.key} className="flex flex-col items-center flex-1 text-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm mb-1 ${
                            idx <= currentStepIdx
                              ? 'bg-[#8C1D18] text-[#FDE68A] ring-2 ring-[#F59E0B]'
                              : 'bg-stone-100 text-stone-400'
                          }`}>
                            {st.icon}
                          </div>
                          <span className={`text-[10px] font-medium leading-tight ${
                            idx <= currentStepIdx ? 'text-[#8C1D18] font-bold' : 'text-stone-400'
                          }`}>
                            {st.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Progress track */}
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#D97706] to-[#8C1D18] rounded-full transition-all duration-500"
                        style={{ width: `${((currentStepIdx + 1) / statusSteps.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Items breakdown in order */}
                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-xs space-y-1.5">
                    <span className="font-bold text-stone-700 block">
                      Các món trong đơn ({order.items.length}):
                    </span>
                    {order.items.map((it, i) => (
                      <div key={i} className="flex justify-between text-stone-700">
                        <span>
                          {it.quantity}x {language === 'vi' ? it.dish.nameVi : it.dish.nameEn}
                        </span>
                        <span className="font-semibold">
                          {it.totalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Payment button if pending */}
                  {order.paymentStatus === 'pending' && (
                    <button
                      onClick={() => {
                        setIsOrdersOpen(false);
                        setIsPaymentOpen(true);
                      }}
                      className="w-full bg-[#8C1D18] hover:bg-[#A8251F] text-[#FEF3C7] text-xs font-bold py-2.5 rounded-xl cursor-pointer shadow transition-all flex items-center justify-center space-x-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Thanh Toán Trực Tuyến Ngay (Ví MoMo / VNPay)</span>
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
