import React from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  Box,
  Link,
} from "@mui/material";

const ShippingAndDelivery = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
        >
          Shipping & Delivery Policy
        </Typography>

        <Typography paragraph>
          We use the services of <strong>Blue Dart</strong> and{" "}
          <strong>Speed Post</strong> to deliver our orders within India.
        </Typography>
        <Typography paragraph>
          For international orders, we rely on <strong>FEDEX, DHL</strong>, and{" "}
          <strong>Speed Post</strong>.
        </Typography>

        <Typography paragraph>
          We partner with top-tier courier services, ensuring{" "}
          <strong>
            live tracking, door-to-door delivery, dedicated support,
          </strong>{" "}
          and <strong>delivery proof</strong>. In the rare event of a lost
          parcel, we take full responsibility to either replace it or issue a
          full refund.
        </Typography>

        <Typography paragraph>
          Our packaging is highly secure and tamper-proof. In case of any
          transit damage, report it immediately upon receipt by sharing images
          at{" "}
          <Link href="mailto:praveenbharadiya@gmail.com">
            praveenbharadiya@gmail.com
          </Link>{" "}
          to request a replacement.
        </Typography>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Shipping Charges & Estimated Delivery Time
        </Typography>
        <List>
          <ListItem>
            <strong>Free shipping</strong> on orders above INR 2500 within
            India.
          </ListItem>
          <ListItem>
            <strong>Domestic (India)</strong>: 1-2 days via Blue Dart (Metro
            cities: 24 hours). Speed Post may take up to 5 working days.
          </ListItem>
          <ListItem>
            <strong>International</strong>: 2-4 working days via FEDEX/DHL,
            while Speed Post takes 7-14 days (may vary due to customs
            clearance).
          </ListItem>
        </List>

        <Typography paragraph>
          If shipping charges change after checkout due to package dimensions,
          we may deduct minor differences from store credits. For significant
          differences, we will email you with a payment link.
        </Typography>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Customs & Duties
        </Typography>
        <Typography paragraph>
          We declare parcels at minimum value to avoid duties, but any customs
          charges are the recipient’s responsibility. If contacted by customs,
          reach out to us at{" "}
          <Link href="mailto:praveenbharadiya@gmail.com">
            praveenbharadiya@gmail.com
          </Link>{" "}
          for assistance.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ShippingAndDelivery;
