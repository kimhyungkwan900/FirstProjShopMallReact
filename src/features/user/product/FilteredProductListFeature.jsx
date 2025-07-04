import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFilteredProducts } from '../../../api/user/product/productApi';
import ProductCard from '../../../component/user/product/ProductCard';
import Pagination from '../../../component/user/product/Pagination';
import SortOptions from '../../../component/user/product/SortOptions';
import SearchBar from '../../../component/user/product/SearchBar';

const FilteredProductListFeature = ({ filterType }) => {
  const { categoryId, brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('desc');
  const [filters, setFilters] = useState({});

  // ✅ 카테고리나 브랜드가 변경될 때 필터 초기화
  useEffect(() => {
  setFilters((prev) => {
    const updated = { ...prev };
    if (filterType === 'category' && categoryId) {
      updated.categoryId = Number(categoryId);
      delete updated.brandId; // 브랜드 필터 제거
    } else if (filterType === 'brand' && brandId) {
      updated.brandId = brandId;
      delete updated.categoryId; // 카테고리 필터 제거
    } else {
      // 다른 경우 필터 초기화 (원한다면 유지)
      return prev;
    }
    return updated;
  });
  setPage(0);
}, [filterType, categoryId, brandId]);


  // ✅ 필터, 정렬, 페이지 변경 시 상품 로드
  useEffect(() => {
  const loadProducts = async () => {
    // 조건: filters 객체가 유효할 때만 fetch
    if (Object.keys(filters).length > 0) {
      const data = await fetchFilteredProducts({
        page,
        size,
        sort,
        direction,
        ...filters
      });
      setProducts(data);
    }
  };
  loadProducts();
}, [page, size, sort, direction, filters]);


  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {filterType === 'category' ? '카테고리 상품 목록' : '브랜드 상품 목록'}
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <SearchBar setFilters={setFilters} setPage={setPage} />
        <SortOptions
          sort={sort}
          direction={direction}
          setSort={setSort}
          setDirection={setDirection}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.content?.length > 0 ? (
          products.content.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">상품이 없습니다.</p>
        )}
      </div>

      <div className="mt-6">
        <Pagination
          page={products.number || 0}
          totalPages={products.totalPages || 0}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default FilteredProductListFeature;
