import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { fetchFilteredProducts } from '../../../api/user/product/productApi';

import ProductCard from '../../../component/user/product/ProductCard';
import Pagination from '../../../component/user/product/Pagination';
import SortOptions from '../../../component/user/product/SortOptions';
import SearchBar from '../../../component/user/product/SearchBar';
import Footer from '../../../component/common/Footer';
import MainHeader from '../../common/Header/MainHeader';

// 전체 상품 목록을 보여주는 기능 컴포넌트
const ProductListFeature = () => {
  const { categoryId, brandId } = useParams(); // URL 파라미터 추출
  const [searchParams] = useSearchParams();    // 쿼리스트링 추출
  const navigate = useNavigate();              // 페이지 이동 함수

  // 상태 정의
  const [products, setProducts] = useState([]);    // 상품 목록
  const [size] = useState(6);                      // 페이지당 상품 수
  const [sort, setSort] = useState('name');        // 정렬 기준
  const [direction, setDirection] = useState('desc'); // 정렬 방향

  // 현재 페이지 번호 및 검색어
  const page = Number(searchParams.get('page')) || 0;
  const keyword = searchParams.get('keyword') || '';

  const [filters, setFilters] = useState({}); // 필터 조건 객체

  // 🔄 카테고리, 브랜드, 검색어가 바뀔 때 필터 조건 구성
  useEffect(() => {
    const newFilters = {};
    if (keyword) {
      newFilters.keyword = keyword; // 검색어가 있으면 우선 적용
    } else {
      if (categoryId) newFilters.categoryId = categoryId; // 카테고리 필터
      if (brandId) newFilters.brandId = brandId;         // 브랜드 필터
    }
    setFilters(newFilters); // 필터 상태 업데이트
  }, [categoryId, brandId, keyword]);

  // 📦 상품 로딩 (필터나 정렬 조건이 바뀔 때마다 실행)
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

  // 페이지 변경 처리 (URL 쿼리 파라미터에 반영)
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage);
    navigate(`?${params.toString()}`); // 현재 URL 경로 + 새 쿼리스트링으로 이동
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* ✅ 상단 공통 헤더 */}
      <MainHeader />

      {/* ✅ 본문 메인 콘텐츠 */}
      <main className="flex-grow max-w-screen-xl mx-auto px-4 py-12">
        {/* 타이틀 */}
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          🛍️ 전체 상품 목록
        </h2>

        {/* 검색창 + 정렬 옵션 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
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
            // 상품이 없을 때 표시
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

      {/* ✅ 공통 푸터 */}
      <Footer />
    </div>
  );
};

export default ProductListFeature;
