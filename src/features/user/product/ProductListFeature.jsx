
import React, { useEffect, useState } from 'react';
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
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('desc');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchFilteredProducts({ page, size, sort, direction, ...filters });
      setProducts(data);
    };
    loadProducts();
  }, [page, size, sort, direction, filters]);

  useEffect(() => {
    // ✅ 브랜드 및 카테고리도 불러오기
    const loadFilters = async () => {
      const brandData = await fetchAllBrands();
      const categoryData = await fetchAllCategories();
      setBrands(brandData);
      setCategories(categoryData);
    };
    loadFilters();
  }, []);

  return (
    <div>
      <SearchBar setFilters={setFilters} />
      <SortOptions
  sort={sort}
  direction={direction}
  setSort={setSort}
  setDirection={setDirection}
/>

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.content?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        page={products.number}
        totalPages={products.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ProductListFeature;