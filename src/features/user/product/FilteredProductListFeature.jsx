import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFilteredProducts } from '../../../api/user/product/productApi';
import ProductCard from '../../../component/user/product/ProductCard';
import Pagination from '../../../component/user/product/Pagination';
import SortOptions from '../../../component/user/product/SortOptions';
import SearchBar from '../../../component/user/product/SearchBar';
import Footer from '../../../component/common/Footer';

const FilteredProductListFeature = ({ filterType }) => {
  const { categoryId, brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('desc');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (filterType === 'category' && categoryId) {
        updated.categoryId = Number(categoryId);
        updated.includeChildren = true;
        delete updated.brandId;
      } else if (filterType === 'brand' && brandId) {
        updated.brandId = brandId;
        delete updated.categoryId;
        delete updated.includeChildren;
      } else {
        return prev;
      }
      return updated;
    });
    setPage(0);
  }, [filterType, categoryId, brandId]);

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
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
        {filterType === 'category' ? '🛒 카테고리 상품' : '🏷️ 브랜드 상품'}
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <SearchBar setFilters={setFilters} setPage={setPage} />
        <SortOptions
          sort={sort}
          direction={direction}
          setSort={setSort}
          setDirection={setDirection}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.content?.length > 0 ? (
          products.content.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-lg">해당 조건에 맞는 상품이 없습니다 😥</p>
          </div>
        )}
      </div>

      <div className="mt-10 mb-20">
        <Pagination
          page={products.number || 0}
          totalPages={products.totalPages || 0}
          onPageChange={setPage}
        />
      </div>

      <Footer />
    </div>
  );
};

export default FilteredProductListFeature;
