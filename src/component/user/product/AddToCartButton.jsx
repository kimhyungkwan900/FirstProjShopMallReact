import React from 'react';

const AddToCartButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn-cart">
      장바구니에 담기
    </button>
  );
};

export default AddToCartButton;