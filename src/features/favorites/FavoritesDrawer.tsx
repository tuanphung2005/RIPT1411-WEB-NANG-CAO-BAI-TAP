import React, { useEffect } from 'react';
import { X, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { useFavoritesStore } from './favoritesStore';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../cart/cartSlice';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded?: (title: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  onProductAdded,
}) => {
  const dispatch = useAppDispatch();
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

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

  if (!isOpen) return null;

  const handleAddToCart = (product: (typeof favorites)[0]) => {
    dispatch(addToCart(product));
    if (onProductAdded) {
      onProductAdded(product.title);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc muốn xoá toàn bộ danh sách yêu thích?')) {
      clearFavorites();
    }
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

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
            <h2>Sản phẩm yêu thích</h2>
            <span className="cart-count-pill">{favorites.length} món</span>
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
          {favorites.length === 0 ? (
            <div className="empty-cart-view">
              <Heart size={44} className="empty-heart-icon" />
              <p>Bạn chưa thêm sản phẩm nào vào mục yêu thích.</p>
              <button
                type="button"
                className="btn-continue-shopping"
                onClick={onClose}
              >
                Khám phá sản phẩm
              </button>
            </div>
          ) : (
            <div className="favorites-items-list">
              {favorites.map((item) => (
                <div key={item.id} className="favorite-item-card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="favorite-item-img"
                  />
                  <div className="favorite-item-details">
                    <span className="favorite-item-category">{item.category}</span>
                    <h4 className="favorite-item-title">{item.title}</h4>
                    <span className="favorite-item-price">
                      {formatCurrency(item.price)}
                    </span>

                    <div className="favorite-item-actions">
                      <button
                        type="button"
                        className="btn-fav-add-cart"
                        onClick={() => handleAddToCart(item)}
                        title="Thêm vào giỏ hàng"
                      >
                        <ShoppingBag size={14} />
                        <span>Thêm vào giỏ</span>
                      </button>

                      <button
                        type="button"
                        className="btn-fav-remove"
                        onClick={() => removeFavorite(item.id)}
                        title="Xoá khỏi danh sách yêu thích"
                        aria-label="Xoá khỏi danh sách yêu thích"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {favorites.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="footer-actions">
              <button
                type="button"
                className="btn-clear-cart"
                onClick={handleClearAll}
              >
                <Trash2 size={16} />
                <span>Xoá tất cả</span>
              </button>
              <button
                type="button"
                className="btn-checkout"
                onClick={onClose}
              >
                <span>Tiếp tục xem</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
