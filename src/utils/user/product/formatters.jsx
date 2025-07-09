// 숫자 가격을 천 단위 쉼표와 '원' 단위로 포맷하는 함수
export const formatPrice = (price) => {
  // toLocaleString()을 이용해 천 단위 쉼표 추가, '원' 붙임
  return price.toLocaleString() + '원';
};

// 긴 문자열을 지정된 길이까지만 자르고 '...'을 붙이는 함수
export const truncateText = (text, maxLength = 50) => {
  // 텍스트 길이가 maxLength를 초과하면 자르고 ...을 붙임
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// 상품 이미지 배열에서 대표 이미지의 URL을 반환하는 함수
export const getMainImageUrl = (images = []) => {
  // repImg === true인 첫 번째 이미지를 찾음
  const mainImage = images.find(img => img.repImg);
  // 대표 이미지가 있으면 해당 이미지의 imgUrl 반환, 없으면 기본 이미지 경로 반환
  return mainImage ? mainImage.imgUrl : '/images/placeholder.png';
};
