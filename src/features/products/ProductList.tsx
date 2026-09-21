import React, { useState, useMemo } from 'react';
import { Search, RotateCw, AlertCircle, Zap } from 'lucide-react';
import { useGetProductsQuery } from './productsApi';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  onProductAdded?: (title: string) => void;
  onFavoriteToggle?: (title: string, isFav: boolean) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  onProductAdded,
  onFavoriteToggle,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  // Quản lý dữ liệu hoàn toàn qua RTK Query
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetProductsQuery({ delayMs: 400 });

  const isBusy = isLoading || isFetching;

  const errorMessage = useMemo(() => {
    if (!error) return 'Không thể kết nối đến máy chủ.';
    if ('data' in error && typeof error.data === 'object' && error.data !== null) {
      const dataObj = error.data as { message?: string };
      return dataObj.message || 'Lỗi tải dữ liệu từ RTK Query.';
    }
    return 'Lỗi kết nối từ máy chủ (RTK Query).';
  }, [error]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === 'Tất cả' || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return ['Tất cả', ...Array.from(set)];
  }, [products]);

  const handleRetry = () => {
    refetch();
  };

  return (
    <section className="products-section">
      {/* Utility Toolbar */}
      <div className="utility-toolbar">

        <div className="toolbar-right">
          <button
            type="button"
            className="btn-refresh"
            onClick={handleRetry}
            disabled={isBusy}
          >
            <RotateCw size={14} className={isBusy ? 'icon-spin' : ''} />
            <span>Tải lại</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filters-bar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc mô tả sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Xoá tìm kiếm"
            >
              ×
            </button>
          )}
        </div>

        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* State: Error */}
      {isError && (
        <div className="alert-card alert-error">
          <AlertCircle size={20} className="alert-icon" />
          <div className="alert-content">
            <h4>Lỗi nạp dữ liệu</h4>
            <p>{errorMessage}</p>
          </div>
          <button
            type="button"
            className="btn-retry"
            onClick={handleRetry}
          >
            Thử lại
          </button>
        </div>
      )}

      {/* State: Loading (First load) */}
      {isBusy && products.length === 0 && (
        <div className="products-grid">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="skeleton-card">
              <div className="skeleton-image" />
              <div className="skeleton-row" style={{ width: '40%' }} />
              <div className="skeleton-row" style={{ width: '85%', height: '18px' }} />
              <div className="skeleton-row" style={{ width: '60%' }} />
              <div className="skeleton-btn" />
            </div>
          ))}
        </div>
      )}

      {/* State: Success */}
      {(!isBusy || products.length > 0) && !isError && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>Không có sản phẩm nào phù hợp với bộ lọc hiện tại.</p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Tất cả');
                }}
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdded={onProductAdded}
                  onFavoriteToggle={onFavoriteToggle}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};
