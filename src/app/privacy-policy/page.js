import React from "react";
import {
  Container,
  Typography,
  Link,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", color: "primary.dark" }}
        >
          Privacy Policy
        </Typography>

        <Typography
          paragraph
          align="center"
          sx={{ fontSize: "1.1rem", color: "text.primary" }}
        >
          Thank you for visiting The Vedic Wellness (
          <Link
            href="https://thevedicwellness.com"
            target="_blank"
            color="primary"
          >
            thevedicwellness.com
          </Link>
          )!
        </Typography>

        <Typography paragraph>
          Your privacy is important to us. At The Vedic Wellness, we prioritize
          customer trust and transparency. This Privacy Policy outlines the type
          of information we collect, how we use it, and the choices you have.
        </Typography>

        <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Collection and Use of Information
          </Typography>
          <Typography paragraph>
            You can browse our website without providing personal details. If
            you choose to share information, we may collect:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Facilitate purchases and provide requested services" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Confirm and track orders" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Respond to inquiries and support requests" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Improve website functionality and user experience" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Prevent fraud and enhance security measures" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Understand customer preferences and trends" />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mt: 3, bgcolor: "background.paper", p: 2, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Sharing of Information
          </Typography>
          <Typography paragraph>
            We may share your personal information with trusted third-party
            service providers for:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Payment processing and order fulfillment" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Web hosting, analytics, and customer support" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Marketing and promotional activities" />
            </ListItem>
          </List>
          <Typography paragraph>
            We ensure that these providers adhere to strict privacy policies and
            use the data only for authorized purposes.
          </Typography>
        </Box>

        <Box sx={{ mt: 3, bgcolor: "background.paper", p: 2, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Cookies and Tracking Technologies
          </Typography>
          <Typography paragraph>
            We use cookies and similar technologies to enhance your experience.
            These help us:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Improve website performance and functionality" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Analyze visitor behavior and traffic patterns" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Personalize content and marketing efforts" />
            </ListItem>
          </List>
          <Typography paragraph>
            You can manage cookie preferences in your browser settings.
          </Typography>
        </Box>

        <Box sx={{ mt: 3, bgcolor: "background.paper", p: 2, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Accessing and Updating Your Information
          </Typography>
          <Typography paragraph>
            If you wish to access, update, or delete your personal data, please
            contact us at: {" "}
          </Typography>
          <Typography>
            <Link href="mailto:praveenbharadiya@gmail.com" color="primary">
              praveenbharadiya@gmail.com
            </Link>
          </Typography>
        </Box>

        <Typography paragraph align="center" sx={{ mt: 3, fontWeight: "bold" }}>
          We respect your privacy and do not sell or trade personal information.
          Your trust is our priority.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
