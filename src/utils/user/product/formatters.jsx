// 📌 가격을 천 단위로 포맷하고 '원'을 붙이는 함수
export const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) return '가격 없음';
  return price.toLocaleString() + '원';
};

// 📌 긴 문자열을 자르고 '...'을 붙이는 함수 (이미 안전)
export function truncateText(text, maxLength) {
  if (typeof text !== 'string') return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

// 📌 대표 이미지 URL 반환 함수
export const getMainImageUrl = (images = []) => {
  if (!Array.isArray(images)) return '/images/placeholder.png';

  const mainImage = images.find(img => img.repImg);
  return mainImage?.imgUrl || '/images/placeholder.png';
};
