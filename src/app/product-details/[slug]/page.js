"use client";

import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";
import {
  Box,
  Typography,
  Button,
  Rating,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import RazorpayButton from "@/components/RazorpayButton";
import Stars from "@/components/Stars";
import { addToCart } from "@/redux/actions/authActions";
import Message from "@/components/Message";
import { products } from "@/json/products.json";

const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const product = products?.find((p) => p.slug === slug);

  const [reviews, setReviews] = useState(product?.reviews || []);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    reviewer: "",
    rating: 0,
    comment: "",
  });

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const isProductInCart = products?.some((item) => item.id === product.id);

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

  if (!isClient) {
    return null; // Prevent rendering until the client-side is ready
  }

  if (!product) {
    return (
      <Message
        title="Product not found"
        message="Please tell us what your are finding. We would love to get back to you!"
      />
    );
  }

  return (
    <Box
      className="min-h-screen p-4"
      sx={{ backgroundColor: "background.secondary" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Product Details Section */}
        <div>
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start bg-white shadow-lg rounded-lg p-4 m-0 sm:my-2">
            {/* Image Section */}
            <div className="flex-1 md:w-1/2 rounded-lg overflow-hidden flex justify-center">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="object-cover"
                  loading="lazy"
                />
              )}
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
                {Stars(parseFloat(product.averageReview))}
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
        <div className="my-8">
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

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000} // Snackbar stays visible for 3 seconds
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </Box>
  );
};

export default ProductDetail;
