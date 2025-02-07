import React from "react";
import { Typography, Container, Button, Grid } from "@mui/material";

const Message = ({ title, message, buttonText, buttonLink }) => {
  const navbarHeight = 64;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: `calc(100vh - ${navbarHeight}px)`,
        textAlign: "center",
        maxWidth: 600,
        width: "100%",
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        {title || "Coming Soon!"}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {message ||
          "We're working hard to bring something awesome. Stay tuned for updates."}
      </Typography>

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 1,
              paddingX: 4,
              marginTop: 3,
              "&:hover": {
                backgroundColor: "secondary.main",
                color: "primary.main",
              },
            }}
            href={buttonLink || "/contact-us"}
          >
            {buttonText || "Contact Us"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Message;
