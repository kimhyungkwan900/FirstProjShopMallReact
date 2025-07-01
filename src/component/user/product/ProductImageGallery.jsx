import React from 'react';

const ProductImageGallery = ({ images }) => {
  return (
    <div className="image-gallery">
      {images.map(img => (
        <img key={img.id} src={img.imgUrl} alt={img.oriImgName} className="gallery-image" />
      ))}
    </div>
  );
};

export default ProductImageGallery;