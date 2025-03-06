import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Link,
} from "@mui/material";

const CancellationAndRefund = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
        >
          Cancellation & Refund Policy
        </Typography>

        <Typography paragraph>
          At Rudra Centre, we offer a transparent and simple 10-day Return &
          Replacement Policy. Please read the conditions below to ensure your
          eligibility.
        </Typography>

        <Box sx={{ bgcolor: "background.default", p: 2, borderRadius: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Conditions for Returns & Replacement
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Items must be in their original, unused condition." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Replacement is subject to inspection by our team." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Damages due to neglect or improper usage are not covered." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Products must include original certificates, invoice, and packaging." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Modifications to the original product void the return policy." />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Note: Shipping charges, VAT, lab certification fees, and custom
            duties are non-refundable.
          </Typography>
        </Box>

        <Box
          sx={{ mt: 3, bgcolor: "background.default", p: 2, borderRadius: 1 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Return Policy for Customized Products
          </Typography>
          <Typography paragraph>
            Customized items cannot be returned for a refund. However, you may
            request store credit worth 75% of the invoice value (excluding
            shipping charges) within 10 days of receiving the product.
          </Typography>
        </Box>

        <Box
          sx={{ mt: 3, bgcolor: "background.default", p: 2, borderRadius: 1 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Important Notes
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Return shipment costs are to be borne by the customer." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Payment gateway fees (if applicable) are non-refundable." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Any paid lab certification fee is non-refundable." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Processing returns may take 7-10 business days from receipt." />
            </ListItem>
          </List>
        </Box>

        <Box
          sx={{ mt: 3, bgcolor: "background.default", p: 2, borderRadius: 1 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Cancellation Policy
          </Typography>
          <Typography paragraph>
            Cancellation requests must be raised before the item has been
            shipped.
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="For Rudraksha or gemstone jewelry, making charges may be deducted." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Paid certification costs will not be refunded upon cancellation." />
            </ListItem>
            <ListItem>
              <ListItemText primary="For customized orders, a deduction may apply based on the production stage." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Refunds are processed within 4-5 working days of cancellation approval." />
            </ListItem>
          </List>
        </Box>

        <Box
          sx={{ mt: 3, bgcolor: "background.default", p: 2, borderRadius: 1 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Refund Process
          </Typography>
          <Typography paragraph>
            If a cancellation request is raised after the item is shipped,
            shipping charges will be deducted from the refund.
          </Typography>
          <Typography paragraph>
            Refunds will be processed back to the original payment method. If
            multiple payments were made, refunds will be issued in the same
            sequence.
          </Typography>
        </Box>

        <Box
          sx={{ mt: 3, bgcolor: "background.default", p: 2, borderRadius: 1 }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            How to Send Return Items?
          </Typography>
          <Typography paragraph>
            We recommend allowing us to arrange for reverse shipping for
            security. If you choose to send the parcel yourself, Rudra Centre is
            not responsible for lost shipments.
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            For international returns, please contact our support team at {" "}
            <Link href="mailto:praveenbharadiya@gmail.com" color="primary">
              praveenbharadiya@gmail.com
            </Link>
            .
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default CancellationAndRefund;
