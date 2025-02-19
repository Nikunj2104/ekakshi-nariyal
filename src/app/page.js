"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  Grid2 as Grid,
  Card,
  CardContent,
} from "@mui/material";
import Message from "@/components/Message";
import RazorpayButton from "@/components/RazorpayButton";
import Stars from "@/components/Stars";
import { products } from "@/json/products.json";
import { addToWishlist } from "@/redux/actions/authActions";

const Home = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const searchQuery = useSelector((state) => state.auth.searchQuery);

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

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.title?.toLowerCase().includes(searchQuery?.toLowerCase())
      )
    : products;

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    // TODO: if already addedded to wishlist
    setSnackbarMessage("Product added to wishlist!");
    setOpenSnackbar(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 1.5, xxs: 1.5, sm: 2, md: 4 },
        backgroundColor: "background.secondary",
      }}
    >
      <Box sx={{ width: "100%", px: { xs: 0, xxs: 1.5, sm: 2, md: 4 } }}>
        <Grid
          container
          gap={{ xs: 0, xxs: 1.5, sm: 2, md: 4 }}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs:
                filteredProducts.length === 1
                  ? "minmax(175px, 300px)"
                  : "repeat(auto-fit, minmax(175px, 1fr))",
              xxs:
                filteredProducts.length === 1
                  ? "minmax(200px, 300px)"
                  : "repeat(auto-fit, minmax(200px, 1fr))",
              xmd:
                filteredProducts.length === 1
                  ? "minmax(275px, 300px)"
                  : "repeat(auto-fit, minmax(275px, 1fr))",
              md:
                filteredProducts.length === 1
                  ? "minmax(300px, 350px)"
                  : "repeat(auto-fit, minmax(300px, 1fr))",
            },
            justifyContent:
              filteredProducts.length === 1 ? "center" : "stretch", // Center single product
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid
                key={product.id}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                <Card
                  sx={{
                    backgroundColor: "white",
                    boxShadow: 3,
                    borderRadius: { xs: 0, xxs: 2 },
                    width: "100%",
                    minWidth: {
                      xs: 150,
                      xxs: 200,
                      xmd: 275,
                      md: 300,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={500}
                      height={500}
                      style={{ objectFit: "cover", borderRadius: 8 }}
                      priority
                    />
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: "primary.main",
                          cursor: "pointer",
                          mb: 0.5,
                          lineHeight: 1.3,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: {
                            xs: "1.125rem",
                            xxs: "1.25rem",
                          },
                        }}
                        title={product.title}
                        onClick={() =>
                          router.push(`/product-details/${product.slug}`)
                        }
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1,
                          display: { xs: "none", xxs: "-webkit-box" }, // Hide on mobile, show on larger screens
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={product.description}
                      >
                        {product.description}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        {Stars(parseFloat(product.averageReview))}
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "500",
                            ml: 1,
                            fontSize: {
                              xs: "0.75rem",
                              xxs: "0.875rem",
                            },
                          }}
                        >
                          {product.averageReview} / 5.0
                        </Typography>
                      </Box>
                      {product.limitedDeal && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#CC0C39",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            mt: { xs: 0.5, xxs: 1 },
                            mb: { xs: 1, xxs: 2 },
                            maxWidth: "75%",
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
                        sx={{
                          fontWeight: "600",
                          color: "#113065",
                          lineHeight: 1,
                          fontSize: {
                            xs: "1.125rem",
                            xxs: "1.25rem",
                          },
                        }}
                      >
                        ₹{product.price}{" "}
                        <Typography
                          component="span"
                          sx={{ color: "grey", fontSize: "small" }}
                        >
                          M.R.P: <s>₹{product.mrp}</s>
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            color: "green",
                            fontWeight: "bold",
                            fontSize: "small",
                            ml: 0.5,
                          }}
                        >
                          ({product.discount}% off)
                        </Typography>
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddToCart(product)}
                        sx={{
                          backgroundColor: "primary.main",
                          color: "white",
                          width: "100%",
                          my: { xs: 1, xxs: 1.5 },
                          textTransform: "none",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
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

                      {/* TODO: positioning and looks */}
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleAddToWishlist(product)}
                        sx={{
                          width: "100%",
                          my: 1,
                          textTransform: "none",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
                          "&:hover": {
                            backgroundColor: "secondary.main",
                            color: "white",
                            fontWeight: "bold",
                          },
                        }}
                      >
                        Add to Wishlist
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Message title="No products found!" />
          )}
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Home;
