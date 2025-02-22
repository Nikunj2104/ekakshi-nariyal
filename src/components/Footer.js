import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { products } from "../json/products";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us", label: "Contact" },
];

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        color: "black",
        py: 4,
        mt: "auto", // Push footer to the bottom if the content is short
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We are a company dedicated to providing the best service to our
              customers. Our mission is to make your life easier.
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                color="inherit"
                underline="hover"
                display="block"
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          {/* Column 3: Products */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product-details/${product.slug}`}
                color="inherit"
                underline="hover"
                display="block"
              >
                {product.title}
              </Link>
            ))}
          </Grid>

          {/* Column 4: Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
              <Link href="#" color="inherit">
                <Instagram />
              </Link>
              <Link href="#" color="inherit">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            textAlign: "center",
            pt: 4,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} The Vedic Wellness. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
