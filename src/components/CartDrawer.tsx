import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  Sparkles, 
  Crown, 
  ArrowRight, 
  HeartHandshake, 
  Check, 
  UtensilsCrossed, 
  CreditCard
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal,
    totalCartItemsCount,
    tableNumber,
    diningType,
    setDiningType,
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
    member,
    placeOrder,
    setIsPaymentOpen,
    setIsOrdersOpen,
    t,
    language 
  } = useRestaurant();

  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');
    if (!voucherInput.trim()) return;

    const success = applyVoucherCode(voucherInput);
    if (success) {
      setVoucherInput('');
    } else {
      setVoucherError('Mã không hợp lệ hoặc đơn chưa đạt mức tối thiểu');
    }
  };

  const handleSendToKitchenPayLater = () => {
    placeOrder('cash', false);
    setIsCartOpen(false);
    setIsOrdersOpen(true);
  };

  const handleOpenPayment = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const tipOptions = [0, 10000, 20000, 50000];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-[#FFFDF9] h-full shadow-2xl border-l-2 border-[#D97706]/40 flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#8C1D18] text-[#FFFDF9] p-4 flex items-center justify-between border-b border-[#F59E0B]/30 shrink-0">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
            <h2 className="font-serif font-black text-lg text-white">
              {t.cartDrawer.title} ({totalCartItemsCount})
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-[#FDE68A] hover:text-white px-2 py-1 rounded cursor-pointer"
                title="Xóa tất cả món"
              >
                Xóa hết
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Scroll Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Dining mode indicator */}
          <div className="bg-[#FEF3C7]/60 p-3 rounded-2xl border border-[#D97706]/30 flex items-center justify-between text-xs">
            <div>
              <span className="text-stone-500 font-medium">{t.cartDrawer.orderType}:</span>
              <span className="font-bold text-[#8C1D18] ml-1.5">
                {diningType === 'dine_in' ? `Tại bàn (${tableNumber})` : 'Mang về (Takeaway)'}
              </span>
            </div>
            <button
              onClick={() => setDiningType(diningType === 'dine_in' ? 'takeaway' : 'dine_in')}
              className="text-[#8C1D18] font-bold underline cursor-pointer"
            >
              Đổi
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-stone-500 text-sm font-medium">
                {t.cartDrawer.emptyCart}
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#8C1D18] hover:bg-[#A8251F] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                {t.cartDrawer.emptyCartCta}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Cart Items List */}
              {cart.map(item => {
                const dishName = language === 'vi' ? item.dish.nameVi : item.dish.nameEn;
                const optionsList = Object.entries(item.selectedOptions).map(([_, val]) => val);

                return (
                  <div key={item.cartItemId} className="bg-white p-3 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                    <div className="flex gap-2.5">
                      <img 
                        src={item.dish.image} 
                        alt={dishName}
                        className="w-16 h-16 object-cover rounded-xl shrink-0 border border-stone-200" 
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-xs sm:text-sm text-[#2D1A12] line-clamp-1">
                            {dishName}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-stone-400 hover:text-red-600 p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Customization tags */}
                        {optionsList.length > 0 && (
                          <div className="flex flex-wrap gap-1 my-1">
                            {optionsList.map((opt, i) => (
                              <span key={i} className="text-[10px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded border border-amber-200">
                                {opt}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.specialInstructions && (
                          <p className="text-[10px] text-stone-500 italic">
                            "{item.specialInstructions}"
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-bold text-[#8C1D18]">
                            {item.totalPrice.toLocaleString('vi-VN')}đ
                          </span>

                          {/* Quantity control */}
                          <div className="flex items-center space-x-2 bg-stone-100 px-2 py-0.5 rounded-lg border border-stone-200 text-xs">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                              className="text-stone-600 hover:text-black font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-bold text-stone-900 w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, 1)}
                              className="text-stone-600 hover:text-black font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loyalty Points Redemption Switch */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-[#D97706]" />
                    <div>
                      <span className="text-xs font-bold text-amber-950 block">
                        Đổi Điểm Thưởng Mỹ Vị
                      </span>
                      <span className="text-[10px] text-amber-800">
                        Khả dụng: {member.points.toLocaleString()} điểm ({ (member.points * 100).toLocaleString() }đ)
                      </span>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={usePoints}
                    onChange={(e) => setUsePoints(e.target.checked)}
                    className="w-4 h-4 text-[#8C1D18] rounded cursor-pointer accent-[#8C1D18]"
                  />
                </div>
                {usePoints && (
                  <div className="text-[11px] font-bold text-emerald-700 bg-white/80 p-1.5 rounded-lg text-right">
                    ✓ Giảm trực tiếp -{pointsDiscount.toLocaleString('vi-VN')}đ vào đơn
                  </div>
                )}
              </div>

              {/* Voucher promo code input */}
              <div className="bg-white p-3 rounded-2xl border border-stone-200 space-y-2">
                <form onSubmit={handleApplyVoucher} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Mã voucher (VIET50, MYVI10)"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      className="w-full text-xs pl-8 pr-2 py-1.5 border border-stone-300 rounded-xl uppercase font-semibold focus:outline-none focus:border-[#8C1D18]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#8C1D18] hover:bg-[#A8251F] text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                  >
                    {t.cartDrawer.applyVoucher}
                  </button>
                </form>

                {voucherError && (
                  <p className="text-[10px] text-red-600 font-medium">{voucherError}</p>
                )}

                {appliedVoucher && (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-200">
                    <span className="font-bold">
                      ✓ Đã áp dụng: {appliedVoucher.code} (-{voucherDiscount.toLocaleString('vi-VN')}đ)
                    </span>
                    <button
                      onClick={removeVoucher}
                      className="text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Tip Selection */}
              <div className="bg-white p-3 rounded-2xl border border-stone-200 space-y-1.5">
                <span className="text-xs font-bold text-stone-700 flex items-center space-x-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
                  <span>{t.cartDrawer.tipAmount}</span>
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {tipOptions.map(tip => (
                    <button
                      key={tip}
                      type="button"
                      onClick={() => setTipAmount(tip)}
                      className={`text-xs py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                        tipAmount === tip
                          ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {tip === 0 ? '0đ' : `${tip / 1000}k`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer: Billing Breakdown & Action Buttons */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200 space-y-3 shrink-0 shadow-lg">
            {/* Price lines */}
            <div className="space-y-1 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>{t.cartDrawer.subtotal}:</span>
                <span className="font-semibold text-stone-900">{cartSubtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              {pointsDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>{t.cartDrawer.pointsDiscount}:</span>
                  <span>-{pointsDiscount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              {voucherDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>{t.cartDrawer.voucherDiscount}:</span>
                  <span>-{voucherDiscount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              {tipAmount > 0 && (
                <div className="flex justify-between text-stone-700">
                  <span>Tiền boa phục vụ:</span>
                  <span>+{tipAmount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="flex justify-between text-sm sm:text-base font-black text-[#8C1D18] pt-1.5 border-t border-stone-100">
                <span>{t.cartDrawer.totalPayment}:</span>
                <span>{orderTotal.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              {/* Online payment button */}
              <button
                onClick={handleOpenPayment}
                className="w-full bg-gradient-to-r from-[#8C1D18] via-[#A8251F] to-[#B91C1C] hover:from-[#A8251F] hover:to-[#C62828] text-white font-bold py-3 rounded-2xl text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4 text-[#FDE68A]" />
                <span>{t.cartDrawer.proceedPayment} (MoMo, ZaloPay, VNPay)</span>
              </button>

              {/* Send to kitchen pay later */}
              <button
                onClick={handleSendToKitchenPayLater}
                className="w-full bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] font-bold py-2.5 rounded-2xl text-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 border border-[#D97706]/30"
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>{t.cartDrawer.sendOrderToKitchen}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
