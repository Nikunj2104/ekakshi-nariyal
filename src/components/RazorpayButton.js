import { Button } from "@mui/material";

const RazorpayButton = () => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        const options = {
          key: "rzp_test_iyrBM0qzKRDZIB",
          amount: 1200000, // Amount in paise (12,000 INR)
          currency: "INR",
          name: "Ekakshi Nariyal",
          description: "One Eyed Coconut",
          image: "/one-eye-coconut.webp",
          handler: function (response) {
            alert(
              `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
            );
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#113065",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }}
      sx={{
        backgroundColor: "secondary.main",
        color: "primary.main",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "white",
        },
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      Buy Now
    </Button>
  );
};

export default RazorpayButton;
