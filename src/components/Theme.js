import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#113065", // Customize primary color
    },
    secondary: {
      main: "#FFC107", // Customize secondary color
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  components: {
    // You can customize Material UI components globally here (e.g. Button, AppBar)
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "8px 16px",
        },
      },
    },
  },
});

export default theme;
