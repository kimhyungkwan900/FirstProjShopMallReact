import React from 'react'; // React를 불러와 JSX를 사용할 수 있게 함

// ProductImageGallery 컴포넌트 정의 (props로 images 배열을 받음)
const ProductImageGallery = ({ images }) => {
  return (
    <div className="image-gallery"> {/* 이미지들을 담을 부모 컨테이너 div, 클래스는 Tailwind 또는 CSS 스타일링용 */}
      {images.map(img => ( // images 배열을 순회하며 각 이미지에 대해 img 태그 생성
        <img
          key={img.id} // 각 이미지 요소에 고유 key 지정 (React가 효율적으로 렌더링할 수 있게 함)
          src={img.imgUrl} // 이미지의 실제 경로(URL)를 img 태그의 src 속성으로 사용
          alt={img.oriImgName} // 대체 텍스트(접근성 및 이미지 로딩 실패 대비용)
          className="gallery-image" // 개별 이미지에 스타일 적용 (Tailwind 또는 CSS에서 정의된 클래스)
        />
      ))}
    </div>
  );
};

export default ProductImageGallery; // 외부에서 해당 컴포넌트를 사용할 수 있도록 export
