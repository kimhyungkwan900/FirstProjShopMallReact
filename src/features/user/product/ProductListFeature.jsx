import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { fetchFilteredProducts } from '../../../api/user/product/productApi';

import ProductCard from '../../../component/user/product/ProductCard';
import Pagination from '../../../component/user/product/Pagination';
import SortOptions from '../../../component/user/product/SortOptions';
import SearchBar from '../../../component/user/product/SearchBar';
import Footer from '../../../component/common/Footer';

const ProductListFeature = () => {
  const { categoryId, brandId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [size] = useState(6);
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('desc');

  // 페이지, 검색어 쿼리 읽기
  const page = Number(searchParams.get('page')) || 0;
  const keyword = searchParams.get('keyword') || '';

  const [filters, setFilters] = useState({});

  // 필터 설정
  useEffect(() => {
    const newFilters = {};
    if (categoryId) newFilters.categoryId = categoryId;
    if (brandId) newFilters.brandId = brandId;
    if (keyword) newFilters.keyword = keyword;

    setFilters(newFilters);
  }, [categoryId, brandId, keyword]);

  // 상품 데이터 로드
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchFilteredProducts({
        page,
        size,
        sort,
        direction,
        ...filters,
      });
      setProducts(data);
    };
    loadProducts();
  }, [page, size, sort, direction, filters]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      {/* 타이틀 */}
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        🛍️ 전체 상품 목록
      </h2>

      {/* 검색/정렬 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <SearchBar />
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
          products.content.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-lg">상품이 없습니다 😥</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-10 mb-20">
        <Pagination
          page={products.number || 0}
          totalPages={products.totalPages || 0}
          onPageChange={handlePageChange}
        />
      </div>

      <Footer />
    </div>
  );
};

export default ProductListFeature;
