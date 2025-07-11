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

  const fullStars = Math.floor(avgRating);
  const emptyStars = 5 - fullStars;
  return (
    <div>
    <div className="flex gap-2">
        <div className="text-amber-400">
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
        </div>
        <div>({avgRating})</div>
    </div>
    </div>
  );
};

export default StartRating;