import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../component/common/Footer';
import MainHeader from '../../../features/common/Header/MainHeader';
import { ChevronDown, ChevronUp, Folder } from 'lucide-react';

const categoryData = [
  {
    title: '패션의류/잡화',
    titleId: 1,
    groups: [
      {
        name: '여성의류',
        groupId: 2,
        subcategories: [
          { name: '원피스', id: 3 },
          { name: '블라우스', id: 4 },
          { name: '니트/스웨터', id: 5 },
          { name: '트렌치코트', id: 6 },
        ],
      },
      {
        name: '남성의류',
        groupId: 7,
        subcategories: [
          { name: '티셔츠', id: 8 },
          { name: '맨투맨', id: 9 },
          { name: '셔츠', id: 10 },
          { name: '청바지', id: 11 },
        ],
      },
      {
        name: '패션잡화',
        groupId: 12,
        subcategories: [
          { name: '가방', id: 13 },
          { name: '지갑', id: 14 },
          { name: '모자', id: 15 },
        ],
      },
    ],
  },
  {
    title: '디지털/가전',
    titleId: 16,
    groups: [
      {
        name: '',
        subcategories: [
          { name: '노트북/태블릿', id: 17 },
          { name: '스마트폰', id: 18 },
          { name: '이어폰/헤드폰', id: 19 },
          { name: '모니터', id: 20 },
          { name: '스마트워치', id: 21 },
        ],
      },
    ],
  },
  {
    title: '뷰티/미용',
    titleId: 22,
    groups: [
      {
        name: '',
        subcategories: [
          { name: '스킨케어', id: 23 },
          { name: '메이크업', id: 24 },
          { name: '향수', id: 25 },
          { name: '바디케어', id: 26 },
        ],
      },
    ],
  },
  {
    title: '식품/건강',
    titleId: 27,
    groups: [
      {
        name: '신선식품',
        groupId: 28,
        subcategories: [
          { name: '과일', id: 29 },
          { name: '채소', id: 30 },
          { name: '정육/계란', id: 31 },
        ],
      },
      {
        name: '가공식품',
        groupId: 32,
        subcategories: [
          { name: '간편식', id: 33 },
          { name: '라면/면류', id: 34 },
          { name: '과자/간식', id: 35 },
        ],
      },
      {
        name: '',
        subcategories: [
          { name: '건강기능식품', id: 36 },
        ],
      },
    ],
  },
  {
    title: '생활/주방',
    titleId: 37,
    groups: [
      {
        name: '',
        subcategories: [
          { name: '청소용품', id: 38 },
          { name: '주방용품', id: 39 },
          { name: '욕실용품', id: 40 },
          { name: '수납/정리', id: 41 },
        ],
      },
    ],
  },
  {
    title: '유아동',
    titleId: 42,
    groups: [
      {
        name: '',
        subcategories: [
          { name: '유아의류', id: 43 },
          { name: '유아식품', id: 44 },
          { name: '장난감/완구', id: 45 },
          { name: '유모차/카시트', id: 46 },
        ],
      },
    ],
  },
];

const CategoryTreePage = () => {
  const navigate = useNavigate();
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleClick = (categoryId) => {
    navigate(`/products/category/${categoryId}`);
  };

  const toggleAccordion = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <MainHeader />
      <main className="flex-grow max-w-screen-lg mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
          <Folder className="text-blue-500" /> 카테고리 둘러보기
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoryData.map((categoryBlock, i) => {
            const isOpen = openIndexes.includes(i);
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
              >
                <button
                  onClick={() => toggleAccordion(i)}
                  className="flex justify-between items-center w-full text-left text-xl font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Folder size={20} className="text-blue-500" />
                    {categoryBlock.title}
                  </div>
                  {isOpen ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden transform ${
                    isOpen
                      ? 'max-h-[1000px] opacity-100 scale-y-100 translate-y-0 mt-4'
                      : 'max-h-0 opacity-0 scale-y-95 -translate-y-2'
                  }`}
                >
                  <ul className="space-y-3">
                    {categoryBlock.groups.map((group, j) => (
                      <li key={j} className="mb-2">
                        {group.name && (
                          <span
                            className="font-semibold text-gray-700 cursor-pointer hover:underline hover:text-blue-600"
                            onClick={() => group.groupId && handleClick(group.groupId)}
                          >
                            {group.name}
                          </span>
                        )}
                        <ul className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
                          {group.subcategories.map((sub, k) => (
                            <li
                              key={k}
                              onClick={() => handleClick(sub.id)}
                              role="button"
                              className="text-sm text-blue-500 hover:text-blue-700 hover:underline cursor-pointer transition-colors"
                            >
                              ├─ {sub.name}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryTreePage;
