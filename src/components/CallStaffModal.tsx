import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Check, 
  Clock, 
  UserCheck, 
  Sparkles, 
  HelpCircle, 
  Coffee, 
  Flame, 
  Receipt, 
  Trash2,
  PhoneCall
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { ServiceRequest } from '../types/restaurant';

export const CallStaffModal: React.FC = () => {
  const { 
    isCallStaffOpen, 
    setIsCallStaffOpen, 
    tableNumber, 
    callStaff, 
    serviceRequests, 
    t, 
    language 
  } = useRestaurant();

  const [customMsg, setCustomMsg] = useState('');
  const [lastRequestedTitle, setLastRequestedTitle] = useState<string | null>(null);

  if (!isCallStaffOpen) return null;

  const quickButtons: { type: ServiceRequest['type']; titleVi: string; titleEn: string; icon: string }[] = [
    { type: 'condiments', titleVi: 'Xin thêm nước mắm, chanh, ớt tươi', titleEn: 'Extra fish sauce, lime, fresh chili', icon: '🌶️' },
    { type: 'ice_towels', titleVi: 'Xin thêm đá lạnh & khăn ướt', titleEn: 'Extra ice cubes & wet towels', icon: '🧊' },
    { type: 'tea', titleVi: 'Rót thêm trà sen ấm nóng', titleEn: 'Refill warm lotus tea', icon: '🍵' },
    { type: 'clear_dishes', titleVi: 'Dọn dẹp bớt đĩa bát đã dùng', titleEn: 'Clear used plates and bowls', icon: '🍽️' },
    { type: 'bill', titleVi: 'Yêu cầu tính tiền tại bàn', titleEn: 'Request bill & payment', icon: '🧾' },
    { type: 'other', titleVi: 'Nhân viên đến bàn hỗ trợ trực tiếp', titleEn: 'Direct staff table assistance', icon: '🙋' }
  ];

  const handleCall = (type: ServiceRequest['type'], titleVi: string, titleEn: string) => {
    callStaff(type, titleVi, titleEn);
    setLastRequestedTitle(language === 'vi' ? titleVi : titleEn);
    setTimeout(() => setLastRequestedTitle(null), 3000);
  };

  const handleCustomCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    callStaff('other', customMsg, customMsg);
    setLastRequestedTitle(customMsg);
    setCustomMsg('');
    setTimeout(() => setLastRequestedTitle(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-[#D97706]/40 overflow-hidden my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8C1D18] via-[#A8251F] to-[#6B1410] text-[#FFFDF9] p-5 relative border-b border-[#F59E0B]/30 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#7F1D1D] flex items-center justify-center font-bold shadow">
              <PhoneCall className="w-5 h-5 text-[#8C1D18] animate-bounce" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-black text-white flex items-center space-x-2">
                <span>{t.staffCall.title}</span>
                <span className="text-xs bg-[#F59E0B] text-[#7F1D1D] px-2 py-0.5 rounded-full font-bold">
                  {tableNumber}
                </span>
              </h2>
              <p className="text-xs text-[#FDE68A]/90 font-light">
                {t.staffCall.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCallStaffOpen(false)}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {lastRequestedTitle && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Đã gửi yêu cầu: "{lastRequestedTitle}". Nhân viên đang đến!</span>
            </div>
          )}

          {/* Quick Action Grid */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#8C1D18] uppercase tracking-wide">
              Yêu Cầu Nhanh 1 Chạm
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickButtons.map((btn, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCall(btn.type, btn.titleVi, btn.titleEn)}
                  className="p-3 bg-white hover:bg-[#FEF3C7] border border-stone-200 hover:border-[#D97706] rounded-2xl text-left transition-all cursor-pointer flex items-center space-x-2.5 shadow-sm group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{btn.icon}</span>
                  <span className="text-xs font-semibold text-stone-800 group-hover:text-[#78350F] leading-tight">
                    {language === 'vi' ? btn.titleVi : btn.titleEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom text request */}
          <form onSubmit={handleCustomCall} className="space-y-1.5 pt-2 border-t border-stone-200">
            <span className="text-xs font-bold text-stone-700">
              Yêu cầu khác:
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ví dụ: Xin mượn bật lửa, mượn ổ cắm sạc pin..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 text-xs px-3 py-2 border border-stone-300 rounded-xl bg-white focus:outline-none focus:border-[#8C1D18]"
              />
              <button
                type="submit"
                className="bg-[#8C1D18] hover:bg-[#A8251F] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-all shadow"
              >
                Gửi
              </button>
            </div>
          </form>

          {/* Recent Service Requests Status List */}
          {serviceRequests.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-stone-200">
              <span className="text-xs font-bold text-stone-600 block">
                Trạng thái các yêu cầu vừa gửi:
              </span>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {serviceRequests.map(req => (
                  <div key={req.id} className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-stone-900">
                        {language === 'vi' ? req.titleVi : req.titleEn}
                      </p>
                      <p className="text-[10px] text-stone-500">
                        {req.createdAt} • {req.tableNumber}
                      </p>
                    </div>

                    <div className="text-right">
                      {req.status === 'attending' ? (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <UserCheck className="w-3 h-3" />
                          <span>{req.staffName || 'Đang hỗ trợ'}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full animate-pulse">
                          <Clock className="w-3 h-3" />
                          <span>Đã nhận chuông</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
