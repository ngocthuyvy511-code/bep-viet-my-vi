import { Dish } from '../types/restaurant';

export const initialDishes: Dish[] = [
  {
    id: 'pho-bo-tai-nam',
    nameVi: 'Phở Bò Tái Nạm Cổ Truyền Hà Nội',
    nameEn: 'Hanoi Traditional Beef Pho (Rare & Flank)',
    category: 'pho_bun',
    price: 89000,
    originalPrice: 99000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Nước dùng ninh từ xương ống bò 18 tiếng hòa quyện cùng hoa hồi, thảo quả, quế chi và gừng nướng. Thịt bò tái mềm ngọt tự nhiên kết hợp nạm bò mềm ngậy, bánh phở tươi dẻo và hành hoa thơm nồng.',
    descriptionEn: 'Simmered beef marrow bone broth for 18 hours infused with star anise, cardamom, cinnamon, and charred ginger. Tender rare beef eye of round and succulent flank over silky hand-cut rice noodles.',
    region: 'bac',
    spicyLevel: 1,
    isBestSeller: true,
    isChefSpecial: true,
    calories: 520,
    prepTimeMinutes: 10,
    ingredientsVi: ['Bánh phở tươi', 'Bắp bò & thăn bò hoa', 'Xương ống bò ninh thảo mộc', 'Hành tây, hành hoa, ngò gai', 'Quẩy giòn ăn kèm'],
    ingredientsEn: ['Fresh rice noodles', 'Beef eye-round & flank', 'Herb-simmered bone broth', 'Scallions, cilantro, culantro', 'Crispy dough crullers'],
    tasteProfile: {
      sweet: 2,
      sour: 1,
      salty: 3,
      spicy: 1,
      richness: 4
    },
    rating: 4.9,
    reviewsCount: 148,
    customizations: [
      {
        id: 'meat_type',
        nameVi: 'Chọn loại thịt',
        nameEn: 'Meat Selection',
        options: [
          { labelVi: 'Tái & Nạm (Mặc định)', labelEn: 'Rare & Flank (Standard)', priceDelta: 0 },
          { labelVi: 'Tái Gầu giòn', labelEn: 'Rare & Crunchy Brisket', priceDelta: 10000 },
          { labelVi: 'Phở Đặc Biệt (Tái, Nạm, Gầu, Bò Viên)', labelEn: 'Special Combination (Rare, Flank, Brisket, Meatballs)', priceDelta: 25000 }
        ]
      },
      {
        id: 'broth_style',
        nameVi: 'Vị nước dùng',
        nameEn: 'Broth Style',
        options: [
          { labelVi: 'Nước trong truyền thống', labelEn: 'Traditional Clear Broth', priceDelta: 0 },
          { labelVi: 'Nước béo thêm hành trần', labelEn: 'Rich Broth with Blanched Scallions', priceDelta: 5000 },
          { labelVi: 'Nước ít gia vị thanh đạm', labelEn: 'Mild & Low-Sodium Broth', priceDelta: 0 }
        ]
      },
      {
        id: 'egg_add',
        nameVi: 'Món kèm thêm',
        nameEn: 'Add-ons',
        options: [
          { labelVi: 'Không thêm', labelEn: 'None', priceDelta: 0 },
          { labelVi: '1 Trứng gà ta chần lòng đào', labelEn: '1 Poached Farm Egg', priceDelta: 10000 },
          { labelVi: 'Đĩa quẩy giòn vàng ruộm (3 cái)', labelEn: 'Crispy Crullers plate (3 pcs)', priceDelta: 12000 }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        dishId: 'pho-bo-tai-nam',
        author: 'Nguyễn Minh Quân (Hà Nội)',
        rating: 5,
        date: '2026-10-09',
        commentVi: 'Nước dùng trong vắt, ngọt thanh tự nhiên từ xương chứ không hề ngậy bột ngọt. Thịt bò tái mềm tan, thơm ngát mùi gừng quế. Chuẩn vị phở phố cổ!',
        commentEn: 'Crystal clear broth with natural sweetness from simmered bone marrow, no MSG feeling. The beef was melt-in-the-mouth. True Old Quarter taste!',
        verifiedOrder: true
      },
      {
        id: 'rev-2',
        dishId: 'pho-bo-tai-nam',
        author: 'Sarah Jenkins (Traveler)',
        rating: 5,
        date: '2026-10-05',
        commentVi: 'Món ăn tuyệt vời nhất trong chuyến đi Việt Nam của tôi. Nước dùng ấm áp và quẩy rất giòn.',
        commentEn: 'The highlight of my culinary trip to Vietnam! Warm soothing broth and crispy fried crullers. Must try!',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'bun-bo-hue',
    nameVi: 'Bún Bò Huế Cung Đình Chả Cua',
    nameEn: 'Hue Imperial Spicy Beef & Crab Cake Noodle Soup',
    category: 'pho_bun',
    price: 92000,
    originalPrice: 98000,
    image: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Đặc sản xứ cố đô với hương sả cây phi thơm lừng cùng ớt sa tế cay nồng đặc trưng. Sợi bún to mềm dai, bắp bò hoa giòn, chả cua biển quết tay giòn sần sật và nước lèo dậy mùi mắm ruốc Huế thượng hạng.',
    descriptionEn: 'The pride of Hue royal cuisine featuring fragrant lemongrass, fiery chili satay oil, thick rice noodles, tender beef shank, handmade crab cake, and authentic Hue fermented shrimp paste.',
    region: 'trung',
    spicyLevel: 3,
    isBestSeller: true,
    calories: 580,
    prepTimeMinutes: 12,
    ingredientsVi: ['Bún bò sợi to', 'Bắp bò hoa cắt lát', 'Chả cua đầm phá', 'Huyết bò & giò heo rút xương', 'Rau chuối thái sợi, rau răm'],
    ingredientsEn: ['Thick round vermicelli', 'Beef shank slices', 'Crab cake patties', 'Tender pork knuckle', 'Shredded banana flower & Vietnamese mint'],
    tasteProfile: {
      sweet: 2,
      sour: 2,
      salty: 4,
      spicy: 4,
      richness: 5
    },
    rating: 4.8,
    reviewsCount: 112,
    customizations: [
      {
        id: 'spicy_level',
        nameVi: 'Mức độ cay sa tế',
        nameEn: 'Satay Spice Level',
        options: [
          { labelVi: 'Cay vừa chuẩn vị Huế', labelEn: 'Medium (Traditional Hue)', priceDelta: 0 },
          { labelVi: 'Ít cay nhẹ nhàng', labelEn: 'Mild Spice', priceDelta: 0 },
          { labelVi: 'Cay nồng đặc biệt (+sa tế ớt hiểm)', labelEn: 'Extra Fiery Chili', priceDelta: 0 }
        ]
      },
      {
        id: 'pork_knuckle',
        nameVi: 'Chọn giò heo',
        nameEn: 'Pork Knuckle Option',
        options: [
          { labelVi: 'Có khoanh giò heo', labelEn: 'With Pork Knuckle', priceDelta: 0 },
          { labelVi: 'Không lấy giò (đổi thêm bắp bò)', labelEn: 'No Knuckle (extra beef shank)', priceDelta: 5000 }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        dishId: 'bun-bo-hue',
        author: 'Lê Hoàng Kim',
        rating: 5,
        date: '2026-10-07',
        commentVi: 'Vị mắm ruốc thanh tao không bị gắt, chả cua cắn vào thơm bùi ngập vị biển. Nước lèo cay xuýt xoa đúng chất Huế.',
        commentEn: 'Elegant aroma of fermented shrimp paste without harshness. The crab patty is incredibly flavorful. Perfectly spicy.',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'com-tam-suon-bi-cha',
    nameVi: 'Cơm Tấm Sườn Cốt Lết Bì Chả Trứng',
    nameEn: 'Saigon Broken Rice with Grilled Pork Chop, Shredded Pork & Egg Meatloaf',
    category: 'com_xoi',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Cơm gạo tấm dẻo bùi thơm mùi lá dứa, sườn cốt lết ướp mật ong và sả nướng than hoa vàng ruộm mọng nước. Kèm bì heo trộn thính gạo rang, chả trứng hấp béo ngậy, mỡ hành xanh mướt và nước mắm chua ngọt kẹo quánh.',
    descriptionEn: 'Fragrant broken rice served with honey & lemongrass charcoal-grilled pork chop, seasoned shredded pork skin, steamed egg meatloaf, scallion oil, pickled daikon, and slow-simmered garlic chili fish sauce.',
    region: 'nam',
    spicyLevel: 1,
    isBestSeller: true,
    calories: 640,
    prepTimeMinutes: 10,
    ingredientsVi: ['Gạo tấm Sa Đéc', 'Sườn cốt lết tươi nướng than', 'Bì thính gạo rang thơm', 'Chả trứng thịt hấp', 'Mỡ hành, tóp mỡ giòn', 'Đồ chua củ cải cà rốt'],
    ingredientsEn: ['Sa Dec broken rice', 'Charcoal grilled pork chop', 'Shredded pork skin', 'Steamed egg meatloaf', 'Crispy pork lard & scallion oil', 'Pickled vegetables'],
    tasteProfile: {
      sweet: 4,
      sour: 2,
      salty: 3,
      spicy: 1,
      richness: 4
    },
    rating: 4.9,
    reviewsCount: 165,
    customizations: [
      {
        id: 'egg_choice',
        nameVi: 'Trứng ốp la',
        nameEn: 'Fried Egg Choice',
        options: [
          { labelVi: 'Ốp la lòng đào chảy', labelEn: 'Sunny Side Up (Runny Yolk)', priceDelta: 0 },
          { labelVi: 'Ốp la chín kỹ 2 mặt', labelEn: 'Well Done Fried Egg', priceDelta: 0 },
          { labelVi: 'Không lấy trứng ốp la', labelEn: 'No Fried Egg', priceDelta: -5000 }
        ]
      },
      {
        id: 'extra_pork',
        nameVi: 'Thêm sườn',
        nameEn: 'Extra Pork Cutlet',
        options: [
          { labelVi: 'Tiêu chuẩn 1 miếng sườn', labelEn: 'Standard 1 Cutlet', priceDelta: 0 },
          { labelVi: 'Thêm 1 miếng sườn nướng mật ong', labelEn: 'Add 1 Extra Grilled Cutlet', priceDelta: 40000 }
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        dishId: 'com-tam-suon-bi-cha',
        author: 'Trần Văn Đức (Sài Gòn)',
        rating: 5,
        date: '2026-10-10',
        commentVi: 'Miếng sườn ướp thấm đẫm mật ong mềm ngọt chứ không bị khô xác, tóp mỡ giòn rụm bùi béo. Nước mắm sánh kẹo đúng điệu Sài Gòn!',
        commentEn: 'Juicy, caramelized pork chop with crispy lard bits and sticky savory fish sauce. Tastes just like the best streets in Saigon!',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'banh-xeo-mien-tay',
    nameVi: 'Bánh Xèo Giòn Rụm Tôm Nhảy & Thịt Ba Chỉ',
    nameEn: 'Crispy Mekong Delta Pancake with River Shrimp & Pork Belly',
    category: 'mon_cuon_banh',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Vỏ bánh xèo mỏng tang vàng ươm bột nghệ và thơm béo nước cốt dừa. Nhân đầy đặn tôm đất tươi, thịt ba rọi, đậu xanh và giá đỗ. Ăn kèm mẹt rau rừng Tây Nam Bộ hơn 10 loại lá thơm và nước mắm ớt tỏi chua ngọt.',
    descriptionEn: 'Sizzling turmeric and coconut milk crepe with whole freshwater shrimp, tender pork belly, mung beans, and crispy bean sprouts. Served with wild Mekong herbs and sweet-sour garlic chili dip.',
    region: 'nam',
    spicyLevel: 1,
    isChefSpecial: true,
    calories: 480,
    prepTimeMinutes: 15,
    ingredientsVi: ['Bột gạo cối xay & cốt dừa béo', 'Tôm đất đồng tươi', 'Thịt ba rọi thái mỏng', 'Giá đỗ sống & đậu xanh hấp', 'Mẹt rau rừng Tây Nam Bộ'],
    ingredientsEn: ['Rice flour & coconut cream', 'Fresh river shrimp', 'Pork belly slices', 'Bean sprouts & mung beans', 'Assorted wild herbs basket'],
    tasteProfile: {
      sweet: 3,
      sour: 2,
      salty: 3,
      spicy: 1,
      richness: 4
    },
    rating: 4.8,
    reviewsCount: 89,
    reviews: [
      {
        id: 'rev-5',
        dishId: 'banh-xeo-mien-tay',
        author: 'Võ Thị Mai Lan',
        rating: 5,
        date: '2026-10-08',
        commentVi: 'Bánh giữ được độ giòn rất lâu, cuốn với lá cóc non và đọt xoài chấm mắm ớt cực kỳ bắt vị.',
        commentEn: 'Stayed deliciously crunchy throughout the meal. The pairing with fresh sour mango leaves and dip is heavenly.',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'nem-ran-ha-noi',
    nameVi: 'Nem Rán Hà Nội (Chả Giò Cổ Truyền)',
    nameEn: 'Hanoi Traditional Crispy Fried Spring Rolls (6 pcs)',
    category: 'mon_cuon_banh',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Vỏ bánh đa nem giòn rụm màu cánh gián. Nhân thịt nạc vai băm nhuyễn, tôm nõn, mộc nhĩ nấm hương, miến dong và trứng gà ta. Chấm cùng nước mắm giấm tỏi ớt cà cuống thanh dịu ăn kèm đu đủ bóp chua ngọt.',
    descriptionEn: 'Golden crispy Vietnamese spring rolls filled with minced pork shoulder, minced shrimp, wood ear and shiitake mushrooms, glass noodles, and fresh eggs. Served with light amber fish sauce and pickled green papaya.',
    region: 'bac',
    spicyLevel: 0,
    isBestSeller: true,
    calories: 390,
    prepTimeMinutes: 10,
    ingredientsVi: ['Bánh đa nem làng Chều', 'Thịt nạc vai heo', 'Tôm tươi & trứng gà', 'Mộc nhĩ, nấm hương rừng', 'Miến dong củ dong riềng'],
    ingredientsEn: ['Rice paper sheets', 'Minced pork shoulder', 'Fresh shrimp & farm egg', 'Wood ear & forest shiitake', 'Canna glass vermicelli'],
    tasteProfile: {
      sweet: 2,
      sour: 2,
      salty: 3,
      spicy: 0,
      richness: 3
    },
    rating: 4.9,
    reviewsCount: 130,
    reviews: [
      {
        id: 'rev-6',
        dishId: 'nem-ran-ha-noi',
        author: 'Đặng Thanh Tâm',
        rating: 5,
        date: '2026-10-06',
        commentVi: 'Vỏ nem giòn rụm không bị ngấy mỡ, nhân nem thơm nức mùi nấm hương. Nước chấm pha vừa vặn ăn mãi không chán.',
        commentEn: 'Crispy without feeling greasy at all. Rich aroma of forest mushrooms and perfectly balanced dipping sauce.',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'ca-kho-to-nieu-dat',
    nameVi: 'Cá Bống Kho Tộ Niêu Đất Ba Chỉ Tiêu Sọ',
    nameEn: 'Claypot Caramelized Braised Fish & Pork Belly with Black Pepper',
    category: 'mon_chinh_kho_xao',
    price: 115000,
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Cá tươi bùi chắc thịt kho kẹo lửa liu riu trong niêu đất nung với nước hàng thắng đường thốt nốt, thịt ba chỉ béo ngậy, nước mắm cốt nhĩ và ớt hiểm cay nồng tiêu sọ Phú Quốc. Ăn cùng cơm trắng nóng hổi tuyệt đỉnh.',
    descriptionEn: 'Fresh tender fish slow-braised in an artisanal earthenware pot with palm sugar caramel, rich pork belly, prime fish sauce, and crushed Phu Quoc peppercorns. Sublime paired with steaming hot jasmine rice.',
    region: 'nam',
    spicyLevel: 2,
    isChefSpecial: true,
    calories: 450,
    prepTimeMinutes: 20,
    ingredientsVi: ['Cá đồng tươi thịt ngọt', 'Thịt ba chỉ heo sạch', 'Nước mắm nhĩ cá cơm Phú Quốc', 'Nước màu dừa Bến Tre', 'Tiêu sọ Phú Quốc xay nhuyễn'],
    ingredientsEn: ['Fresh sweet fish cuts', 'Clean pork belly', 'Phu Quoc anchovy fish sauce', 'Ben Tre coconut caramel', 'Cracked white pepper'],
    tasteProfile: {
      sweet: 3,
      sour: 0,
      salty: 5,
      spicy: 3,
      richness: 5
    },
    rating: 4.9,
    reviewsCount: 76,
    reviews: [
      {
        id: 'rev-7',
        dishId: 'ca-kho-to-nieu-dat',
        author: 'Phan Bảo Trâm',
        rating: 5,
        date: '2026-10-09',
        commentVi: 'Nồi cá kho sánh kẹo, mùi thơm nức mũi cả bàn. Chan nước kho cá lên cơm trắng dẻo thì bao nhiêu cơm cũng hết!',
        commentEn: 'The braising reduction is sticky and aromatic. Drizzled over hot jasmine rice, it is purely comforting!',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'canh-chua-ca-loc',
    nameVi: 'Canh Chua Cá Lóc Nam Bộ Bạc Hà & Thơm',
    nameEn: 'Mekong Sour Fish Soup with Tamarind, Elephant Ear Stem & Pineapple',
    category: 'mon_chinh_kho_xao',
    price: 98000,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Vị chua thanh mát lành từ me dốt hòa quyện vị ngọt bùi của khóm (thơm), cà chua, dọc mùng (bạc hà), đậu bắp và giá tươi. Thịt cá lóc đồng trắng phau chấm nước mắm ớt dầm.',
    descriptionEn: 'Refreshing tamarind broth balanced with pineapple sweetness, tomatoes, elephant ear stalks, okra, and bean sprouts. Flaky freshwater fish served with dipping fish sauce and fresh chili.',
    region: 'nam',
    spicyLevel: 1,
    calories: 280,
    prepTimeMinutes: 15,
    ingredientsVi: ['Cá lóc đồng tươi', 'Nước cốt me chín dốt', 'Dọc mùng (bạc hà), đậu bắp', 'Thơm (khóm), cà chua chín mọng', 'Ngò ôm, ngò gai thơm dịu'],
    ingredientsEn: ['Fresh snakehead fish', 'Ripe tamarind puree', 'Elephant ear stems, okra', 'Pineapple & ripe tomatoes', 'Rice paddy herb & culantro'],
    tasteProfile: {
      sweet: 3,
      sour: 4,
      salty: 3,
      spicy: 1,
      richness: 2
    },
    rating: 4.7,
    reviewsCount: 64,
    reviews: [
      {
        id: 'rev-8',
        dishId: 'canh-chua-ca-loc',
        author: 'Lê Quốc Thắng',
        rating: 5,
        date: '2026-10-03',
        commentVi: 'Vị canh chua thanh mát, kết hợp cùng niêu cá kho tộ tạo nên bữa cơm thuần Việt ấm áp tuyệt vời.',
        commentEn: 'Perfect balance of tartness and natural sweetness. Pairing this with the claypot braised fish makes the ultimate Vietnamese meal.',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'goi-cuon-tom-thit',
    nameVi: 'Gỏi Cuốn Tôm Thịt Chấm Sốt Tương Bơ Đậu Phộng',
    nameEn: 'Fresh Spring Rolls with Shrimp, Pork & Rich Peanut Hoison Dip (4 pcs)',
    category: 'mon_cuon_banh',
    price: 68000,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Bánh tráng dẻo cuốn tôm sú luộc đỏ au, thịt ba chỉ thái lát mỏng, bún tươi và các loại rau thơm tươi mát: xà lách, hẹ tươi, húng quế. Chấm sốt tương đen béo ngậy đậu phộng rang giã nhuyễn.',
    descriptionEn: 'Translucent rice paper rolled with plump boiled prawns, tender pork belly slices, rice vermicelli, fresh lettuce, and fragrant herbs. Served with rich peanut hoisin dipping sauce topped with roasted crushed peanuts.',
    region: 'nam',
    spicyLevel: 0,
    isBestSeller: true,
    calories: 240,
    prepTimeMinutes: 8,
    ingredientsVi: ['Tôm sú tươi đỏ au', 'Thịt ba chỉ heo luộc', 'Bánh tráng dẻo phơi sương', 'Rau thơm, hẹ bông, xà lách', 'Tương bơ đậu phộng nhà làm'],
    ingredientsEn: ['Fresh tiger prawns', 'Boiled pork belly slices', 'Rice paper', 'Fresh mint, chives, lettuce', 'Artisanal peanut hoisin dip'],
    tasteProfile: {
      sweet: 3,
      sour: 1,
      salty: 2,
      spicy: 0,
      richness: 3
    },
    rating: 4.8,
    reviewsCount: 92,
    reviews: [
      {
        id: 'rev-9',
        dishId: 'goi-cuon-tom-thit',
        author: 'Hoàng Ánh Nguyệt',
        rating: 5,
        date: '2026-10-11',
        commentVi: 'Tôm rất to và ngọt thịt, tương chấm pha béo bùi đậm đà không bị mặn.',
        commentEn: 'Plump and sweet prawns, the peanut dip is delightfully creamy without being overly salty.',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'pho-chay-nam-thao-moc',
    nameVi: 'Phở Chay Thảo Mộc Nấm Hương Hạt Sen',
    nameEn: 'Monastic Herbal Vegan Pho with Shiitake & Lotus Seeds',
    category: 'mon_chay',
    price: 79000,
    image: 'https://images.unsplash.com/photo-1511910849309-0dcdb878d146?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Nước dùng chay tinh khiết ninh từ củ sen, củ cải trắng, mía lau, lê và hoa hồi. Topping ngập tràn nấm hương rừng, nấm đùi gà áp chảo, đậu hũ non chiên giòn, hạt sen bùi béo và chả lụa chay thanh tịnh.',
    descriptionEn: 'Pure monastic broth simmered with lotus roots, sweet cane, white radishes, pears, and warm spices. Topped with wild forest shiitake, pan-seared king oyster mushrooms, golden tofu puffs, and tender lotus seeds.',
    region: 'toanquoc',
    spicyLevel: 0,
    isVegetarian: true,
    calories: 360,
    prepTimeMinutes: 10,
    ingredientsVi: ['Bánh phở tươi mềm mượt', 'Nấm hương rừng & nấm đùi gà', 'Đậu hũ non chiên vàng', 'Hạt sen Huế hầm mềm', 'Nước dùng củ quả thanh tịnh'],
    ingredientsEn: ['Fresh silk rice noodles', 'Forest shiitake & king oyster mushrooms', 'Crispy silken tofu puffs', 'Simmered Hue lotus seeds', 'Sweet root vegetable broth'],
    tasteProfile: {
      sweet: 3,
      sour: 1,
      salty: 2,
      spicy: 0,
      richness: 2
    },
    rating: 4.9,
    reviewsCount: 58,
    reviews: [
      {
        id: 'rev-10',
        dishId: 'pho-chay-nam-thao-moc',
        author: 'Thích Tuệ Minh',
        rating: 5,
        date: '2026-10-04',
        commentVi: 'Nước dùng ngọt tự nhiên từ rau củ thơm mát lành, nấm tươi giòn sần sật. Món chay nhưng tròn vị vô cùng!',
        commentEn: 'Naturally sweet and gentle broth. The mushrooms are fresh and flavorful. Exceptionally comforting vegan dish!',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'dau-phu-sot-ca-chua',
    nameVi: 'Đậu Hũ Non Sốt Cà Chua Nấm Hương & Hành Hoa',
    nameEn: 'Silken Tofu in Sweet Tomato Glaze with Shiitake & Scallions',
    category: 'mon_chay',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Đậu hũ non chiên vàng giòn rụm bên ngoài nhưng mềm mướt tan chảy bên trong, quyện cùng sốt cà chua chín mọng nấu mềm ngọt, nấm hương rừng thơm nồng và hành hoa xanh mướt.',
    descriptionEn: 'Crispy-skinned silken tofu pillows simmered in rich vine-ripened tomato reduction, infused with wood forest mushrooms and fresh scallions.',
    region: 'bac',
    spicyLevel: 0,
    isVegetarian: true,
    calories: 290,
    prepTimeMinutes: 10,
    ingredientsVi: ['Đậu hũ non làng Mơ', 'Cà chua chín mọng', 'Nấm hương ngâm nở', 'Hành hoa tươi', 'Dầu mè thơm'],
    ingredientsEn: ['Mo village silken tofu', 'Vine-ripened tomatoes', 'Shiitake mushrooms', 'Fresh scallions', 'Sesame oil aroma'],
    tasteProfile: {
      sweet: 3,
      sour: 3,
      salty: 2,
      spicy: 0,
      richness: 2
    },
    rating: 4.7,
    reviewsCount: 42,
    reviews: [
      {
        id: 'rev-11',
        dishId: 'dau-phu-sot-ca-chua',
        author: 'Nguyễn Bích Ngọc',
        rating: 5,
        date: '2026-10-01',
        commentVi: 'Đậu Mơ béo ngậy đúng chuẩn, nước sốt cà chua sền sệt chấm rau sống hoặc chan cơm đều ngon tuyệt.',
        commentEn: 'Silky and rich tofu, savory tomato sauce that goes beautifully with fresh herbs and rice.',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'ca-phe-trung-ha-noi',
    nameVi: 'Cà Phê Trứng Hà Nội Kem Béo Mịn',
    nameEn: 'Hanoi Signature Egg Coffee with Velvet Sabayon Cream',
    category: 'do_uong',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Tuyệt tác đồ uống thủ đô: Lòng đỏ trứng gà ta đánh bông mịn xốp cùng sữa đặc và mật ong thơm ngát, rót nhẹ lên lớp cà phê Robusta pha phin đậm đà thơm đắng nồng nàn. Uống nóng giữ ấm bên chén nước nóng.',
    descriptionEn: 'Hanoi\'s legendary creation: farm egg yolks whipped into a velvety, airy custard with condensed milk and wildflower honey, floating over intense dark Robusta drip coffee. Served warm.',
    region: 'bac',
    spicyLevel: 0,
    isBestSeller: true,
    calories: 220,
    prepTimeMinutes: 6,
    ingredientsVi: ['Cà phê Robusta Đắk Lắk pha phin', 'Lòng đỏ trứng gà ta tuyển chọn', 'Sữa đặc Ông Thọ & mật ong hoa rừng', 'Bột ca cao nguyên chất rắc mặt'],
    ingredientsEn: ['Dak Lak Robusta drip brew', 'Fresh farm egg yolks', 'Condensed milk & wildflower honey', 'Pure cocoa powder dusting'],
    tasteProfile: {
      sweet: 4,
      sour: 0,
      salty: 1,
      spicy: 0,
      richness: 5
    },
    rating: 4.9,
    reviewsCount: 182,
    reviews: [
      {
        id: 'rev-12',
        dishId: 'ca-phe-trung-ha-noi',
        author: 'Trần Gia Hưng',
        rating: 5,
        date: '2026-10-09',
        commentVi: 'Lớp kem trứng bông xốp như mây, thơm ngậy không hề có mùi tanh. Hòa cùng cà phê đắng phía dưới tạo nên bản hòa ca vị giác khó quên.',
        commentEn: 'The egg cream is cloud-like, luscious with zero egginess. Perfect contrast with the bold coffee base below.',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'tra-sen-vang-long-nhan',
    nameVi: 'Trà Sen Vàng Hạt Sen Tây Hồ & Long Nhãn',
    nameEn: 'Golden Lotus Blossom Tea with Tay Ho Lotus Seeds & Longan',
    category: 'do_uong',
    price: 49000,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Trà ô long thượng hạng ướp hương hoa sen Tây Hồ thanh tao, kết hợp cùng hạt sen hầm bùi bùi, long nhãn Hưng Yên ngọt dịu và lớp củ năng giòn mát lành giải nhiệt.',
    descriptionEn: 'Premium oolong tea scented with West Lake lotus blossoms, crowned with tender simmered lotus seeds, sweet Hung Yen longan, and crunchy water chestnuts.',
    region: 'bac',
    spicyLevel: 0,
    calories: 140,
    prepTimeMinutes: 5,
    ingredientsVi: ['Trà ô long Tây Hồ ướp sen', 'Hạt sen bùi hầm đường phèn', 'Long nhãn Hưng Yên', 'Củ năng tươi giòn'],
    ingredientsEn: ['Lotus-scented oolong tea', 'Sweetened lotus seeds', 'Dried longan fruit', 'Water chestnuts'],
    tasteProfile: {
      sweet: 3,
      sour: 0,
      salty: 0,
      spicy: 0,
      richness: 2
    },
    rating: 4.8,
    reviewsCount: 77,
    reviews: [
      {
        id: 'rev-13',
        dishId: 'tra-sen-vang-long-nhan',
        author: 'Vũ Thảo Trang',
        rating: 5,
        date: '2026-10-08',
        commentVi: 'Hương sen dịu dàng quý phái, hạt sen mềm bở tan trong miệng, uống ngụm trà thấy nhẹ nhõm cả người.',
        commentEn: 'Noble lotus aroma, the seeds are delicately tender and melt in your mouth. Incredibly soothing.',
        verifiedOrder: true
      }
    ]
  },
  {
    id: 'che-ba-mau-cot-dua',
    nameVi: 'Chè Ba Màu Cốt Dừa Thơm Béo Bến Tre',
    nameEn: 'Traditional Three-Color Sweet Dessert with Rich Coconut Cream',
    category: 'trang_mieng_che',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=80',
    descriptionVi: 'Món tráng miệng rực rỡ sắc màu với ba tầng: đậu đỏ ninh nhừ bùi bở, đậu xanh tán nhuyễn mịn béo, thạch lá dứa xanh ngọc giòn thanh mát. Rưới nước cốt dừa tươi Bến Tre và đá bào mát lạnh.',
    descriptionEn: 'Vibrant Vietnamese sweet soup layered with simmered red kidney beans, sweet mashed mung bean paste, and fragrant green pandan jelly ribbons. Topped with rich Ben Tre coconut cream and crushed ice.',
    region: 'nam',
    spicyLevel: 0,
    isBestSeller: true,
    calories: 290,
    prepTimeMinutes: 5,
    ingredientsVi: ['Đậu đỏ ninh mềm', 'Đậu xanh đãi vỏ tán mịn', 'Thạch sương sa lá dứa giòn', 'Nước cốt dừa Bến Tre thắng béo', 'Đá tuyết mát lạnh'],
    ingredientsEn: ['Slow-cooked red beans', 'Smooth sweet mung bean puree', 'Pandan jelly strips', 'Rich coconut milk drizzle', 'Crushed ice'],
    tasteProfile: {
      sweet: 4,
      sour: 0,
      salty: 1,
      spicy: 0,
      richness: 4
    },
    rating: 4.9,
    reviewsCount: 115,
    reviews: [
      {
        id: 'rev-14',
        dishId: 'che-ba-mau-cot-dua',
        author: 'Đỗ Trọng Nghĩa',
        rating: 5,
        date: '2026-10-06',
        commentVi: 'Cốt dừa béo ngậy thơm nức, đậu xanh mịn như nhung không hề quá ngọt. Tráng miệng hoàn hảo sau bữa ăn!',
        commentEn: 'Coconut cream is lush and fragrant, silky mung bean paste is perfectly sweet. The ultimate dessert finish!',
        verifiedOrder: true
      }
    ]
  }
];
