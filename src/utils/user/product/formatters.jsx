export const formatPrice = (price) => {
  return price.toLocaleString() + '원';
};

export const truncateText = (text, maxLength = 50) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const getMainImageUrl = (images = []) => {
  const mainImage = images.find(img => img.repImg);
  return mainImage ? mainImage.imgUrl : '/images/placeholder.png';
};
