"use client";

import {
  AppBar,
  Toolbar,
  Button,
  InputBase,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Search, ShoppingCart, Menu } from "@mui/icons-material";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  // Toggle drawer/Hamburger Menu open/close
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Toggle search bar visibility and focus on it
  const toggleSearchBar = () => {
    setSearchOpen((prev) => !prev);
  };

  // Automatically focus on search input when search bar opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      // To Do: Not working
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search bar on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setDrawerOpen(false); // Automatically close Drawer on larger screens
        setSearchOpen(false); // Automatically close Search on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <AppBar position="sticky" style={{ backgroundColor: "#113065" }}>
        <Toolbar className="flex items-center justify-between w-full">
          {/* Logo */}
          <Box className="flex items-center space-x-4">
            <Link href="/" passHref>
              <img
                src="/logo.jpg"
                alt="MyLogo"
                className="h-10 cursor-pointer"
              />
            </Link>
          </Box>

          {/* Search Bar and Cart Icon */}
          <Box
            className="flex items-center ml-auto space-x-4"
            sx={{ display: "flex" }} // Make sure both are visible on mobile
          >
            {/* Navigation Links (Desktop) */}
            <Box
              className="space-x-4" // Right-aligned links
              sx={{ display: { xs: "none", md: "flex" }, ml: "auto" }} // Ensures links are right-aligned
            >
              {links.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <Button color="inherit">{link.label}</Button>
                </Link>
              ))}
            </Box>

            {/* Search Icon */}
            <IconButton
              color="inherit"
              sx={{ display: { xs: "block", md: "none" } }} // Visible on mobile
              onClick={toggleSearchBar}
            >
              <Search />
            </IconButton>

            {/* Desktop Search Bar */}
            <InputBase
              className="bg-white rounded-md p-1 w-48 md:w-72"
              sx={{ display: { xs: "none", md: "flex" } }}
              placeholder="Search"
              startAdornment={<Search sx={{ marginRight: 1 }} />}
            />

            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>

            {/* Cart Icon */}
            <IconButton color="inherit">
              <ShoppingCart />
            </IconButton>

            {/* Hamburger Menu (Hidden on Desktop) */}
            <IconButton
              color="inherit"
              sx={{ display: { xs: "block", md: "none" } }} // Visible on mobile
              onClick={toggleDrawer(true)}
            >
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Search Input (Mobile - Sticky like Navbar) */}
      {searchOpen && (
        <div className="sticky top-0 z-50 w-full bg-white shadow-md">
          <InputBase
            ref={searchInputRef}
            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 p-3"
            placeholder="Search"
          />
        </div>
      )}

      {/* Drawer (Hamburger Menu) for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Logo inside Drawer */}
          <Box className="flex justify-center py-4">
            <Link href="/" passHref>
              <img src="/logo.jpg" alt="MyLogo" className="h-10" />
            </Link>
          </Box>

          <List>
            <ListItem button>
              <Link href="/" passHref>
                <ListItemText primary="Home" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link href="/about" passHref>
                <ListItemText primary="About" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link href="/contact" passHref>
                <ListItemText primary="Contact" />
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
