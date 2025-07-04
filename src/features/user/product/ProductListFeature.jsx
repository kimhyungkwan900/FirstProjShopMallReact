import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFilteredProducts } from '../../../api/user/product/productApi';
import ProductCard from '../../../component/user/product/ProductCard';
import Pagination from '../../../component/user/product/Pagination';
import SortOptions from '../../../component/user/product/SortOptions';
import SearchBar from '../../../component/user/product/SearchBar';

const ProductListFeature = () => {
  const { categoryId, brandId } = useParams();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('desc');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const newFilters = {};
    if (categoryId) newFilters.categoryId = categoryId;
    if (brandId) newFilters.brandId = brandId;
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(0); // 카테고리/브랜드 변경 시 첫 페이지로
  }, [categoryId, brandId]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchFilteredProducts({ page, size, sort, direction, ...filters });
      setProducts(data);
    };
    loadProducts();
  }, [page, size, sort, direction, filters]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {/* 타이틀 */}
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        🛍️ 전체 상품 목록
      </h2>

      {/* 검색/정렬 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <SearchBar setFilters={setFilters} setPage={setPage} />
        <SortOptions
          sort={sort}
          direction={direction}
          setSort={setSort}
          setDirection={setDirection}
        />
      </div>

      {/* 상품 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.content?.length > 0 ? (
          products.content.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-lg">상품이 없습니다 😥</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-10">
        <Pagination
          page={products.number || 0}
          totalPages={products.totalPages || 0}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default ProductListFeature;
