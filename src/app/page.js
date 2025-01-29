"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Box,
  TextField,
} from "@mui/material";

const Home = () => {
  const initialReviews = [
    { id: 1, reviewer: "John Doe", rating: 5, comment: "Great product!" },
    { id: 2, reviewer: "Jane Smith", rating: 4, comment: "Very useful!" },
    { id: 3, reviewer: "Sam Wilson", rating: 3, comment: "It works well." },
    {
      id: 4,
      reviewer: "Alice Brown",
      rating: 5,
      comment: "Exceeded expectations!",
    },
    {
      id: 5,
      reviewer: "Bob Johnson",
      rating: 2,
      comment: "Not what I expected.",
    },
    {
      id: 6,
      reviewer: "Chris Lee",
      rating: 4,
      comment: "Good value for money.",
    },
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [cart, setCart] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewer: "",
    rating: 0,
    comment: "",
  });

  const toggleReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const reviewsToShow = showAllReviews ? reviews : reviews.slice(0, 3);

  const handleAddToCart = () => {
    setCart([
      ...cart,
      { id: "product-123", title: "Product Title", price: 100 },
    ]);
  };

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
      className="min-h-screen py-8"
      sx={{ backgroundColor: "background.secondary" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-white shadow-lg rounded-lg p-6">
          {/* Left side: Product image */}
          <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/one-eye-coconut.webp"
              alt="Product Image"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>

          {/* Right side: Product details */}
          <div className="flex-1">
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: "500",
                color: "primary.main",
                marginBottom: 2,
                fontSize: {
                  xs: "1.75rem",
                  sm: "2.25rem",
                },
              }}
            >
              <span style={{ display: "block" }}>Ekakshi Nariyal</span>
              <span style={{ display: "block" }}>One Eyed Coconut</span>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Description of the product goes here. It provides detailed
              information about the product.
            </Typography>
            <Typography variant="h6">
              Price:{" "}
              <span style={{ color: "#113065", fontWeight: "500" }}>
                12,000 INR
              </span>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Weight:{" "}
              <span style={{ color: "#113065", fontWeight: "500" }}>
                500 gm
              </span>
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Product Code:{" "}
              <span className="text-gray-800 font-medium">PTC079</span>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "primary.main",
                  fontWeight: "bold",
                },
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
            Customer Reviews
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsToShow.map((review) => (
              <Card
                key={review.id}
                sx={{
                  boxShadow: 2,
                  borderColor: "primary.main",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ color: "primary.main", fontWeight: "medium" }}
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
                      sx={{ color: "text.secondary", ml: 2 }}
                    >
                      {review.rating} Stars
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
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
        <div className="mt-12">
          <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
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
      </div>
    </Box>
  );
};

export default Home;
