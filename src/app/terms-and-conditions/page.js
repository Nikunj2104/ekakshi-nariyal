import { Container, Typography, Paper } from "@mui/material";

export default function TermsAndConditions() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Terms and Conditions
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Introduction
        </Typography>
        <Typography paragraph>
          Welcome to [thevedicwellness.com]! These terms and conditions outline
          the rules and regulations for the use of our website and services.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Intellectual Property Rights
        </Typography>
        <Typography paragraph>
          Unless otherwise stated, [thevedicwellness.com] owns the intellectual
          property rights for all material on this website.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Restrictions
        </Typography>
        <Typography paragraph>
          You are specifically restricted from publishing any website material
          in any other media, selling or commercializing any content, and using
          this website in a way that is damaging or unlawful.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Limitation of Liability
        </Typography>
        <Typography paragraph>
          In no event shall [thevedicwellness.com] be liable for anything
          arising out of or in any way connected with your use of this website.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Governing Law
        </Typography>
        <Typography paragraph>
          These Terms will be governed by and interpreted in accordance with the
          laws of India, and you submit to the jurisdiction of
          the state and federal courts located in Rajasthan.
        </Typography>
      </Paper>
    </Container>
  );
}
