"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import ProductDetails from "@/components/ProductDetailsBox";
import { clearCart, updateCartItemQuantity } from "@/redux/actions/authActions";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleEmptyCart = () => {
    dispatch(clearCart());
  };

  const handleProceedToBuy = () => {
    router.push("/checkout");
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(updateCartItemQuantity(id, 1));
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity(id, -1));
    }
  };

  return (
    <Box className="min-h-screen py-8" sx={{ backgroundColor: "#f5f5f5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Grid container spacing={4}>
          {/* Left Side - Cart Items (70%) */}
          <Grid item xs={12} md={8}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h4">Shopping Cart</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleEmptyCart}
                  >
                    Empty Your Cart
                  </Button>
                </Box>

                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((product) => (
                      <Box key={product.id}>
                        <ProductDetails
                          product={product}
                          handleIncreaseQuantity={handleIncreaseQuantity}
                          handleDecreaseQuantity={handleDecreaseQuantity}
                        />
                      </Box>
                    ))}
                  </>
                ) : (
                  <Typography variant="body1">Your cart is empty.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side - Total Amount & Proceed to Buy (30%) */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Order Summary
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total: ₹{totalAmount.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleProceedToBuy}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Buy
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Cart;
