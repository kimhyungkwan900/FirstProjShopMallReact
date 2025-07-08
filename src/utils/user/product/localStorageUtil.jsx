const RECENT_KEY = 'recentlyViewedProducts';

// 최근 본 상품 저장 (중복 제거, 최대 10개 유지)
export const saveRecentlyViewedProduct = (product) => {
  const stored = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  const filtered = stored.filter(p => p.id !== product.id);
  const updated = [product, ...filtered].slice(0, 10);
  localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
};

// 최근 본 상품 가져오기
export const getRecentlyViewedProducts = () => {
  return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
};

// 최근 본 상품 초기화
export const clearRecentlyViewedProducts = () => {
  localStorage.removeItem(RECENT_KEY);
};
