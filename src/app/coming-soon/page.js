import React from "react";
import { Box, Typography, Container, Button, Grid } from "@mui/material";

const ComingSoon = () => {
  const navbarHeight = 64;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: `calc(100vh - ${navbarHeight}px)`,
        backgroundColor: "#f5f5f5",
        paddingTop: `${navbarHeight}px`,
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          backgroundColor: "white",
          padding: 5,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Typography variant="h3" color="primary" gutterBottom>
          Coming Soon!
        </Typography>
        <Typography variant="h5" color="textSecondary">
          We're working hard to bring something awesome. Stay tuned for updates.
        </Typography>

        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 3,
                paddingX: 4,
                marginTop: 3,
              }}
              href="/contact-us"
            >
              Contact Us
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ComingSoon;
