import React from 'react';
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  ShieldCheck, 
  Heart,
  Crown
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Footer: React.FC = () => {
  const { t, setIsReservationOpen, setIsTasteAdvisorOpen, setIsLoyaltyOpen } = useRestaurant();

  return (
    <footer className="bg-[#6B1410] text-[#FFFDF9] border-t-4 border-[#D97706] pt-12 pb-8 mt-16 relative overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none text-9xl font-serif">
        🏮
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#F59E0B]/20">
          {/* Col 1: Brand & Heritage */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-[#F59E0B] text-[#7F1D1D] flex items-center justify-center font-bold">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-serif font-black text-xl text-white">
                MÓN VIỆT
              </span>
            </div>
            <p className="text-xs text-[#FDE68A] font-serif font-medium italic">
              "Tinh hoa ẩm thực con người Việt Nam"
            </p>
            <p className="text-xs text-[#FDE68A]/80 leading-relaxed font-light">
              Nơi hội tụ tinh hoa ẩm thực ba miền Bắc - Trung - Nam, gìn giữ trọn vẹn phong vị cổ truyền trong từng bát nước dùng và mẹt bánh dân gian.
            </p>
            <div className="pt-1 flex items-center space-x-2 text-xs text-[#FDE68A]">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              <span>Chứng nhận VSATTP & Chuẩn Vị Việt</span>
            </div>
          </div>

          {/* Col 2: Locations & Contact */}
          <div className="space-y-2 text-xs text-stone-200">
            <h4 className="font-serif font-bold text-sm text-[#F59E0B] uppercase tracking-wider mb-2">
              Địa Chỉ & Liên Hệ
            </h4>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span className="leading-snug">Địa chỉ: 56 Huỳnh Văn Nghệ, P. Bửu Long, TP. Biên Hòa, Đồng Nai</span>
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span className="font-bold text-white">Hotline Đặt Bàn: 0793464723</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Giờ mở cửa: 7h30 đến 22h30 hàng ngày</span>
            </div>
          </div>

          {/* Col 3: Quick Services */}
          <div className="space-y-2 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#F59E0B] uppercase tracking-wider mb-2">
              Dịch Vụ Nổi Bật
            </h4>
            <ul className="space-y-2 text-stone-200">
              <li>
                <button onClick={() => setIsReservationOpen(true)} className="hover:text-[#FDE68A] cursor-pointer">
                  • Đặt bàn trước & Tiệc gia đình
                </button>
              </li>
              <li>
                <button onClick={() => setIsTasteAdvisorOpen(true)} className="hover:text-[#FDE68A] cursor-pointer">
                  • Khảo sát khẩu vị & Gợi ý món AI
                </button>
              </li>
              <li>
                <button onClick={() => setIsLoyaltyOpen(true)} className="hover:text-[#FDE68A] cursor-pointer">
                  • Chương trình Hội viên Mỹ Vị Club
                </button>
              </li>
              <li>
                <span className="text-stone-300">• Gọi món tại bàn quét mã QR tiện lợi</span>
              </li>
              <li>
                <span className="text-stone-300">• Giao hàng tận nơi bao bì thân thiện</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Electronic Wallet Partners */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#F59E0B] uppercase tracking-wider mb-2">
              Đối Tác Ví Điện Tử
            </h4>
            <p className="text-stone-300 leading-relaxed text-[11px]">
              Hỗ trợ thanh toán không tiền mặt an toàn, quét mã QR đa năng từ các ví điện tử và ngân hàng hàng đầu:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="bg-[#A50064] text-white px-2 py-1 rounded-lg font-bold text-[11px] shadow">
                MoMo
              </span>
              <span className="bg-[#0068FF] text-white px-2 py-1 rounded-lg font-bold text-[11px] shadow">
                ZaloPay
              </span>
              <span className="bg-[#005BAA] text-white px-2 py-1 rounded-lg font-bold text-[11px] shadow">
                VNPay-QR
              </span>
              <span className="bg-[#EE0033] text-white px-2 py-1 rounded-lg font-bold text-[11px] shadow">
                Viettel Money
              </span>
              <span className="bg-stone-800 text-stone-200 px-2 py-1 rounded-lg font-bold text-[11px]">
                Visa / ATM
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-300/80 gap-2">
          <p>© 2026 Món Việt. Tinh hoa ẩm thực con người Việt Nam. Mọi quyền được bảo lưu.</p>
          <p className="flex items-center space-x-1">
            <span>Chế biến bằng tình yêu ẩm thực quê hương</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
