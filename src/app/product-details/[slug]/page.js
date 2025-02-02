"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Box, Typography, Button, Rating, TextField } from "@mui/material";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RazorpayButton from "@/components/RazorpayButton";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        if (index < fullStars) {
          return <StarIcon key={index} sx={{ color: "#DE7921" }} />;
        } else if (index === fullStars && hasHalfStar) {
          return (
            <StarIcon key={index} sx={{ color: "#DE7921", opacity: 0.5 }} />
          );
        } else {
          return (
            <StarBorderIcon
              key={index}
              sx={{ color: "#DE7921", opacity: 0.5 }}
            />
          );
        }
      })}
    </div>
  );
};

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = useParams();

  // Fetch product data from Redux or JSON
  const products = useSelector((state) => state.cart.items);
  const product = products?.find((p) => p.slug === slug);

  if (!product) {
    return <Typography variant="h4">Product not found</Typography>;
  }

  const [reviews, setReviews] = useState(product.reviews);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    reviewer: "",
    rating: 0,
    comment: "",
  });

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const isProductInCart = cartItems?.some((item) => item.id === product.id);

    if (isProductInCart) {
      setSnackbarMessage("Product is already added to cart!");
    } else {
      dispatch(addToCart(product));
      setSnackbarMessage("Product added to cart!");
    }

    setOpenSnackbar(true);
  };

  const toggleReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const reviewsToShow = showAllReviews ? reviews : reviews.slice(0, 3);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.reviewer && newReview.rating && newReview.comment) {
      setReviews([
        ...reviews,
        {
          ...newReview,
          id: reviews.length + 1,
        },
      ]);
      setNewReview({ reviewer: "", rating: 0, comment: "" });
    }
  };

  return (
    <Box
      className="min-h-screen p-4"
      sx={{ backgroundColor: "background.secondary" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start bg-white shadow-lg rounded-lg p-4">
          {/* Image Section */}
          <div className="flex-1 md:w-1/2 rounded-lg overflow-hidden flex justify-center">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="object-cover"
              priority
            />
          </div>

          {/* Product Details Section */}
          <div className="flex-1 md:w-1/2 w-full mt-4">
            <Typography
              variant="h6"
              sx={{
                fontWeight: "500",
                color: "primary.main",
                mb: 1,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              {product.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {product.description}
            </Typography>

            {/* Add Rating and Price */}
            <div className="flex items-center mb-1">
              {renderStars(parseFloat(product.averageReview))}
              <Typography variant="body2" sx={{ fontWeight: "500", ml: 1 }}>
                {product.averageReview} / 5.0
              </Typography>
            </div>

            {/* Price and MRP */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                color: "#113065",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              ₹{product.price}{" "}
              <span className="text-green-600 text-sm font-bold">
                ({product.discount}% off)
              </span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              M.R.P: <span className="line-through">₹{product.mrp}</span>
            </Typography>

            {/* Limited Deal */}
            {product.limitedDeal && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#CC0C39",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  mt: 1,
                  mb: 2,
                  maxWidth: "70%",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  px: 1,
                  py: 0.5,
                  borderRadius: "2px",
                  letterSpacing: "0.4px",
                  "&:hover": { backgroundColor: "#A00A2E" },
                }}
              >
                Limited Time Deal
              </Button>
            )}

            {/* Add to Cart and Buy Now Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  width: "100%",
                  textTransform: "none",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              >
                Add to Cart
              </Button>

              <div className="w-full">
                <RazorpayButton sx={{ paddingTop: "0.5rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-8">
        <Typography
          variant="h5"
          sx={{
            color: "primary.main",
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "1.75rem" },
          }}
        >
          Customer Reviews
        </Typography>

        <div className="space-y-4">
          {reviewsToShow.map((review) => (
            <Box
              key={review.id}
              sx={{
                backgroundColor: "background.paper",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: 1,
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  color: "primary.main",
                  fontWeight: "medium",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                {review.reviewer}
              </Typography>
              <Box className="flex items-center my-2">
                <Rating
                  name={`rating-${review.id}`}
                  value={review.rating}
                  readOnly
                  size="small"
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    ml: 2,
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  {review.rating} Stars
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                {review.comment}
              </Typography>
            </Box>
          ))}
        </div>

        {reviews.length > 3 && (
          <div className="flex justify-center mt-6">
            <Button
              variant="outlined"
              onClick={toggleReviews}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              {showAllReviews ? "Show Less" : "View All"}
            </Button>
          </div>
        )}
      </div>

      {/* Add Review Section */}
      <div className="mt-8">
        <Typography
          variant="h5"
          sx={{
            color: "primary.main",
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "1.75rem" },
          }}
        >
          Add Your Review
        </Typography>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <Box className="flex items-center mt-3">
            <Rating
              value={newReview.rating}
              onChange={(e, newValue) =>
                setNewReview({ ...newReview, rating: newValue })
              }
              size="large"
            />
          </Box>
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            value={newReview.reviewer}
            onChange={(e) =>
              setNewReview({ ...newReview, reviewer: e.target.value })
            }
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          />
          <TextField
            label="Your Review"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              backgroundColor: "primary.main",
              color: "#fff",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
            }}
          >
            Submit Review
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default ProductDetail;
