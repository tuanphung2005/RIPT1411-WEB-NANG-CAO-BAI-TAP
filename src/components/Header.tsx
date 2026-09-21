import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import { selectCartTotalQuantity } from '../features/cart/cartSlice';

interface HeaderProps {
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const totalQuantity = useAppSelector(selectCartTotalQuantity);

  return (
    <header className="site-header">
      <div className="header-container">

        <div className="header-actions">
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
