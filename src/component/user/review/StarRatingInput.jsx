const StarRatingInput = ({ score, setScore }) => {
  const handleStarClick = (newScore) => {
    setScore(newScore);
  };

  return (
    <div className="flex space-x-1 text-5xl text-yellow-400 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="cursor-pointer select-none"
          onClick={() => handleStarClick(star)}
        >
          {score >= star ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRatingInput;