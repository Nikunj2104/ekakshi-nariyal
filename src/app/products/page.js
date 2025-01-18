"use client";

import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Image from "next/image";

const ProductDetail = () => {
  const reviews = [
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

  const [showAllReviews, setShowAllReviews] = useState(false);

  const toggleReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const reviewsToShow = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <>
      <div className="flex flex-col md:flex-row p-6">
        {/* Left side: Product image */}
        <div className="flex-1 mb-6 md:mb-0 border border-gray-300 p-4 flex justify-center items-center">
          <Image
            src="/one-eye-coconut.jpg"
            alt="Product Image"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>

        {/* Right side: Product details */}
        <div className="flex-1 pl-6">
          <Typography variant="h4" component="h1" className="font-bold mb-4">
            Product Title
          </Typography>
          <Typography variant="body1" className="mb-2">
            Description of the product goes here. It provides detailed
            information about the product.
          </Typography>
          <Typography variant="h6" className="mb-2">
            Price: $100
          </Typography>
          <Typography variant="h6" className="mb-2">
            Weight: 1.5kg
          </Typography>
          <Typography variant="body1" className="mb-4">
            Product Code: ABC123
          </Typography>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full px-6">
        <Typography variant="h6" className="mb-4">
          Customer Reviews
        </Typography>

        <div className="flex flex-wrap justify-between">
          {reviewsToShow.map((review) => (
            <div key={review.id} className="w-[calc(33.333%-1rem)] mb-4">
              <Card className="shadow-lg border border-gray-300">
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {review.reviewer}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`Rating: ${review.rating} Stars`}</Typography>
                  <Typography variant="body1" className="mt-2">
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {reviews.length > 3 && (
          <div className="flex justify-end pb-3">
            <Button
              variant="contained"
              color="primary"
              onClick={toggleReviews}
              style={{ backgroundColor: "#113065" }}
            >
              {showAllReviews ? "Show Less" : "View All"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
