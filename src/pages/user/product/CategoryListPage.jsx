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
          setCategories(data); // 응답이 배열이면 그대로
        } else if (Array.isArray(data.categories)) {
          setCategories(data.categories); // 객체 안에 categories 배열이 있는 경우
        } else {
          console.error('⛔️ 알 수 없는 카테고리 데이터 형식:', data);
          setCategories([]); // fallback
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
    <div className="p-4 max-w-screen-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">카테고리 목록</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => handleClick(category.id)}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryListPage;
