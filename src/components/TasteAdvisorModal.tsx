import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Flame, 
  MapPin, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  UtensilsCrossed, 
  Heart, 
  Bot,
  Send
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { Dish, Region } from '../types/restaurant';

export const TasteAdvisorModal: React.FC = () => {
  const { 
    isTasteAdvisorOpen, 
    setIsTasteAdvisorOpen, 
    dishes, 
    setSelectedDish, 
    addToCart, 
    setIsCartOpen,
    language 
  } = useRestaurant();

  // Step state: 0 = quiz questions, 1 = personalized recommendation results
  const [step, setStep] = useState<'quiz' | 'results'>('quiz');

  // Answers
  const [prefRegion, setPrefRegion] = useState<Region | 'all'>('all');
  const [prefSpicy, setPrefSpicy] = useState<'none' | 'mild' | 'spicy'>('mild');
  const [prefMealType, setPrefMealType] = useState<'soup' | 'rice' | 'vegetarian' | 'light' | 'family'>('soup');
  const [prefFlavorTone, setPrefFlavorTone] = useState<'light' | 'balanced' | 'rich'>('balanced');
  const [prefWeather, setPrefWeather] = useState<'hot_cool' | 'rainy_warm' | 'any'>('rainy_warm');

  // AI interactive chef custom question
  const [chefQuery, setChefQuery] = useState('');
  const [chefAnswer, setChefAnswer] = useState<string | null>(null);
  const [isChefThinking, setIsChefThinking] = useState(false);

  if (!isTasteAdvisorOpen) return null;

  // Filter & score dishes
  const scoredDishes = dishes.map(dish => {
    let score = 50;

    // Region match
    if (prefRegion !== 'all') {
      if (dish.region === prefRegion) score += 25;
    } else {
      score += 10;
    }

    // Spicy match
    if (prefSpicy === 'none' && dish.spicyLevel === 0) score += 25;
    if (prefSpicy === 'mild' && dish.spicyLevel <= 1) score += 20;
    if (prefSpicy === 'spicy' && dish.spicyLevel >= 2) score += 30;

    // Meal type
    if (prefMealType === 'soup' && dish.category === 'pho_bun') score += 30;
    if (prefMealType === 'rice' && (dish.category === 'com_xoi' || dish.category === 'mon_chinh_kho_xao')) score += 30;
    if (prefMealType === 'vegetarian' && dish.isVegetarian) score += 40;
    if (prefMealType === 'light' && (dish.category === 'mon_cuon_banh' || dish.calories < 350)) score += 25;
    if (prefMealType === 'family' && (dish.category === 'mon_chinh_kho_xao' || dish.category === 'com_xoi')) score += 25;

    // Flavor tone
    if (prefFlavorTone === 'light' && dish.tasteProfile.richness <= 2) score += 20;
    if (prefFlavorTone === 'rich' && dish.tasteProfile.richness >= 4) score += 20;
    if (prefFlavorTone === 'balanced') score += 15;

    // Weather
    if (prefWeather === 'rainy_warm' && (dish.category === 'pho_bun' || dish.category === 'mon_chinh_kho_xao')) score += 15;
    if (prefWeather === 'hot_cool' && (dish.category === 'mon_cuon_banh' || dish.category === 'do_uong' || dish.category === 'trang_mieng_che')) score += 15;

    return { dish, score };
  }).sort((a, b) => b.score - a.score);

  const topRecommendations = scoredDishes.slice(0, 3).map(s => s.dish);

  // Curate a matching 3-item meal combo (Appetizer + Main + Dessert/Drink)
  const appetizer = dishes.find(d => d.category === 'mon_cuon_banh') || dishes[4];
  const mainDish = topRecommendations[0] || dishes[0];
  const beverage = dishes.find(d => d.category === 'do_uong' || d.category === 'trang_mieng_che') || dishes[10];

  const comboTotal = appetizer.price + mainDish.price + beverage.price;
  const comboDiscounted = Math.round(comboTotal * 0.9); // 10% combo discount

  const handleAddFullCombo = () => {
    addToCart(appetizer, 1);
    addToCart(mainDish, 1);
    addToCart(beverage, 1);
    setIsTasteAdvisorOpen(false);
    setIsCartOpen(true);
  };

  const handleAskChef = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chefQuery.trim()) return;

    setIsChefThinking(true);
    setChefAnswer(null);

    // Provide context-aware culinary expertise
    setTimeout(() => {
      const q = chefQuery.toLowerCase();
      let response = '';
      if (q.includes('chay') || q.includes('rau') || q.includes('thanh tịnh')) {
        response = 'Bếp Trưởng gợi ý: Bạn hãy thử ngay bát "Phở Chay Thảo Mộc Nấm Hương Hạt Sen" ninh cùng củ sen, mía lau ngọt dịu và đĩa "Đậu Hũ Non Sốt Cà Chua". Thanh đạm, giàu dinh dưỡng và an yên tâm trí!';
      } else if (q.includes('mệt') || q.includes('cảm') || q.includes('ấm') || q.includes('lạnh')) {
        response = 'Bếp Trưởng gợi ý: Một bát "Phở Bò Tái Nạm Cổ Truyền Hà Nội" nóng hổi dậy mùi gừng nướng và hoa hồi sẽ giúp bạn toát mồ hôi, ấm tỳ vị và hồi phục năng lượng nhanh chóng!';
      } else if (q.includes('cay') || q.includes('đậm đà') || q.includes('huế')) {
        response = 'Bếp Trưởng gợi ý: Món "Bún Bò Huế Cung Đình Chả Cua" với ớt sa tế phi sả thơm lừng và khoanh giò giòn sần sật chính là chân ái đậm vị dành cho bạn hôm nay!';
      } else if (q.includes('ngọt') || q.includes('uống') || q.includes('tráng miệng')) {
        response = 'Bếp Trưởng gợi ý: Hãy kết thúc bữa ăn bằng ly "Cà Phê Trứng Hà Nội" kem béo mịn hoặc bát "Chè Ba Màu Cốt Dừa Bến Tre" bùi mát!';
      } else {
        response = `Bếp Trưởng chia sẻ: Với yêu cầu "${chefQuery}", sự kết hợp giữa món mặn đậm đà như "Cơm Tấm Sườn Bì Chả" hoặc "Cá Bống Kho Tộ Niêu Đất" ăn kèm một bát canh chua cá lóc sẽ tạo nên mâm cơm cân bằng ngũ hành chuẩn vị gia đình Việt!`;
      }
      setChefAnswer(response);
      setIsChefThinking(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-[#D97706]/40 overflow-hidden my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8C1D18] via-[#A8251F] to-[#6B1410] text-[#FFFDF9] p-5 relative border-b border-[#F59E0B]/30 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#7F1D1D] flex items-center justify-center font-bold shadow">
              <Sparkles className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-black text-white">
                Khẩu Vị Cá Nhân & Bếp Trưởng AI
              </h2>
              <p className="text-xs text-[#FDE68A]/90 font-light">
                Khám phá món ngon Việt Nam đúng điệu theo gu vị của bạn
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTasteAdvisorOpen(false)}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {step === 'quiz' ? (
            /* Quiz Questions */
            <div className="space-y-5">
              {/* Question 1: Region */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-[#8C1D18] flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-[#D97706]" />
                  <span>1. Bạn muốn thưởng thức phong vị vùng miền nào hôm nay?</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'all', label: 'Cả Ba Miền', desc: 'Hài hòa tinh túy' },
                    { id: 'bac', label: 'Bắc Bộ', desc: 'Thanh tao, vừa vặn' },
                    { id: 'trung', label: 'Xứ Huế', desc: 'Đậm đà, cay nồng' },
                    { id: 'nam', label: 'Phương Nam', desc: 'Ngọt bùi, đậm vị' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPrefRegion(opt.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        prefRegion === opt.id
                          ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F] font-bold shadow-sm'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{opt.label}</div>
                      <div className="text-[10px] text-stone-500">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Spicy */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-[#8C1D18] flex items-center space-x-1.5">
                  <Flame className="w-4 h-4 text-red-600" />
                  <span>2. Khả năng ăn cay của bạn như thế nào?</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: 'Không cay', icon: '🌿' },
                    { id: 'mild', label: 'Cay nhẹ ấm bụng', icon: '🌶️' },
                    { id: 'spicy', label: 'Cay nồng xuýt xoa', icon: '🌶️🌶️' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPrefSpicy(opt.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        prefSpicy === opt.id
                          ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F] font-bold shadow-sm'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                      }`}
                    >
                      <div className="text-sm">{opt.icon}</div>
                      <div className="text-xs">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Meal Style */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-[#8C1D18] flex items-center space-x-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-[#D97706]" />
                  <span>3. Kiểu món ăn bạn muốn ăn nhất lúc này?</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'soup', label: 'Phở & Bún nước', desc: 'Xì xụp nóng hổi' },
                    { id: 'rice', label: 'Cơm & Niêu đất', desc: 'No bụng đậm đà' },
                    { id: 'vegetarian', label: 'Món Chay thanh tịnh', desc: 'Nhẹ nhàng thanh lọc' },
                    { id: 'light', label: 'Món cuốn bánh', desc: 'Tươi mát nhiều rau' },
                    { id: 'family', label: 'Bữa cơm sum họp', desc: 'Đủ canh kho xào' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPrefMealType(opt.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        prefMealType === opt.id
                          ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F] font-bold shadow-sm'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{opt.label}</div>
                      <div className="text-[10px] text-stone-500">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4: Weather/Mood */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-[#8C1D18]">
                  4. Thời tiết bên ngoài hoặc tâm trạng hiện tại?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rainy_warm', label: 'Trời mưa / Cần ấm áp', icon: '🌧️' },
                    { id: 'hot_cool', label: 'Trời nắng / Cần mát lành', icon: '☀️' },
                    { id: 'any', label: 'Tùy ý bếp trưởng', icon: '✨' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPrefWeather(opt.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        prefWeather === opt.id
                          ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F] font-bold shadow-sm'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                      }`}
                    >
                      <div className="text-sm">{opt.icon}</div>
                      <div className="text-xs">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick AI Question Input */}
              <div className="bg-[#FEF3C7]/40 p-3.5 rounded-2xl border border-[#D97706]/30">
                <label className="text-xs font-bold text-[#8C1D18] flex items-center space-x-1.5 mb-1.5">
                  <Bot className="w-4 h-4 text-[#D97706]" />
                  <span>Hoặc nhắn riêng khẩu vị cho Bếp Trưởng:</span>
                </label>
                <form onSubmit={handleAskChef} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="VD: Tôi bị đau họng cần món gì ấm cổ, hoặc gợi ý món ít calo..."
                    value={chefQuery}
                    onChange={(e) => setChefQuery(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 border border-stone-300 rounded-xl bg-white focus:outline-none focus:border-[#8C1D18]"
                  />
                  <button
                    type="submit"
                    disabled={isChefThinking}
                    className="bg-[#8C1D18] hover:bg-[#A8251F] text-white text-xs px-3.5 py-2 rounded-xl font-bold cursor-pointer transition-all shadow flex items-center space-x-1 shrink-0"
                  >
                    <span>{isChefThinking ? 'Đang nghĩ...' : 'Hỏi Bếp'}</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>

                {chefAnswer && (
                  <div className="mt-2.5 bg-white p-3 rounded-xl border border-[#D97706]/40 text-xs text-stone-800 leading-relaxed animate-in fade-in">
                    <p className="font-bold text-[#8C1D18] mb-0.5 flex items-center space-x-1">
                      <span>👨‍🍳 Bếp Trưởng Món Việt phản hồi:</span>
                    </p>
                    <p>{chefAnswer}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Results Step */
            <div className="space-y-6">
              {/* Recommended Top Dishes */}
              <div>
                <h3 className="text-sm font-bold text-[#8C1D18] uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>3 Món Phù Hợp Nhất Với Khẩu Vị Của Bạn</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {topRecommendations.map((d, idx) => (
                    <div 
                      key={d.id} 
                      className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative h-28 w-full">
                        <img src={d.image} alt={d.nameVi} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-[#8C1D18] text-[#FEF3C7] text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                          Hợp Gu #{idx + 1}
                        </span>
                      </div>
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2D1A12] line-clamp-1 mb-1">
                            {language === 'vi' ? d.nameVi : d.nameEn}
                          </h4>
                          <p className="text-[11px] text-stone-500 line-clamp-2 mb-2">
                            {language === 'vi' ? d.descriptionVi : d.descriptionEn}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                          <span className="text-xs font-bold text-[#8C1D18]">
                            {d.price.toLocaleString('vi-VN')}đ
                          </span>
                          <button
                            onClick={() => {
                              addToCart(d, 1);
                              setIsTasteAdvisorOpen(false);
                              setIsCartOpen(true);
                            }}
                            className="bg-[#8C1D18] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg hover:bg-[#A8251F] cursor-pointer"
                          >
                            + Gọi món
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Complete Combo Set */}
              <div className="bg-gradient-to-br from-[#FEF3C7] via-[#FFF8E7] to-[#FDE68A] p-4 sm:p-5 rounded-2xl border-2 border-[#D97706] shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#8C1D18] text-white px-2 py-0.5 rounded-full">
                      Mâm Cơm Đề Xuất
                    </span>
                    <h4 className="font-serif font-black text-base sm:text-lg text-[#78350F] mt-1">
                      Combo "Ngũ Hành Tương Sinh" Ba Món
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs line-through text-stone-500 block">
                      {comboTotal.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-base font-bold text-[#8C1D18]">
                      {comboDiscounted.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white/80 p-2 rounded-xl border border-[#D97706]/20">
                    <span className="text-[10px] text-stone-500 block">1. Khai vị</span>
                    <span className="font-bold text-[#2D1A12] line-clamp-1">{appetizer.nameVi}</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-xl border border-[#D97706]/20">
                    <span className="text-[10px] text-stone-500 block">2. Món chính</span>
                    <span className="font-bold text-[#2D1A12] line-clamp-1">{mainDish.nameVi}</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-xl border border-[#D97706]/20">
                    <span className="text-[10px] text-stone-500 block">3. Đồ uống</span>
                    <span className="font-bold text-[#2D1A12] line-clamp-1">{beverage.nameVi}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddFullCombo}
                  className="w-full bg-[#8C1D18] hover:bg-[#A8251F] text-[#FEF3C7] font-bold py-2.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <span>Thêm Cả Mâm Cơm Vào Đơn Gọi (Tiết kiệm 10%)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center shrink-0">
          {step === 'quiz' ? (
            <button
              onClick={() => setStep('results')}
              className="w-full bg-[#8C1D18] hover:bg-[#A8251F] text-[#FFFDF9] font-bold py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Xem Gợi Ý Món Hợp Gu</span>
              <ArrowRight className="w-4 h-4 text-[#FDE68A]" />
            </button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setStep('quiz')}
                className="flex items-center space-x-1 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Chọn lại khẩu vị</span>
              </button>

              <button
                onClick={() => setIsTasteAdvisorOpen(false)}
                className="bg-[#8C1D18] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#A8251F] cursor-pointer"
              >
                Quay lại thực đơn
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
