"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Email, Phone, Person, LocationOn } from "@mui/icons-material";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      const data = await response.json();

      // Reset form and show success message
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSubmitted(true);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 7, md: 10 } }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", pb: { xs: 1, md: 3 }, fontWeight: "bold" }}
        >
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          {/* Left Section - Office Details */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Phone sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1">+91 63501 24511</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Email sx={{ mr: 1, color: "primary.main" }} />
                <Typography
                  variant="body1"
                  sx={{ wordBreak: { xs: "break-all", sm: "normal" } }}
                >
                  praveenbharadiya@gmail.com
                </Typography>
              </Box>

              {/* Registered Office */}
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: "bold" }}>
                Registered Office
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1">
                  Shop Name: EV Nation, Shop No. 1, RSEB Choraha, Ahinsa Circle,
                  Nimbahera, Rajasthan - 312601
                </Typography>
              </Box>

              {/* Corporate Office */}
              <Typography variant="h6" sx={{ mb: 0.5, fontWeight: "bold" }}>
                Corporate Office
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1">
                  Praveen Bharadiya, 202/203A Royal Accord, Tarun Bharat Society
                  Road, Chakala, Andheri East, Mumbai - 400099
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Right Section - Contact Form */}
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <Person sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    required
                    InputProps={{
                      startAdornment: (
                        <Email sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    variant="outlined"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel"
                    InputProps={{
                      startAdornment: (
                        <Phone sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ alignSelf: "flex-start" }}>
                          <Email sx={{ mr: 1, color: "action.active" }} />
                        </Box>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={submitted || loading}
                    sx={{ py: 1.5, fontWeight: "bold" }}
                  >
                    {loading
                      ? "Sending..."
                      : submitted
                      ? "Message Sent"
                      : "Send Message"}
                  </Button>
                </Grid>
              </Grid>
            </form>
            {error && (
              <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                {error}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your message has been sent successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
