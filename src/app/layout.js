"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/Header";
import theme from "@/components/Theme";
import { store } from "@/redux/store";
import "./globals.css"; // Tailwind or global styles

// To solve this usecase: On refresh data between header and footer is not visible for half a second.
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Load Razorpay script
    const razorpayScript = document.createElement("script");
    razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
    razorpayScript.async = true;
    document.body.appendChild(razorpayScript);

    // Load Google Analytics script
    const gtagScript = document.createElement("script");
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-33BT42L6RN";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    const gtag = () => {
      dataLayer.push(arguments);
    };
    window.gtag = gtag;
    window.gtag("js", new Date());
    window.gtag("config", "G-33BT42L6RN");

    // Cleanup
    return () => {
      document.body.removeChild(razorpayScript);
      document.head.removeChild(gtagScript);
    };
  }, [router.events]);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/thevedic.ico" />
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
        <link
          href="https://fonts.googleapis.com/css2?family=Macondo&display=swap"
          rel="stylesheet"
        />

        <title>The Vedic Wellness</title>
      </head>

      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline ensures Material-UI's styles reset */}
            <CssBaseline />

            <Header />

            <main>{children}</main>

            <Footer />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
