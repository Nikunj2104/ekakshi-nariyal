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
  Close,
} from "@mui/icons-material";
import { logout, setSearchQuery } from "@/redux/actions/authActions";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hasValue, setHasValue] = useState(false);
  const [truncatedQuery, setTruncatedQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [viewWithHamburger, setViewWithHamburger] = useState(
    typeof window !== "undefined" ? window.innerWidth < 900 : false
  );
  const [searchQuery, setSearchQueryState] = useState("");

  // Usecase: Logo should not overlap with the search bar
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 600 : false
  );

  const desktopSearchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const newViewWithHamburger = window.innerWidth < 900;
      const newIsSmallScreen = window.innerWidth < 600;
      if (newViewWithHamburger !== viewWithHamburger) {
        clearSearch();
        setDrawerOpen(false);
        setSearchOpen(false);
        setViewWithHamburger(newViewWithHamburger);
      }
      if (newIsSmallScreen !== isSmallScreen) {
        setIsSmallScreen(newIsSmallScreen);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewWithHamburger, isSmallScreen]);

  useEffect(() => {
    if (searchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
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
    setSearchQueryState(query);
    dispatch(setSearchQuery(query));
    setHasValue(!!query);
    setTruncatedQuery(query);
  };

  const clearSearch = () => {
    setSearchQueryState("");
    dispatch(setSearchQuery(""));
    if (desktopSearchInputRef.current?.value) {
      desktopSearchInputRef.current.value = "";
    }
    if (mobileSearchInputRef.current?.value) {
      mobileSearchInputRef.current.value = "";
    }
    setHasValue(false);
    setSearchOpen(false);
    setTruncatedQuery("");
    setIsSearchFocused(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      clearSearch();
      if (desktopSearchInputRef.current) {
        desktopSearchInputRef.current.blur();
      }
    } else if (event.key === "Enter") {
      setSearchOpen(false); // Close search bar on mobile
      if (desktopSearchInputRef.current) {
        desktopSearchInputRef.current.blur(); // Remove focus on desktop
      }
      if (mobileSearchInputRef.current) {
        mobileSearchInputRef.current.blur(); // Remove focus on mobile
      }
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <>
      {/* Backdrop */}
      {(searchOpen || isSearchFocused) && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
          onClick={() => {
            if (!isSearchFocused) {
              setSearchOpen(false);
            }
          }} // Close search bar when clicking outside if not focused
        />
      )}

      {/* Navbar */}
      <AppBar position="sticky" color="secondary" sx={{ zIndex: 1000 }}>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link href="/" passHref>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
                onClick={clearSearch}
              >
                <Image
                  src="/thevedic.webp"
                  alt="Logo"
                  width="40"
                  height="40"
                  style={{ cursor: "pointer" }}
                  loading="lazy"
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
                onClick={clearSearch}
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
            {!searchOpen && truncatedQuery && !isSmallScreen && (
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  backgroundColor: "background.white",
                  borderRadius: 1,
                  px: 1,
                  py: 0.7,
                  maxWidth: "270px",
                  minWidth: "170px",
                  justifyContent: "space-between",
                  "&:hover": {
                    cursor: "pointer",
                    boxShadow: 2,
                  },
                }}
                onClick={(e) => {
                  if (e.target.tagName !== "BUTTON") {
                    toggleSearchBar();
                  }
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    overflow: "hidden",
                  }}
                >
                  <Search sx={{ color: "primary.main" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "primary.main",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {truncatedQuery}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSearch();
                  }}
                  sx={{
                    visibility: hasValue ? "visible" : "hidden",
                    color: "primary.main",
                  }}
                  aria-label="Clear Search"
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            )}

            {/* Search Icon (Mobile - Default) */}
            {!searchOpen && !truncatedQuery && (
              <IconButton
                color="primary"
                onClick={toggleSearchBar}
                aria-label="Open search bar"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <Search />
              </IconButton>
            )}

            {/* Desktop Search Bar */}
            <InputBase
              inputProps={{ ref: desktopSearchInputRef }}
              sx={{
                display: { xs: "none", md: "flex" },
                backgroundColor: "background.white",
                borderRadius: 1,
                px: 2,
                py: 0.7,
                width: "200px",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: 2,
                },
                boxShadow:
                  isSearchFocused || searchOpen
                    ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
                    : "none", // 3D effect when focused or open
                border: "1px solid",
                borderColor:
                  isSearchFocused || searchOpen
                    ? "primary.main"
                    : "transparent", // Border color when focused or open
                transition: "all 0.3s ease", // Smooth transition for animations
              }}
              placeholder="Search"
              startAdornment={<Search sx={{ mr: 1, color: "primary.main" }} />}
              endAdornment={
                <IconButton
                  size="small"
                  onClick={clearSearch}
                  sx={{
                    visibility: hasValue ? "visible" : "hidden",
                    color: "primary.main",
                  }}
                  aria-label="Clear search"
                >
                  <Close fontSize="small" />
                </IconButton>
              }
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
            {isLoggedIn ? (
              <IconButton
                aria-label="Sign in menu icon"
                sx={{ color: "primary.main" }}
                onClick={handleProfileClick}
              >
                <Person />
              </IconButton>
            ) : (
              <Link href="/sign-in" passHref>
                <IconButton
                  aria-label="Sign in menu icon"
                  sx={{ color: "primary.main" }}
                >
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
              inputProps={{ ref: mobileSearchInputRef }}
              fullWidth
              placeholder="Search"
              sx={{
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 1,
                px: 2,
                py: 1,
              }}
              startAdornment={<Search sx={{ mr: 1, color: "primary.main" }} />}
              endAdornment={
                <IconButton
                  size="small"
                  onClick={clearSearch}
                  sx={{
                    visibility: hasValue ? "visible" : "hidden",
                    color: "primary.main",
                  }}
                  aria-label="Clear search"
                >
                  <Close fontSize="small" />
                </IconButton>
              }
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
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
                <Image
                  src="/thevedic.webp"
                  alt="Logo"
                  style={{ height: "40px", cursor: "pointer" }}
                  onClick={clearSearch}
                  loading="lazy"
                />
              </Link>
            </Box>
            <List>
              {links.map((link) => (
                <ListItem
                  key={link.href}
                  disablePadding
                  sx={{ paddingLeft: 2 }}
                  onClick={clearSearch}
                >
                  <Link href={link.href} passHref>
                    <ListItemText primary={link.label} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </AppBar>

      {/* Search Bar when width is less than 600 */}
      {!searchOpen && truncatedQuery && isSmallScreen && (
        <Box
          sx={{
            position: "sticky",
            top: 56,
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "background.white",
            px: 2,
            py: 0.7,
            width: "100%",
            borderBottom: "1px solid grey",
          }}
        >
          <InputBase
            inputProps={{ ref: desktopSearchInputRef }}
            fullWidth
            placeholder="Search"
            startAdornment={<Search sx={{ mr: 1, color: "primary.main" }} />}
            endAdornment={
              <IconButton
                size="small"
                onClick={clearSearch}
                sx={{
                  visibility: hasValue ? "visible" : "hidden",
                  color: "primary.main",
                }}
                aria-label="Clear search"
              >
                <Close fontSize="small" />
              </IconButton>
            }
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
        </Box>
      )}
    </>
  );
}
