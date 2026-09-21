import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '../products/types';

export interface FavoritesState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

/**
 * Zustand store riêng quản lý danh sách sản phẩm yêu thích (favoritesStore)
 * Tự động đồng bộ hóa dữ liệu với localStorage qua persist middleware
 */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product: Product) => {
        const { favorites } = get();
        const exists = favorites.some((item) => item.id === product.id);

        if (exists) {
          set({
            favorites: favorites.filter((item) => item.id !== product.id),
          });
        } else {
          set({
            favorites: [...favorites, product],
          });
        }
      },

      removeFavorite: (id: number) => {
        set({
          favorites: get().favorites.filter((item) => item.id !== id),
        });
      },

      isFavorite: (id: number) => {
        return get().favorites.some((item) => item.id === id);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'protech-favorites-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);

// Export alias favoritesStore theo đúng yêu cầu đề bài
export const favoritesStore = useFavoritesStore;
