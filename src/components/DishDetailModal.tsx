import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  Flame, 
  Leaf, 
  Plus, 
  Minus, 
  Check, 
  MessageSquarePlus, 
  Sparkles,
  ShieldCheck,
  User
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { Dish } from '../types/restaurant';

export const DishDetailModal: React.FC = () => {
  const { 
    selectedDish, 
    setSelectedDish, 
    language, 
    addToCart, 
    addDishReview, 
    t 
  } = useRestaurant();

  if (!selectedDish) return null;

  // Selected customization state
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    selectedDish.customizations?.forEach(cust => {
      // Pick first option as default
      if (cust.options.length > 0) {
        initial[cust.id] = language === 'vi' ? cust.options[0].labelVi : cust.options[0].labelEn;
      }
    });
    return initial;
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [instructions, setInstructions] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Review submission state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmittedNotice, setReviewSubmittedNotice] = useState(false);

  // Calculate dynamic price
  let extraDelta = 0;
  if (selectedDish.customizations) {
    selectedDish.customizations.forEach(cust => {
      const chosen = selectedOptions[cust.id];
      if (chosen) {
        const opt = cust.options.find(o => o.labelVi === chosen || o.labelEn === chosen);
        if (opt) extraDelta += opt.priceDelta;
      }
    });
  }

  const finalUnitPrice = selectedDish.price + extraDelta;
  const totalPrice = finalUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(selectedDish, quantity, selectedOptions, instructions);
    setSelectedDish(null);
  };

  const handleOptionChange = (custFieldId: string, optionLabel: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [custFieldId]: optionLabel
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    addDishReview(selectedDish.id, {
      author: newReviewAuthor.trim() || (language === 'vi' ? 'Thực khách thân thiết' : 'Valued Diner'),
      rating: newReviewRating,
      commentVi: newReviewComment,
      commentEn: newReviewComment,
      dishId: selectedDish.id,
      verifiedOrder: true
    });

    setNewReviewAuthor('');
    setNewReviewComment('');
    setReviewSubmittedNotice(true);
    setTimeout(() => setReviewSubmittedNotice(false), 3000);
  };

  const name = language === 'vi' ? selectedDish.nameVi : selectedDish.nameEn;
  const description = language === 'vi' ? selectedDish.descriptionVi : selectedDish.descriptionEn;
  const ingredients = language === 'vi' ? selectedDish.ingredientsVi : selectedDish.ingredientsEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-[#D97706]/40 overflow-hidden my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDish(null)}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-stone-900 shrink-0">
          <img 
            src={selectedDish.image} 
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1A12] via-transparent to-black/30" />

          {/* Floating Badges */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <span className="inline-block bg-[#F59E0B] text-[#7F1D1D] font-bold text-xs px-2.5 py-0.5 rounded-full mb-1.5 shadow">
                {selectedDish.region === 'bac' ? 'Đặc Sản Bắc Bộ' : selectedDish.region === 'trung' ? 'Đặc Sản Xứ Huế' : selectedDish.region === 'nam' ? 'Đặc Sản Nam Bộ' : 'Ẩm Thực Việt Nam'}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-white drop-shadow-md">
                {name}
              </h2>
            </div>
            
            <div className="bg-[#8C1D18]/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#F59E0B]/40 text-right shadow">
              <span className="text-xs text-[#FDE68A] block font-medium">Giá niêm yết</span>
              <span className="text-lg sm:text-xl font-bold text-white">
                {finalUnitPrice.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 cursor-pointer transition-all ${
              activeTab === 'details'
                ? 'border-[#8C1D18] text-[#8C1D18]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Mô Tả & Khẩu Vị
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 cursor-pointer transition-all flex items-center space-x-1.5 ${
              activeTab === 'reviews'
                ? 'border-[#8C1D18] text-[#8C1D18]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Đánh Giá Thực Khách ({selectedDish.reviewsCount})</span>
            <span className="bg-amber-100 text-amber-800 text-xs px-1.5 py-0.2 rounded-full font-bold">
              ★ {selectedDish.rating}
            </span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'details' ? (
            <>
              {/* Quick specs pill row */}
              <div className="flex flex-wrap items-center gap-3 text-xs bg-[#FEF3C7]/40 p-3 rounded-2xl border border-[#D97706]/20">
                <div className="flex items-center space-x-1 text-amber-900 font-medium">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-bold">{selectedDish.rating} / 5</span>
                  <span className="text-stone-500">({selectedDish.reviewsCount} lượt)</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1 text-stone-700">
                  <Clock className="w-4 h-4 text-stone-500" />
                  <span>{selectedDish.prepTimeMinutes} phút chế biến</span>
                </div>
                <span>•</span>
                <div className="text-stone-700">
                  <span>{selectedDish.calories} kcal năng lượng</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <span>🌶️ Độ cay:</span>
                  <span className="font-semibold text-red-700">{t.spiceLevels[selectedDish.spicyLevel]}</span>
                </div>
              </div>

              {/* Story & Description */}
              <div>
                <h4 className="text-xs font-bold text-[#8C1D18] uppercase tracking-wider mb-1.5">
                  Câu Chuyện & Hương Vị
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Ingredients & 5-Flavors Balance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ingredients */}
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                  <h4 className="text-xs font-bold text-[#8C1D18] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.dishDetail.ingredients}</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-stone-700">
                    {ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Taste Score Profile */}
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                  <h4 className="text-xs font-bold text-[#8C1D18] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{t.dishDetail.tasteScore}</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {[
                      { key: 'sweet', label: t.dishDetail.sweet, val: selectedDish.tasteProfile.sweet, color: 'bg-amber-400' },
                      { key: 'sour', label: t.dishDetail.sour, val: selectedDish.tasteProfile.sour, color: 'bg-lime-500' },
                      { key: 'salty', label: t.dishDetail.salty, val: selectedDish.tasteProfile.salty, color: 'bg-sky-500' },
                      { key: 'spicy', label: t.dishDetail.spicy, val: selectedDish.tasteProfile.spicy, color: 'bg-red-500' },
                      { key: 'richness', label: t.dishDetail.richness, val: selectedDish.tasteProfile.richness, color: 'bg-orange-500' }
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between gap-2">
                        <span className="w-16 text-stone-600">{item.label}</span>
                        <div className="flex-1 bg-stone-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${(item.val / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-stone-700 w-6 text-right">
                          {item.val}/5
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customizations Section */}
              {selectedDish.customizations && selectedDish.customizations.length > 0 && (
                <div className="border-t border-stone-200 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-[#8C1D18] uppercase tracking-wider">
                    {t.dishDetail.customize}
                  </h4>
                  <div className="space-y-3">
                    {selectedDish.customizations.map(cust => (
                      <div key={cust.id} className="space-y-1.5">
                        <label className="text-xs font-semibold text-stone-800">
                          {language === 'vi' ? cust.nameVi : cust.nameEn}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cust.options.map((opt, oIdx) => {
                            const optLabel = language === 'vi' ? opt.labelVi : opt.labelEn;
                            const isChosen = selectedOptions[cust.id] === optLabel;
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => handleOptionChange(cust.id, optLabel)}
                                className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                                  isChosen
                                    ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F] shadow-sm font-bold'
                                    : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                                }`}
                              >
                                <span>{optLabel}</span>
                                {opt.priceDelta > 0 && (
                                  <span className="text-[11px] text-[#8C1D18] font-bold ml-1">
                                    +{opt.priceDelta.toLocaleString('vi-VN')}đ
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Note for Chef */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  {t.dishDetail.noteForChef}
                </label>
                <input 
                  type="text"
                  placeholder="Ví dụ: Nước lèo thật nóng, không lấy ớt tươi, chia 2 bát..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#8C1D18] bg-white"
                />
              </div>
            </>
          ) : (
            /* Reviews Tab */
            <div className="space-y-5">
              {/* Rating summary */}
              <div className="flex items-center justify-between bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-black text-amber-900 font-serif">
                      {selectedDish.rating}
                    </span>
                    <div>
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map(st => (
                          <Star 
                            key={st} 
                            className={`w-4 h-4 ${st <= Math.round(selectedDish.rating) ? 'fill-amber-400 text-amber-500' : 'text-stone-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-stone-500">
                        Dựa trên {selectedDish.reviewsCount} nhận xét từ khách hàng
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% Đã Thưởng Thức</span>
                  </span>
                </div>
              </div>

              {/* Review Submission Form */}
              <form onSubmit={handleReviewSubmit} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#8C1D18] uppercase tracking-wide">
                    Viết Cảm Nhận Của Bạn
                  </span>
                  
                  {/* Star picker */}
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(starVal => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setNewReviewRating(starVal)}
                        className="cursor-pointer p-0.5"
                      >
                        <Star className={`w-5 h-5 ${starVal <= newReviewRating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input 
                    type="text"
                    placeholder="Tên của bạn (hoặc để trống)"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="text-xs px-3 py-2 border border-stone-300 rounded-xl bg-white focus:outline-none focus:border-[#8C1D18]"
                  />
                  <button
                    type="submit"
                    className="bg-[#8C1D18] hover:bg-[#A8251F] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-all shadow"
                  >
                    Gửi Đánh Giá Ngay
                  </button>
                </div>

                <textarea
                  rows={2}
                  placeholder={t.dishDetail.yourReviewPlaceholder}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl bg-white focus:outline-none focus:border-[#8C1D18]"
                />

                {reviewSubmittedNotice && (
                  <p className="text-xs font-bold text-emerald-600 flex items-center space-x-1 animate-in fade-in">
                    <Check className="w-3.5 h-3.5" />
                    <span>Cảm ơn bạn! Đánh giá đã được đăng thành công.</span>
                  </p>
                )}
              </form>

              {/* Reviews list */}
              <div className="space-y-3">
                {selectedDish.reviews.map(rev => (
                  <div key={rev.id} className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-full bg-[#FEF3C7] text-[#78350F] flex items-center justify-center font-bold text-xs">
                          {rev.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-900">{rev.author}</p>
                          <p className="text-[10px] text-stone-400">{rev.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map(st => (
                          <Star key={st} className={`w-3.5 h-3.5 ${st <= rev.rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'}`} />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-xs text-stone-700 leading-relaxed pt-1">
                      {language === 'vi' ? rev.commentVi : rev.commentEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer: Quantity & Add to Cart */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-3 bg-stone-100 px-3 py-1.5 rounded-2xl border border-stone-200">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-full bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-sm text-[#2D1A12] w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-full bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add To Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="flex-1 sm:flex-initial flex items-center justify-between sm:justify-center space-x-4 bg-gradient-to-r from-[#8C1D18] to-[#A8251F] hover:from-[#A8251F] hover:to-[#B91C1C] text-[#FFFDF9] px-6 py-3 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <span>{t.dishDetail.addToCart}</span>
            <span className="bg-[#6B1410] px-2.5 py-0.5 rounded-full text-[#FDE68A] text-xs">
              {totalPrice.toLocaleString('vi-VN')}đ
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
