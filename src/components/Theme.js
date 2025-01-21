import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#113065",
    },
    secondary: {
      main: "#EAE2C6",
      sec: "#F9F9F3",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default theme;
