import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Person,
  Search,
  ShoppingCart,
  ExitToApp,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { logout, setSearchQuery } from "@/redux/actions/authActions";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setDrawerOpen(false);
        setSearchOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    router.push("/sign-in");
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    router.push("/profile");
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/contact-us", label: "Contact" },
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

  const handleSearchChange = (event) => {
    const query = event.target.value;
    dispatch(setSearchQuery(query)); // Dispatch search query to Redux
  };

  if (typeof window === "undefined") {
    return null; // Prevent server-side rendering
  }

  return (
    <AppBar position="sticky" color="secondary" sx={{ boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/" passHref>
            <Box
              component="a"
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <img
                src="/thevedic.webp"
                alt="Logo"
                style={{ height: "40px", cursor: "pointer" }}
              />
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "primary.main",
                  lineHeight: 1.3,
                  letterSpacing: 0.5,
                  typography: "navFont",
                  mt: 0.4,
                }}
              >
                <span style={{ display: "block" }}>The Vedic</span>
                <span style={{ display: "block" }}>Wellness</span>
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, ml: "auto" }}>
          {links.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              sx={{ fontWeight: 500, color: "primary.main" }}
            >
              {link.label}
            </Button>
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
            aria-label="Open search bar"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Search />
          </IconButton>

          {/* Desktop Search Bar */}
          <InputBase
            inputProps={{ ref: searchInputRef }}
            sx={{
              display: { xs: "none", md: "flex" },
              backgroundColor: "background.white",
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
            onChange={handleSearchChange} // Handle search input changes
          />

          {isLoggedIn ? (
            <IconButton color="primary" onClick={handleProfileClick}>
              <Person />
            </IconButton>
          ) : (
            <Link href="/sign-in" passHref>
              <IconButton color="primary">
                <Person />
              </IconButton>
            </Link>
          )}

          {/* Hamburger Menu */}
          <IconButton
            color="primary"
            onClick={toggleDrawer(true)}
            aria-label="Open menu"
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "profile-menu" }}
        sx={{ mt: { xs: 1.2, sm: 1.6 } }}
      >
        <MenuItem
          onClick={handleProfile}
          sx={{
            padding: "10px 20px",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
          }}
        >
          <Person sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => router.push("/cart")}
          sx={{
            padding: "10px 20px",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
          }}
        >
          <ShoppingCart sx={{ mr: 1 }} />
          Cart
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            padding: "10px 20px",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" },
          }}
        >
          <ExitToApp sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "56px",
            left: 0,
            width: "100%",
            bgcolor: "background.white",
            boxShadow: 2,
            px: 2,
            py: 1,
          }}
        >
          <InputBase
            inputProps={{ ref: searchInputRef }}
            fullWidth
            placeholder="Search"
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 1,
              px: 2,
              py: 1,
            }}
            onChange={handleSearchChange} // Handle search input changes
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
                src="/thevedic.webp"
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
