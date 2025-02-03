import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Stars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        if (index < fullStars) {
          return <StarIcon key={index} sx={{ color: "star.primary" }} />;
        } else if (index === fullStars && hasHalfStar) {
          return (
            <StarIcon
              key={index}
              sx={{ color: "star.primary", opacity: 0.5 }}
            />
          );
        } else {
          return (
            <StarBorderIcon
              key={index}
              sx={{ color: "star.primary", opacity: 0.5 }}
            />
          );
        }
      })}
    </div>
  );
};

export default Stars;
