import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductList } from './features/products/ProductList';
import { CartDrawer } from './features/cart/CartDrawer';
import { FavoritesDrawer } from './features/favorites/FavoritesDrawer';
import { Toast, type ToastMessage } from './components/Toast';
import './index.css';

export function App() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const handleProductAdded = (title: string) => {
    setToast({
      id: Date.now().toString(),
      type: 'success',
      title: 'Đã thêm vào giỏ hàng',
      description: title,
    });
  };

  const handleFavoriteToggle = (title: string, isFav: boolean) => {
    setToast({
      id: Date.now().toString(),
      type: isFav ? 'success' : 'info',
      title: isFav ? 'Đã thêm vào yêu thích' : 'Đã bỏ khỏi yêu thích',
      description: title,
    });
  };

  const handleCheckoutSuccess = () => {
    setToast({
      id: Date.now().toString(),
      type: 'success',
      title: 'Đặt hàng thành công',
      description: 'Đơn hàng đã được ghi nhận vào hệ thống.',
    });
  };

  return (
    <div className="app-layout">
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <main className="main-content">
        <ProductList
          onProductAdded={handleProductAdded}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onProductAdded={handleProductAdded}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
