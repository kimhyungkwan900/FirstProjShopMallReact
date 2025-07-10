import { useState, useEffect } from "react";
import { getStarRating } from "../../../api/common/StarRatingApi";

const StartRating = ({ productId }) => {
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const rating = await getStarRating(productId);
        setAvgRating(rating);
      } catch (error) {
        console.error("별점 불러오기 실패:", error);
      }
    };

    if (productId) {
      fetchRating();
    }
  }, [productId]);

  // 별 갯수 (내림)
  const fullStars = Math.floor(avgRating);
  // 빈 별 수 계산 (최대 5개)
  const emptyStars = 5 - fullStars;

  return (
    <div className="text-amber-400 text-3xl">
      {"★".repeat(fullStars)}
      {"☆".repeat(emptyStars)}
    </div>
  );
};

export default StartRating;