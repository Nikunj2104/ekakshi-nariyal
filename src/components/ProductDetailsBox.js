import Image from "next/image";
import { Box, Typography, IconButton, Button, Grid } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Stars from "./Stars";

const ProductDetails = ({
  product,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        border: "1px solid #e0e0e0",
        mb: 2,
      }}
    >
      <Grid container spacing={2} className="max-w-6xl mx-auto">
        <Grid item xs={12} md={5} lg={5}>
          {/* Image Section */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {product.image && (
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="object-cover"
                loading="lazy"
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={7} lg={7}>
          {/* Product Details Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "primary.main",
              paddingTop: {
                sm: 1.5,
                xs: 0,
              },
              paddingX: {
                sm: 0,
                xs: 1.5,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "500",
                mb: 0.5,
                fontSize: { xs: "1.25rem", sm: "1.375rem" },
              }}
            >
              {product.title}
            </Typography>

            {/* Rating */}
            <div className="flex items-center mb-0.5">
              {Stars(parseFloat(product.averageReview))}
              <Typography variant="body2" sx={{ fontWeight: "500", ml: 1 }}>
                {product.averageReview} / 5.0
              </Typography>
            </div>

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
                  mb: 1,
                  width: "fit-content",
                  fontSize: { xs: "0.5rem", sm: "0.75rem" },
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "2px",
                  letterSpacing: "0.4px",
                  "&:hover": { backgroundColor: "#A00A2E" },
                }}
              >
                Limited Time Deal
              </Button>
            )}

            {/* Price and Discount */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                fontSize: { xs: "1.25rem", sm: "1.375rem" },
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
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              M.R.P: <span className="line-through">₹{product.mrp}</span>
            </Typography>

            {/* Quantity Control */}
            {handleDecreaseQuantity && handleIncreaseQuantity && (
              <Box
                sx={{ display: "flex", alignItems: "center", mt: 1, ml: -1 }}
              >
                <IconButton
                  onClick={() =>
                    handleDecreaseQuantity(product.id, product.quantity)
                  }
                  disabled={product.quantity === 1}
                >
                  <Remove />
                </IconButton>
                <Typography variant="body1" sx={{ mx: 1 }}>
                  {product.quantity}
                </Typography>
                <IconButton onClick={() => handleIncreaseQuantity(product.id)}>
                  <Add />
                </IconButton>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
