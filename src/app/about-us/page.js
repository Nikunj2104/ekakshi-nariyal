"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";

export default function AboutUs() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const events = [
    {
      imgSrc: "sample.jpg",
      description:
        "Sakhashree Neeta conducts workshop in Rashtriya Chemical Fertilizers (RCF – Mumbai)",
    },
    {
      imgSrc: "sample.jpg",
      description:
        "Sakhashree Neeta presents Rudraksha to film actress Madhoo Shah.",
    },
    {
      imgSrc: "sample.jpg",
      description:
        "Sakhashree Neeta with Dubai Channel Partner Mr Vinod Nambiar at Skanda Yoga Centre.",
    },
    {
      imgSrc: "sample.jpg",
      description:
        "Sakhashree Neeta with Veteran actress Anita Raj from Indian Cinema.",
    },
  ];

  const awards = [
    {
      imgSrc: "sample.jpg",
      description:
        "Life Insurance Corporation of India honoured Sakhashree Neeta on International Women’s Day.",
    },
    {
      imgSrc: "sample.jpg",
      description: "Business & Service Excellence Awards 2012.",
    },
    {
      imgSrc: "sample.jpg",
      description: "Planetary Gemologists Association.",
    },
    {
      imgSrc: "sample.jpg",
      description:
        "Felicitated by Kr. Ritu Singh, trustee DPS ( Jammu and Katra).",
    },
  ];

  return (
    <Box className="bg-background-secondary" sx={{ py: 4 }}>
      <Box sx={{ pb: 4 }}>
        <Container>
          <Grid container>
            <Grid xs={12}>
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ textAlign: "center", pb: 2 }}
                >
                  About Us
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1rem", lineHeight: 1.6 }}
                >
                  One Eyed Coconut was founded in the year 2025 in Rajasthan,
                  India. It commands excellence at the forefront of Rudraksha
                  and spiritual products and services worldwide's distribution.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 4 }} className="flex items-center bg-background-white">
        <Container>
          <Grid container marginBlock={0}>
            <Grid xs={12} md={8}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  To eliminate sin, pain, and suffering from humanity worldwide.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  To spread awareness about the profound benefits of Rudraksha
                  beads and Gemstones in promoting healing, success, and
                  self-empowerment.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  To enlighten people with ancient Vedic spiritual wisdom so
                  that it leads to upliftment of human consciousness.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  To provide the best quality Rudraksha, gemstones, and
                  spiritual products with proper usage guidelines for maximal
                  benefit and at affordable prices.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  To promote continual study and research on spiritual sciences
                  and spiritual products so that the knowledge may benefit all.
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} md={4}>
              <Box bgcolor="primary.main" color="primary.contrastText" p={3}>
                <Typography variant="h4" gutterBottom>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  To become a global supplier of Rudraksha, gemstones, Yantra,
                  Parad, as well as ritual and spiritual accessories.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  To establish a worldwide network of healers that promote RRCT
                  and Chakra Vastu.
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  To be the beacon of enlightenment for global consciousness.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box py={4} bgcolor="grey.100">
        <Container>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Photo Gallery
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Events" />
            <Tab label="Awards" />
          </Tabs>
          <Box mt={4}>
            {tabValue === 0 && (
              <Grid container spacing={3}>
                {events.map((event, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ maxHeight: "250px", objectFit: "cover" }}
                        image={event.imgSrc}
                        alt={event.description}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="body2">
                          {event.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {tabValue === 1 && (
              <Grid container spacing={3}>
                {awards.map((award, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ maxHeight: "250px", objectFit: "cover" }}
                        image={award.imgSrc}
                        alt={award.description}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="body2">
                          {award.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "grey.100", py: 4 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Image
                  src="/sample.jpg"
                  alt="Rudraksha Ratna Team"
                  width={500}
                  height={400}
                  loading="lazy" />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Our Team
                </Typography>
                <Typography paragraph>
                  Our diverse teams of 100+ staff work together to fulfill the
                  company's vision and goal. Some of our departments include
                  Client Coordination, Artisans, Inventory Management, Order
                  Processing, Packaging and Handling, Dispatch, Web Design and
                  Development, SEO and Content Creation, and Accounts. Each and
                  every department is interconnected and functions in harmony.
                </Typography>
                <Typography paragraph>
                  We have an in-house design team of 12 expert artisans trained
                  in thread, gold, and silver work who follow the Rudraksha
                  stringing instructions detailed in our holy scriptures to
                  create powerful and effective combinations of Rudraksha beads
                  and gemstones in bracelets, malas, pendants, and rings as
                  requested by clients. Additionally, we have an in-house
                  manufacturing facility with skilled 14 artisans who create
                  Yantras and other sacred items as well as Vastu products
                  according to strict Vedic guidelines and procedures such as
                  Pran Prathistha.
                </Typography>
                <Button variant="contained" href="/coming-soon" sx={{ mt: 2 }}>
                  View Team
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "#f8f9fa", py: 4 }}>
        <Container>
          {/* Why Choose Us Section */}
          <Box mb={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Typography variant="h6" gutterBottom>
                  Why Choose Us?
                </Typography>
                <Typography>
                  World’s Oldest & Most Trusted Website on Rudraksha, Gemstone,
                  Pujas, Spiritual Products & Services.
                  <br />
                  Achieve Healing, Empowerment & Success With RRCT.
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Feature
                      icon={
                        <AdminPanelSettingsIcon
                          sx={{ color: "primary.main", fontSize: 30 }}
                        />
                      }
                      text="Credibility Since 1997"
                    />
                    <Feature
                      icon={
                        <LocalShippingIcon
                          sx={{ color: "primary.main", fontSize: 30 }}
                        />
                      }
                      text="Fastest Delivery"
                    />
                    <Feature
                      icon={
                        <PeopleIcon
                          sx={{ color: "primary.main", fontSize: 30 }}
                        />
                      }
                      text="Expert Advise & Counselling"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Feature
                      icon={
                        <AdminPanelSettingsIcon
                          sx={{ color: "primary.main", fontSize: 30 }}
                        />
                      }
                      text="Worldwide Distribution"
                    />
                    <Feature
                      icon={
                        <AdminPanelSettingsIcon
                          sx={{ color: "primary.main", fontSize: 30 }}
                        />
                      }
                      text="Vedic Pooja Energisation"
                    />
                    <Feature
                      icon={
                        <AdminPanelSettingsIcon
                          sx={{ color: "primary.main", fontSize: 30 }}
                        />
                      }
                      text="Over 100,000+ Testimonials"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Newsletter Subscription Section */}
          <Box>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={2}>
                <Typography variant="h6">Join Our Newsletter</Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      placeholder="Enter your full name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      placeholder="Enter your email"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        height: "100%",
                        minHeight: "50px",
                      }}
                    >
                      Subscribe
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

const Feature = ({ icon, text }) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Box sx={{ mr: 2 }}>{icon}</Box>
    <Typography>{text}</Typography>
  </Box>
);
