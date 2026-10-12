import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  User, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { DiningZone, Reservation } from '../types/restaurant';

export const ReservationModal: React.FC = () => {
  const { 
    isReservationOpen, 
    setIsReservationOpen, 
    reservations, 
    createReservation, 
    t, 
    language 
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'new' | 'list'>('new');
  
  // Form state
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('18:30');
  const [zone, setZone] = useState<DiningZone>('main_hall');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmation screen state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  if (!isReservationOpen) return null;

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00',
    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const zoneOptions: { id: DiningZone; label: string; desc: string; icon: string }[] = [
    { id: 'main_hall', label: 'Sảnh Chính Bắc Bộ', desc: 'Ấm cúng đèn lồng, nhạc cụ dân tộc', icon: '🏮' },
    { id: 'bamboo_garden', label: 'Vườn Trúc Xanh', desc: 'Thoáng mát, cây xanh thiên nhiên', icon: '🎋' },
    { id: 'hoi_an_balcony', label: 'Ban Công Phố Hội', desc: 'View thoáng lãng mạn, gió trời', icon: '🏮' },
    { id: 'vip_imperial', label: 'Phòng VIP Cung Đình', desc: 'Không gian riêng tư sang trọng', icon: '👑' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !phone.trim()) return;

    const res = createReservation({
      guestName,
      phone,
      guestsCount,
      date,
      timeSlot,
      zone,
      specialRequests: specialRequests.trim() || undefined,
      tableNumber: zone === 'vip_imperial' ? 'VIP 02' : undefined
    });

    setConfirmedReservation(res);
  };

  const handleReset = () => {
    setConfirmedReservation(null);
    setGuestName('');
    setPhone('');
    setSpecialRequests('');
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
              <CalendarIcon className="w-5 h-5 text-[#8C1D18]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-black text-white">
                {t.reservation.title}
              </h2>
              <p className="text-xs text-[#FDE68A]/90 font-light">
                {t.reservation.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsReservationOpen(false)}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 shrink-0">
          <button
            onClick={() => { setActiveTab('new'); setConfirmedReservation(null); }}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 cursor-pointer transition-all ${
              activeTab === 'new'
                ? 'border-[#8C1D18] text-[#8C1D18]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Đặt Bàn Mới
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 cursor-pointer transition-all flex items-center space-x-1.5 ${
              activeTab === 'list'
                ? 'border-[#8C1D18] text-[#8C1D18]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>Lịch Đặt Của Bạn ({reservations.length})</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'new' ? (
            confirmedReservation ? (
              /* Confirmation Success Screen */
              <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Đặt Bàn Thành Công
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-[#2D1A12] mt-2">
                    Mã Đặt Bàn: <span className="text-[#8C1D18]">{confirmedReservation.code}</span>
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
                    Nhà hàng Món Việt đã lưu thông tin của quý khách. Lễ tân sẽ gọi điện thoại xác nhận trước giờ dùng bữa 30 phút.
                  </p>
                </div>

                {/* Booking details card */}
                <div className="bg-[#FEF3C7]/40 border border-[#D97706]/30 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Người đặt:</span>
                    <span className="font-bold text-[#2D1A12]">{confirmedReservation.guestName} ({confirmedReservation.phone})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Thời gian:</span>
                    <span className="font-bold text-[#2D1A12]">{confirmedReservation.timeSlot} • Ngày {confirmedReservation.date}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Số lượng khách:</span>
                    <span className="font-bold text-[#2D1A12]">{confirmedReservation.guestsCount} người</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">Khu vực bàn:</span>
                    <span className="font-bold text-[#8C1D18]">
                      {zoneOptions.find(z => z.id === confirmedReservation.zone)?.label}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="bg-stone-200 text-stone-800 text-xs font-bold px-4 py-2 rounded-xl hover:bg-stone-300 cursor-pointer"
                  >
                    Đặt Thêm Bàn Khác
                  </button>
                  <button
                    onClick={() => setIsReservationOpen(false)}
                    className="bg-[#8C1D18] text-white text-xs font-bold px-5 py-2 rounded-xl hover:bg-[#A8251F] cursor-pointer shadow"
                  >
                    Xem Thực Đơn Chọn Món
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Guest info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t.reservation.name} *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#8C1D18] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t.reservation.phone} *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        placeholder="0912 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#8C1D18] bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t.reservation.guests}
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full text-xs pl-9 pr-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#8C1D18] bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map(cnt => (
                          <option key={cnt} value={cnt}>{cnt} người</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t.reservation.date}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#8C1D18] bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      {t.reservation.time}
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#8C1D18] bg-white"
                    >
                      {timeSlots.map(tSlot => (
                        <option key={tSlot} value={tSlot}>{tSlot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dining Zone Selector */}
                <div>
                  <label className="text-xs font-bold text-[#8C1D18] uppercase tracking-wide block mb-2">
                    {t.reservation.zone}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {zoneOptions.map(z => {
                      const isChosen = zone === z.id;
                      return (
                        <button
                          type="button"
                          key={z.id}
                          onClick={() => setZone(z.id)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start space-x-2.5 ${
                            isChosen
                              ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F] shadow-sm font-semibold'
                              : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                          }`}
                        >
                          <span className="text-xl">{z.icon}</span>
                          <div>
                            <div className="text-xs font-bold">{z.label}</div>
                            <div className="text-[11px] text-stone-500">{z.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    {t.reservation.specialRequests}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Ghế cao cho trẻ 2 tuổi, cần góc yên tĩnh tiếp đối tác, tổ chức sinh nhật..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#8C1D18] bg-white"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#8C1D18] to-[#A8251F] hover:from-[#A8251F] hover:to-[#B91C1C] text-[#FFFDF9] font-bold py-3 rounded-2xl text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-[#FDE68A]" />
                  <span>{t.reservation.submit}</span>
                </button>
              </form>
            )
          ) : (
            /* Reservations History List */
            <div className="space-y-3">
              {reservations.length === 0 ? (
                <div className="text-center py-10 text-stone-400 text-xs">
                  Chưa có lịch đặt bàn nào.
                </div>
              ) : (
                reservations.map(res => (
                  <div key={res.id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#8C1D18] text-sm">#{res.code}</span>
                        <span className="text-xs font-semibold text-stone-800">{res.guestName}</span>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Đã xác nhận
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 pt-1 border-t border-stone-100">
                      <div>
                        <span>📅 Ngày: </span>
                        <span className="font-semibold text-stone-900">{res.date} ({res.timeSlot})</span>
                      </div>
                      <div>
                        <span>👥 Khách: </span>
                        <span className="font-semibold text-stone-900">{res.guestsCount} người</span>
                      </div>
                      <div className="col-span-2">
                        <span>📍 Khu vực: </span>
                        <span className="font-semibold text-[#8C1D18]">
                          {zoneOptions.find(z => z.id === res.zone)?.label}
                        </span>
                      </div>
                      {res.specialRequests && (
                        <div className="col-span-2 text-[11px] text-stone-500 italic">
                          "Ghi chú: {res.specialRequests}"
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
