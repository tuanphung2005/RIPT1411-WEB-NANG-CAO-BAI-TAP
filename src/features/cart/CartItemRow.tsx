import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from './types';
import { useAppDispatch } from '../../app/hooks';
import { updateQuantity, removeFromCart } from './cartSlice';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleDecrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    dispatch(updateQuantity({ id: item.id, quantity: val }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  return (
    <div className="cart-item-row">
      <img src={item.image} alt={item.title} className="cart-item-image" />

      <div className="cart-item-details">
        <h4 className="cart-item-title" title={item.title}>
          {item.title}
        </h4>
        <div className="cart-item-unit-price">{formatCurrency(item.price)}</div>

        <div className="cart-item-actions">
          <div className="quantity-counter">
            <button
              type="button"
              className="qty-btn"
              onClick={handleDecrease}
              aria-label="Giảm số lượng"
            >
              <Minus size={12} />
            </button>
            <input
              type="number"
              min="1"
              max={item.stock}
              value={item.quantity}
              onChange={handleInputChange}
              className="qty-input"
              aria-label="Số lượng sản phẩm"
            />
            <button
              type="button"
              className="qty-btn"
              onClick={handleIncrease}
              disabled={item.quantity >= item.stock}
              aria-label="Tăng số lượng"
            >
              <Plus size={12} />
            </button>
          </div>

          <button
            type="button"
            className="btn-remove-item"
            onClick={handleRemove}
            aria-label="Xoá sản phẩm khỏi giỏ"
            title="Xoá"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="cart-item-subtotal">
        <span className="subtotal-value">{formatCurrency(item.price * item.quantity)}</span>
      </div>
    </div>
  );
};
