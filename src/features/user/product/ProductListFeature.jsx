
import React, { useEffect, useState } from 'react';
import { fetchFilteredProducts } from '../../../api/user/product/productApi';
import ProductCard from '../../../component/user/product/ProductCard';
import Pagination from '../../../component/user/product/Pagination';
import SortOptions from '../../../component/user/product/SortOptions';
import CategoryFilter from '../../../component/user/product/CategoryFilter';
import BrandFilter from '../../../component/user/product/BrandFilter';
import SearchBar from '../../../component/user/product/SearchBar';

const ProductListFeature = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
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

  return (
    <div>
      <SearchBar setFilters={setFilters} />
      <SortOptions sort={sort} setSort={setSort} direction={direction} setDirection={setDirection} />
      <CategoryFilter setFilters={setFilters} />
      <BrandFilter setFilters={setFilters} />
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