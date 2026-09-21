import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../products/types';
import type { CartItem, CartState, UpdateQuantityPayload } from './types';
import type { RootState } from '../../app/store';

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Thêm sản phẩm vào giỏ hàng
     * Nếu sản phẩm đã có trong giỏ thì tăng số lượng lên 1 (không vượt quá tồn kho)
     */
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
          stock: product.stock,
        });
      }
    },

    /**
     * Xoá sản phẩm khỏi giỏ hàng theo id
     */
    removeFromCart: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
    },

    /**
     * Cập nhật số lượng sản phẩm trong giỏ hàng
     * Nếu quantity <= 0 thì tự động xoá khỏi giỏ
     * Nếu quantity > stock thì giới hạn ở mức stock
     */
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex === -1) return;

      if (quantity <= 0) {
        state.items.splice(itemIndex, 1);
      } else {
        const item = state.items[itemIndex];
        if (item) {
          item.quantity = Math.min(quantity, item.stock);
        }
      }
    },

    /**
     * Xoá sạch toàn bộ sản phẩm trong giỏ hàng
     */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

export const selectCartTotalQuantity = (state: RootState): number =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: RootState): number =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartItemById = (
  state: RootState,
  id: number
): CartItem | undefined => state.cart.items.find((item) => item.id === id);

export default cartSlice.reducer;
