import Image from "next/image";
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

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
        borderRadius: 2,
        p: 2,
        mb: 3,
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 500, color: "#113065" }}>
          {product.title}
        </Typography>
        <Typography variant="body1" sx={{ color: "#113065" }}>
          Price: {product.price} INR
        </Typography>
        <Typography variant="body2" sx={{ color: "#113065" }}>
          Weight: {product.weight}
        </Typography>
        <Typography variant="body2" sx={{ color: "#113065" }}>
          Product Code: {product.code}
        </Typography>

        {/* Quantity Control */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <IconButton
            onClick={() => handleDecreaseQuantity(product.id, product.quantity)}
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
      </Box>
    </Box>
  );
};

export default ProductDetails;
