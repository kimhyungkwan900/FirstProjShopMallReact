import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchFilteredProducts } from '../../../api/user/product/productApi';

import ProductCard from '../../../component/user/product/ProductCard';
import Pagination from '../../../component/user/product/Pagination';
import SortOptions from '../../../component/user/product/SortOptions';
import SearchBar from '../../../component/user/product/SearchBar';
import Footer from '../../../component/common/Footer';

// 필터 기반 상품 목록을 보여주는 주요 기능 컴포넌트
const FilteredProductListFeature = ({ filterType }) => {
  // URL에서 카테고리 ID 또는 브랜드 ID 추출
  const { categoryId, brandId } = useParams();
  // 쿼리스트링(예: ?keyword=셔츠&page=0 등) 추출
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || ''; // 검색어가 없으면 빈 문자열

  // 상태 정의
  const [products, setProducts] = useState([]);      // 상품 목록
  const [page, setPage] = useState(0);               // 현재 페이지
  const [size] = useState(6);                        // 페이지당 상품 수
  const [sort, setSort] = useState('id');            // 정렬 기준
  const [direction, setDirection] = useState('desc');// 정렬 방향
  const [filters, setFilters] = useState({});        // 필터 조건 모음 객체

  // 🔄 필터 조건이 바뀔 때마다 filters 상태 업데이트
  useEffect(() => {
    const updated = {};

    if (filterType === 'category' && categoryId) {
      updated.categoryId = Number(categoryId);    // 카테고리 ID 설정
      updated.includeChildren = true;             // 하위 카테고리 포함
    } else if (filterType === 'brand' && brandId) {
      updated.brandId = brandId;                  // 브랜드 ID 설정
    }

    if (keyword) {
      updated.keyword = keyword;                  // 검색어 포함 시 추가
    }

    setFilters(updated);  // 필터 적용
    setPage(0);           // 필터가 변경되면 페이지를 첫 페이지로 초기화
  }, [filterType, categoryId, brandId, keyword]);

  // 📦 상품 목록 로딩 (필터, 페이지, 정렬 기준 변경 시마다 실행)
  useEffect(() => {
    const loadProducts = async () => {
      if (Object.keys(filters).length > 0) {
        const data = await fetchFilteredProducts({
          page,
          size,
          sort,
          direction,
          ...filters,
        });
        setProducts(data);
      }
    };
    loadProducts();
  }, [page, size, sort, direction, filters]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* 페이지 제목 */}
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
        {filterType === 'category' ? '' : ''}
      </h2>

      {/* 검색바 + 정렬 옵션 (상단 필터 UI) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <SearchBar />
        <SortOptions
          sort={sort}
          direction={direction}
          setSort={setSort}
          setDirection={setDirection}
        />
      </div>

      {/* 상품 목록 출력 영역 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.content?.length > 0 ? (
          products.content.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          // 상품이 없는 경우 안내 메시지
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-lg">해당 조건에 맞는 상품이 없습니다 😥</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-10 mb-20">
        <Pagination
          page={products.number || 0}
          totalPages={products.totalPages || 0}
          onPageChange={setPage}
        />
      </div>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
};

export default FilteredProductListFeature;
