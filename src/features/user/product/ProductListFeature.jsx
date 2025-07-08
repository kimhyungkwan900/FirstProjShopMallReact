import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { fetchFilteredProducts } from '../../../api/user/product/productApi';

import ProductCard from '../../../component/user/product/ProductCard';
import Pagination from '../../../component/user/product/Pagination';
import SortOptions from '../../../component/user/product/SortOptions';
import SearchBar from '../../../component/user/product/SearchBar';
import Footer from '../../../component/common/Footer';
import MainHeader from '../../common/Header/MainHeader';

const ProductListFeature = () => {
  const { categoryId, brandId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [size] = useState(6);
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('desc');

  const page = Number(searchParams.get('page')) || 0;
  const keyword = searchParams.get('keyword') || '';

  const [filters, setFilters] = useState({});

  useEffect(() => {
    const newFilters = {};
    if (keyword) {
      newFilters.keyword = keyword;
    } else {
      if (categoryId) newFilters.categoryId = categoryId;
      if (brandId) newFilters.brandId = brandId;
    }
    setFilters(newFilters);
  }, [categoryId, brandId, keyword]);

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

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* ✅ 전체 헤더 */}
      <MainHeader />

      {/* ✅ 본문 내용 */}
      <main className="flex-grow max-w-screen-xl mx-auto px-4 py-12">
        {/* 타이틀 */}
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          🛍️ 전체 상품 목록
        </h2>

        {/* 검색 & 정렬 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <SearchBar />
          <SortOptions
            sort={sort}
            direction={direction}
            setSort={setSort}
            setDirection={setDirection}
          />
        </div>

        {/* 상품 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.content?.length > 0 ? (
            products.content.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">상품이 없습니다 😥</p>
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        <div className="mt-12 mb-20">
          <Pagination
            page={products.number || 0}
            totalPages={products.totalPages || 0}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      {/* ✅ 푸터 */}
      <Footer />
    </div>
  );
};

export default ProductListFeature;
