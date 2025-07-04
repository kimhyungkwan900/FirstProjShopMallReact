import React, { useEffect, useState } from 'react';
import { fetchAllCategories } from '../../../api/user/product/categoryApi';
import { useNavigate } from 'react-router-dom';

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        console.log('🔍 카테고리 응답:', data);

        if (Array.isArray(data)) {
          setCategories(data);
        } else if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error('⛔️ 알 수 없는 카테고리 데이터 형식:', data);
          setCategories([]);
        }
      } catch (error) {
        console.error('❌ 카테고리 불러오기 실패:', error);
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  const handleClick = (categoryId) => {
    navigate(`/products/category/${categoryId}`);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        📂 카테고리 둘러보기
      </h2>

      {categories.length === 0 ? (
        <p className="text-center text-gray-500">카테고리 정보가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleClick(category.id)}
              className="bg-white shadow-md rounded-xl p-4 flex items-center justify-center text-center cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
            >
              <span className="text-gray-800 font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;
