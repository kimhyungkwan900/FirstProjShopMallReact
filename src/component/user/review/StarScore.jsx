const StarScore = ({ score }) => {

  const validScore = Math.min(Math.max(score || 0, 0), 5);

  const fullStars = Math.floor(validScore);
  const emptyStars = 5 - fullStars;

  return (
    <div className="text-amber-400" style={{ fontSize: "20px" }}>
      {"★".repeat(fullStars)}
      {"☆".repeat(emptyStars)}
    </div>
  );
};

export default StarScore;
