import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFilteredProducts } from '../../../api/user/product/productApi';
import { fetchAllBrands } from '../../../api/user/product/brandApi';
import { fetchAllCategories } from '../../../api/user/product/categoryApi';
import ProductCard from '../../../component/user/product/ProductCard';
import Pagination from '../../../component/user/product/Pagination';
import SortOptions from '../../../component/user/product/SortOptions';
import CategoryFilter from '../../../component/user/product/CategoryFilter';
import BrandFilter from '../../../component/user/product/BrandFilter';
import SearchBar from '../../../component/user/product/SearchBar';

const ProductListFeature = () => {
  const { categoryId, brandId } = useParams();

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    const loadFilters = async () => {
      const brandData = await fetchAllBrands();
      const categoryData = await fetchAllCategories();
      setBrands(brandData);
      setCategories(categoryData);
    };
    loadFilters();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">상품 목록</h2>

      {/* 상단 필터 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <SearchBar setFilters={setFilters} />
        <SortOptions
          sort={sort}
          direction={direction}
          setSort={setSort}
          setDirection={setDirection}
        />
      </div>

      {/* 사이드 필터 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-1">
          <CategoryFilter
            categories={categories}
            selectedCategory={filters.categoryId || ''}
            onSelect={(categoryId) => setFilters(prev => ({ ...prev, categoryId }))}
          />
          <BrandFilter
            brands={brands}
            selectedBrand={filters.brandId || ''}
            onSelect={(brandId) => setFilters(prev => ({ ...prev, brandId }))}
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
    </div>
  );
};

export default ProductListFeature;
