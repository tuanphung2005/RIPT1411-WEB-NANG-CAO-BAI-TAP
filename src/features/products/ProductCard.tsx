import React from 'react';
import { ShoppingBag, Star, Check } from 'lucide-react';
import type { Product } from './types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, selectCartItemById } from '../cart/cartSlice';

interface ProductCardProps {
  product: Product;
  onAdded?: (productTitle: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdded }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => selectCartItemById(state, product.id));

  const currentInCart = cartItem?.quantity ?? 0;
  const isOutOfStock = product.stock <= 0;
  const isMaxInCart = currentInCart >= product.stock;

  const handleAddToCart = () => {
    if (isOutOfStock || isMaxInCart) return;
    dispatch(addToCart(product));
    if (onAdded) {
      onAdded(product.title);
    }
  };

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <div className="product-meta-top">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <Star className="star-icon" size={13} fill="currentColor" />
            <span>{product.rating.rate.toFixed(1)}</span>
            <span className="rating-count">({product.rating.count})</span>
          </div>
        </div>

        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>

        <p className="product-desc" title={product.description}>
          {product.description}
        </p>

        <div className="product-meta-bottom">
          <span className="product-price">{formattedPrice}</span>
          <span className="product-stock">
            Còn lại: {product.stock - currentInCart}
          </span>
        </div>

        <button
          type="button"
          className={`btn-add-cart ${isMaxInCart ? 'btn-disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock || isMaxInCart}
        >
          {isMaxInCart ? (
            <>
              <Check size={16} />
              <span>Đạt giới hạn kho</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>{currentInCart > 0 ? `Trong giỏ: ${currentInCart} (+)` : 'Thêm vào giỏ'}</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
