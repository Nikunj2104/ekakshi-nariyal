"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import ProductDetailsBox from "@/components/ProductDetailsBox";
import { clearWishlist } from "@/redux/actions/authActions";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userName = useSelector((state) => state.auth?.userName);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleEmptyWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <div>
      <Box className="min-h-screen py-8" sx={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 4,
              p: 2,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Avatar sx={{ mr: 2 }}>{userName?.charAt(0)}</Avatar>
            <Typography variant="h5">Welcome, {userName}!</Typography>
          </Box>

          <Card sx={{ boxShadow: 3, mt: 4 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h5">Your Wishlist</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleEmptyWishlist}
                >
                  Empty Your Wishlist
                </Button>
              </Box>

              {wishlistItems.length > 0 ? (
                <>
                  {wishlistItems.map((product) => (
                    <Box key={product.id}>
                      <ProductDetailsBox product={product} />
                    </Box>
                  ))}
                </>
              ) : (
                <Typography variant="body1">Your cart is empty.</Typography>
              )}
            </CardContent>
          </Card>
        </div>
      </Box>
    </div>
  );
};

export default Profile;
