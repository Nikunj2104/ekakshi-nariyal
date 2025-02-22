"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import RazorpayButton from "@/components/RazorpayButton";
import ProductDetailsBox from "@/components/ProductDetailsBox";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <Box className="min-h-screen py-8" sx={{ backgroundColor: "#f5f5f5" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Checkout
            </Typography>

            {/* Display Cart Items */}
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((product) => (
                  <ProductDetailsBox key={product.id} product={product} />
                ))}
              </>
            ) : (
              <Typography variant="body1" sx={{ mb: 3 }}>
                Your cart is empty.
              </Typography>
            )}

            {/* User Details */}
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Delivery Address"
              name="address"
              value={userDetails.address}
              onChange={handleChange}
              multiline
              rows={3}
              sx={{ mb: 3 }}
            />

            <RazorpayButton />
          </CardContent>
        </Card>
      </div>
    </Box>
  );
};

export default Checkout;
