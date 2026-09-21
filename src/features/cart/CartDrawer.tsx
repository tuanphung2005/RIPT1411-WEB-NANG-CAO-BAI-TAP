import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  clearCart,
} from './cartSlice';
import { CartItemRow } from './CartItemRow';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckoutSuccess?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onCheckoutSuccess,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClearCart = () => {
    if (window.confirm('Xác nhận dọn sạch toàn bộ giỏ hàng?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    dispatch(clearCart());
    if (onCheckoutSuccess) {
      onCheckoutSuccess();
    }
    onClose();
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <aside
        className="cart-drawer-container"
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
      >
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <h2>Giỏ hàng</h2>
            <span className="cart-count-pill">{totalQuantity} món</span>
          </div>
          <button
            type="button"
            className="btn-close-drawer"
            onClick={onClose}
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="empty-cart-view">
              <p>Giỏ hàng hiện chưa có sản phẩm nào.</p>
              <button
                type="button"
                className="btn-continue-shopping"
                onClick={onClose}
              >
                Quay lại danh mục
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="price-summary">
              <div className="summary-row">
                <span>Tạm tính</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="summary-row">
                <span>Vận chuyển</span>
                <span className="text-free-ship">Miễn phí</span>
              </div>
              <div className="summary-row total-row">
                <span>Tổng cộng</span>
                <span className="total-amount">{formatCurrency(totalPrice)}</span>
              </div>
            </div>

            <div className="footer-actions">
              <button
                type="button"
                className="btn-clear-cart"
                onClick={handleClearCart}
              >
                <Trash2 size={14} />
                <span>Xoá</span>
              </button>

              <button
                type="button"
                className="btn-checkout"
                onClick={handleCheckout}
              >
                <span>Thanh toán</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
