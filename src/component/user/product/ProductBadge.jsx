import React from 'react';

const ProductBadge = ({ status }) => {
  const style = {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#fff',
    backgroundColor: status === 'SELLING' ? 'green' : 'gray',
    position: 'absolute',
    top: '8px',
    left: '8px'
  };

  return <span style={style}>{status === '판매중' ? '판매중' : '품절'}</span>;
};

export default ProductBadge;