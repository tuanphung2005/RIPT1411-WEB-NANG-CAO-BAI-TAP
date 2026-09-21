import type { Product } from '../features/products/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Bàn phím cơ không dây NuPhy Air75 V2',
    price: 2850000,
    description: 'Bàn phím cơ low-profile không dây cao cấp, hỗ trợ QMK/VIA, switch Cowberry êm ái, kết nối 2.4GHz/Bluetooth 5.1/Type-C.',
    category: 'Bàn phím',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.8, count: 120 },
    stock: 15,
  },
  {
    id: 2,
    title: 'Chuột không dây công thái học Logitech MX Master 3S',
    price: 2190000,
    description: 'Cảm biến 8K DPI trên mọi bề mặt, con lăn MagSpeed siêu nhanh, switch Quiet Clicks giảm 90% tiếng ồn.',
    category: 'Chuột',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.9, count: 350 },
    stock: 22,
  },
  {
    id: 3,
    title: 'Tai nghe chống ồn Sony WH-1000XM5',
    price: 7490000,
    description: 'Công nghệ chống ồn đỉnh cao Auto NC Optimizer, 8 microphone, driver 30mm tinh chỉnh âm thanh chi tiết, pin 30 giờ.',
    category: 'Tai nghe',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    rating: { rate: 4.7, count: 210 },
    stock: 8,
  },
];
