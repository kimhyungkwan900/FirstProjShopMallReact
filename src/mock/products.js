// src/mock/products.js

export const mockProductList = {
  content: [
    {
      id: 1,
      name: "러블리 플라워 원피스",
      description: "화사한 플라워 패턴의 봄 원피스",
      price: 29900,
      stock: 32,
      brandName: "트렌디코어",
      categoryName: "패션 > 여성의류",
      images: [
        {
          id: 101,
          oriImgName: "flower.jpg",
          imgUrl: "/images/sample1.jpg",
          repImg: true
        }
      ]
    },
    {
      id: 2,
      name: "심플 블랙 티셔츠",
      description: "베이직한 블랙 티셔츠",
      price: 19900,
      stock: 20,
      brandName: "네오패션",
      categoryName: "패션 > 남성의류",
      images: [
        {
          id: 102,
          oriImgName: "black.jpg",
          imgUrl: "/images/sample2.jpg",
          repImg: true
        }
      ]
    }
  ],
  number: 0,
  totalPages: 1
};
