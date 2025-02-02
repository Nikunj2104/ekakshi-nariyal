"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Typography, Button, Box, Snackbar, Alert } from "@mui/material";
import RazorpayButton from "@/components/RazorpayButton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/actions/authActions";
import { products } from "@/json/products.json";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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

const Home = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAddToCart = (product) => {
    const isProductInCart = cartItems?.some((item) => item.id === product.id);
    if (isProductInCart) {
      setSnackbarMessage("Product is already added to cart!");
    } else {
      dispatch(addToCart(product));
      setSnackbarMessage("Product added to cart!");
    }
    setOpenSnackbar(true);
  };

  return (
    <Box
      className="min-h-screen py-8"
      sx={{ backgroundColor: "background.secondary" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white shadow-lg rounded-lg p-4 min-w-[300px]"
            >
              <div className="w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              <div className="w-full mt-4">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "500",
                    color: "primary.main",
                    mb: 1,
                  }}
                  onClick={() => router.push(`/product-details/${product.slug}`)}
                >
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={product.description}
                >
                  {product.description}
                </Typography>

                <div className="flex items-center mb-1">
                  {renderStars(parseFloat(product.averageReview))}
                  <Typography variant="body2" sx={{ fontWeight: "500", ml: 1 }}>
                    {product.averageReview} / 5.0
                  </Typography>
                </div>

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
                      fontSize: "x-small",
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

                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", color: "#113065" }}
                >
                  ₹{product.price}{" "}
                  <span className="text-gray-500 text-sm">
                    <span>M.R.P: </span>
                    <span className="line-through">₹{product.mrp}</span>
                  </span>
                  <span className="text-green-600 text-sm font-bold">
                    {" "}
                    ({product.discount}% off)
                  </span>
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    width: "100%",
                    mb: 1,
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

                <RazorpayButton />
              </div>
            </div>
          ))}
        </div>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </Box>
  );
};

export default Home;
