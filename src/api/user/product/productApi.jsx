import axios from 'axios';

// 전체 상품 목록을 페이지네이션, 정렬 기준으로 조회하는 함수
export const fetchProducts = async (page = 0, size = 10, sort = 'id', direction = 'desc') => {
  // /api/products GET 요청, query string에 page, size, sort, direction을 포함
  const response = await axios.get('/api/products', {
    params: {
      page,       // 페이지 번호 (기본값 0)
      size,       // 한 페이지에 표시할 상품 수 (기본값 10)
      sort,       // 정렬 기준 필드 (기본값 id)
      direction   // 정렬 방향 (기본값 desc)
    }
  });
  // 서버로부터 받은 응답의 data(실제 결과값)를 반환
  return response.data;
};

// 특정 상품의 상세 정보를 조회하는 함수
export const fetchProductDetail = async (id) => {
  // /api/products/{id} GET 요청
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};

// 검색 키워드를 기반으로 상품을 조회하는 함수
export const fetchSearchResults = async (keyword, page = 0) => {
  // /api/products/search GET 요청, keyword와 page 쿼리 파라미터 포함
  const response = await axios.get('/api/products/search', {
    params: { keyword, page }
  });
  return response.data;
};

// 필터 조건에 따라 상품을 조회하는 함수 (카테고리, 브랜드, 가격 범위, 키워드 등)
export const fetchFilteredProducts = async ({
  page = 0,
  size = 10,
  sort = 'id',
  direction = 'desc',
  categoryId,
  brandId,
  minPrice,
  maxPrice,
  keyword,
  includeChildren
}) => {
  // 기본 파라미터 설정
  const params = { page, size, sort, direction };

  // 조건이 주어졌을 경우에만 파라미터에 포함시킴
  if (categoryId) params.categoryId = categoryId;             // 카테고리 ID
  if (brandId) params.brandId = brandId;                      // 브랜드 ID
  if (minPrice) params.minPrice = minPrice;                   // 최소 가격
  if (maxPrice) params.maxPrice = maxPrice;                   // 최대 가격
  if (keyword) params.keyword = keyword;                      // 키워드
  if (includeChildren) params.includeChildren = true;         // 하위 카테고리 포함 여부

  // /api/products/filter GET 요청
  const response = await axios.get('/api/products/filter', { params });
  return response.data;
};

// 추천 상품을 조회하는 함수 (특정 상품 기준)
export const fetchRecommendedProducts = async (productId) => {
  // /api/products/recommend GET 요청, productId를 쿼리로 전달
  const response = await axios.get('/api/products/recommend', {
    params: { productId }
  });
  return response.data;
};

// 인기 상품(조회수 기준)을 조회하는 함수
export const fetchPopularProducts = async (page = 0, size = 10) => {
  // /api/products/popular GET 요청
  const response = await axios.get('/api/products/popular', {
    params: { page, size }
  });
  return response.data;
};

// 최신 상품을 조회하는 함수
export const fetchRecentProducts = async (page = 0, size = 10) => {
  // /api/products/recent GET 요청
  const response = await axios.get('/api/products/recent', {
    params: { page, size }
  });
  return response.data;
};

// 특정 카테고리에 속한 상품들을 조회하는 함수
export const fetchProductsByCategory = async (categoryId, page = 0, size = 10, sort = 'id', direction = 'desc') => {
  // /api/products/category/{categoryId} GET 요청
  const response = await axios.get(`/api/products/category/${categoryId}`, {
    params: { page, size, sort, direction }
  });
  return response.data;
};

// 특정 브랜드에 속한 상품들을 조회하는 함수
export const fetchProductsByBrand = async (brandId, page = 0, size = 10) => {
  // /api/products/brand/{brandId} GET 요청
  const response = await axios.get(`/api/products/brand/${brandId}`, {
    params: { page, size }
  });
  return response.data;
};
