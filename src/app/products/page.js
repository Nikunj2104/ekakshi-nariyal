"use client";

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
import Image from "next/image";

const ProductDetail = () => {
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
    // Add product to cart
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
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-8 items-start bg-white shadow-lg rounded-lg p-6">
          {/* Left side: Product image */}
          <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/one-eye-coconut.jpg"
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
              className="font-bold text-gray-800 mb-4"
            >
              Product Title
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-4">
              Description of the product goes here. It provides detailed
              information about the product.
            </Typography>
            <Typography variant="h6" className="text-gray-700 font-medium mb-2">
              Price: <span className="text-blue-600 font-bold">$100</span>
            </Typography>
            <Typography variant="h6" className="text-gray-700 font-medium mb-2">
              Weight: <span className="text-blue-600 font-bold">1.5kg</span>
            </Typography>
            <Typography variant="body1" className="text-gray-500 mb-4">
              Product Code:{" "}
              <span className="text-gray-800 font-medium">ABC123</span>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              sx={{
                backgroundColor: "#113065",
                color: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#113065",
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
          <Typography variant="h5" className="text-[#113065] mb-6">
            Customer Reviews
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsToShow.map((review) => (
              <Card
                key={review.id}
                className="shadow-md border border-[#113065] hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h2"
                    className="text-[#113065] font-medium"
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
                    <Typography variant="body2" className="text-gray-500 ml-2">
                      {review.rating} Stars
                    </Typography>
                  </Box>
                  <Typography variant="body2" className="text-gray-600">
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
                  backgroundColor: "#113065",
                  color: "#fff",
                }}
              >
                {showAllReviews ? "Show Less" : "View All"}
              </Button>
            </div>
          )}
        </div>

        {/* Add Review Section */}
        <div className="mt-12">
          <Typography variant="h5" className="text-[#113065] mb-6">
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
              className="bg-[#113065] hover:bg-[#0f274f]"
              sx={{
                backgroundColor: "#113065",
                color: "#fff",
              }}
            >
              Submit Review
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
