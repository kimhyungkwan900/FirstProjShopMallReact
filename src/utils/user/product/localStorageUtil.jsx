// 최근 본 상품 저장 (중복 제거, 최대 10개 유지)
export const saveRecentlyViewedProduct = (product) => {
    const key = 'recentlyViewedProducts';
    const stored = JSON.parse(localStorage.getItem(key)) || [];
  
    // 이미 본 상품이면 제거
    const filtered = stored.filter(p => p.id !== product.id);
  
    // 맨 앞에 추가 (최근 본 순)
    const updated = [product, ...filtered].slice(0, 10);
  
    localStorage.setItem(key, JSON.stringify(updated));
  };
  
  // 최근 본 상품 목록 가져오기
  export const getRecentlyViewedProducts = () => {
    return JSON.parse(localStorage.getItem('recentlyViewedProducts')) || [];
  };
  