"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/Header";
import theme from "@/components/Theme";
import "./globals.css"; // Tailwind or global styles
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/oneeye-removebg.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        <title>One Eye Coconut</title>
      </head>

      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline ensures Material-UI's styles reset */}
            <CssBaseline />

            <Header />
            <main>{children}</main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
