import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import { selectCartTotalQuantity } from '../features/cart/cartSlice';
import { useFavoritesStore } from '../features/favorites/favoritesStore';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart, onOpenFavorites }) => {
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const favoriteCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <header className="site-header">
      <div className="header-container">
        <span className="brand-title">store</span>

        <div className="header-actions">
          <button
            type="button"
            className="favorites-trigger-btn"
            onClick={onOpenFavorites}
            aria-label="Mở danh sách yêu thích"
          >
            <Heart
              size={18}
              fill={favoriteCount > 0 ? '#ef4444' : 'none'}
              stroke={favoriteCount > 0 ? '#ef4444' : 'currentColor'}
            />
            <span>Yêu thích</span>
            {favoriteCount > 0 && (
              <span className="favorites-badge-count">{favoriteCount}</span>
            )}
          </button>

          <button
            type="button"
            className="cart-trigger-btn"
            onClick={onOpenCart}
            aria-label="Mở giỏ hàng"
          >
            <ShoppingCart size={18} />
            <span>Giỏ hàng</span>
            {totalQuantity > 0 && (
              <span className="cart-badge-count">{totalQuantity}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
