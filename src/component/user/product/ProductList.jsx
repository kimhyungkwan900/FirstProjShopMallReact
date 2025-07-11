import React from 'react'; // React를 불러와 JSX 문법을 사용 가능하게 함
import ProductCard from './ProductCard'; // 개별 상품을 표시하는 ProductCard 컴포넌트를 import

// ProductList 컴포넌트 정의 (props로 products 배열을 받음)
const ProductList = ({ products }) => (
  <div className="product-list"> {/* 상품 목록을 담는 div, 스타일링을 위한 클래스 */}
    {products.map(product => ( // products 배열을 순회하며 각 상품에 대해
      <ProductCard key={product.id} product={product} /> // ProductCard 컴포넌트를 렌더링하고 상품 정보를 prop으로 전달
    ))}
  </div>
);

export default ProductList; // 외부에서 사용할 수 있도록 ProductList 컴포넌트를 export
