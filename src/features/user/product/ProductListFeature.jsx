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
  const [size] = useState(10);
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('desc');
  const [filters, setFilters] = useState({});

  // URL 파라미터를 필터로 반영
  useEffect(() => {
    const newFilters = {};
    if (categoryId) newFilters.categoryId = categoryId;
    if (brandId) newFilters.brandId = brandId;
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, [categoryId, brandId]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchFilteredProducts({ page, size, sort, direction, ...filters });
      setProducts(data);
    };
    loadProducts();
  }, [page, size, sort, direction, filters]);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">상품 목록</h2>

      {/* 상단 필터 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <SearchBar setFilters={setFilters} setPage={setPage}/>
        <SortOptions
          sort={sort}
          direction={direction}
          setSort={setSort}
          setDirection={setDirection}
        />
      </div>
        {/* 상품 목록 */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.content?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6">
            <Pagination
              page={products.number}
              totalPages={products.totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
  );
};

export default ProductListFeature;
