import axios from 'axios';

export const fetchProducts = async (page = 0, size = 10, sort = 'id', direction = 'desc') => {
  const response = await axios.get('/api/products', {
    params: {
      page,
      size,
      sort,
      direction
    }
  });
  return response.data;
};

export const fetchProductDetail = async (id) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};

export const fetchSearchResults = async (keyword, page = 0) => {
  const response = await axios.get('/api/products/search', {
    params: { keyword, page }
  });
  return response.data;
};

// import { mockProductList } from '../../../mock/products';
export const fetchFilteredProducts = async ({
  page = 0,
  size = 10,
  sort = 'id',
  direction = 'desc',
  categoryId,
  brandId,
  minPrice,
  maxPrice,
  keyword
}) => {
  const params = { page, size, sort, direction };
  if (categoryId) params.categoryId = categoryId;
  if (brandId) params.brandId = brandId;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;
  if (keyword) params.keyword = keyword;

  const response = await axios.get('/api/products/filter', { params });
  return response.data;

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(mockProductList); // 가짜 응답 반환
  //   }, 300); // 실제 API처럼 지연
  // });
};

export const fetchRecommendedProducts = async (productId) => {
  const response = await axios.get('/api/products/recommend', {
    params: { productId }
  });
  return response.data;
};

export const fetchPopularProducts = async (page = 0, size = 10) => {
  const response = await axios.get('/api/products/popular', {
    params: { page, size }
  });
  return response.data;
};

export const fetchRecentProducts = async (page = 0, size = 10) => {
  const response = await axios.get('/api/products/recent', {
    params: { page, size }
  });
  return response.data;
};

export const fetchProductsByCategory = async (categoryId, page = 0, size = 10, sort = 'id', direction = 'desc') => {
  const response = await axios.get(`/api/products/category/${categoryId}`, {
    params: { page, size, sort, direction }
  });
  return response.data;
};

export const fetchProductsByBrand = async (brandId, page = 0, size = 10) => {
  const response = await axios.get(`/api/products/brand/${brandId}`, {
    params: { page, size }
  });
  return response.data;
};
