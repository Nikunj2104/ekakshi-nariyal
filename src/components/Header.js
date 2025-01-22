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
  Typography,
} from "@mui/material";
import { Person, Search, ShoppingCart, Menu } from "@mui/icons-material";
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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

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

  // Close Hamburger menu and Search bar on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setDrawerOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppBar position="sticky" color="secondary" sx={{ boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Link href="/" passHref>
            <img
              src="/oneeye-removebg.png"
              alt="Logo"
              style={{ height: "40px", cursor: "pointer" }}
            />
          </Link>
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "primary.main",
              lineHeight: 1.3,
            }}
          >
            <span style={{ display: "block" }}>One Eye</span>
            <span style={{ display: "block" }}>Coconut</span>
          </Typography>
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, ml: "auto" }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <Button color="primary" sx={{ fontWeight: 500 }}>
                {link.label}
              </Button>
            </Link>
          ))}
        </Box>

        {/* Action Icons */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 0.5, md: 2 },
            alignItems: "center",
            marginLeft: "16px",
          }}
        >
          {/* Search Icon (Mobile) */}
          <IconButton
            color="primary"
            onClick={toggleSearchBar}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Search />
          </IconButton>

          {/* Desktop Search Bar */}
          <InputBase
            ref={searchInputRef}
            sx={{
              display: { xs: "none", md: "flex" },
              backgroundColor: "background.default",
              borderRadius: 1,
              px: 2,
              py: 0.7,
              width: "200px",
              "&:hover": {
                boxShadow: 2,
              },
            }}
            placeholder="Search"
            startAdornment={<Search sx={{ mr: 1, color: "primary.main" }} />}
          />

          <Link href="/login" passHref>
            <IconButton color="primary">
              <Person />
            </IconButton>
          </Link>

          <IconButton color="primary">
            <ShoppingCart />
          </IconButton>

          {/* Hamburger Menu */}
          <IconButton
            color="primary"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "56px",
            left: 0,
            width: "100%",
            bgcolor: "background.default",
            boxShadow: 2,
            px: 2,
            py: 1,
          }}
        >
          <InputBase
            ref={searchInputRef}
            fullWidth
            placeholder="Search"
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 1,
              px: 2,
              py: 1,
            }}
          />
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <Link href="/" passHref>
              <img
                src="/oneeye-removebg.png"
                alt="Logo"
                style={{ height: "40px", cursor: "pointer" }}
              />
            </Link>
          </Box>
          <List>
            {links.map((link) => (
              <ListItem key={link.href} disablePadding sx={{ paddingLeft: 2 }}>
                <Link href={link.href} passHref>
                  <ListItemText primary={link.label} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
