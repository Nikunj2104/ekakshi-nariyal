import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xxs: 498, // Mainly for 2 column layout
      sm: 600,
      xmd: 664, // Mainly for 2 column layout
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: { main: "#113065" },
    secondary: { main: "#EAE2C6" },
    background: { white: "#FFFFFF", secondary: "#F9F9F3" },
    text: { primary: "#000000", secondary: "#ADB5BD" },
    star: { primary: "#DE7921" },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    navFont: { fontFamily: "'Macondo', cursive" },
  },
});

export default theme;
