import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#113065",
    },
    secondary: {
      main: "#EAE2C6",
    },
    background: {
      white: "#FFFFFF",
      secondary: "#F9F9F3",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default theme;
