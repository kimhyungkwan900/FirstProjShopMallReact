export const API_BASE_URL = 'http://localhost:8080/api';

export const DEFAULT_PAGE_SIZE = 10;

export const SORT_OPTIONS = [
  { value: 'id', label: '기본순' },
  { value: 'price', label: '가격순' },
  { value: 'viewCount', label: '인기순' }
];

export const SELL_STATUS = {
  SELLING: '판매중',
  SOLD_OUT: '품절'
};