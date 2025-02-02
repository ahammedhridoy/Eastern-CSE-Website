"use client";
import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context/GlobalContext";
import { Toaster } from "react-hot-toast";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElAcademics, setAnchorElAcademics] = React.useState(null);
  const { userLogout, user } = useContext(GlobalContext);
  const router = useRouter();

  const pages = [
    "Home",
    "Programs",
    "Admission",
    "Events",
    "Faculty",
    "Gallery",
    "About",
    "Contact",
    `${!user ? "Login" : ""}`,
  ];
  const settings = ["Dashboard", "Logout"];

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleOpenAcademicsMenu = (event) =>
    setAnchorElAcademics(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseAcademicsMenu = () => setAnchorElAcademics(null);

  return (
    <div className="Navigation lg:mb-[69px] md:mb-[64px] mb-[57px]">
      <Toaster />
      <AppBar position="fixed" sx={{ backgroundColor: "#212937" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href={"/"} className="hidden lg:flex lg:mr-16">
              <Image
                src="/images/global/eucselogo.png"
                alt="logo"
                width={120}
                height={120}
              />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      href={`/${page === "Home" ? "" : page.toLowerCase()}`}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Image
                src="/images/global/eucselogo.png"
                alt="logo"
                width={120}
                height={120}
              />
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              <Link href="/">
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    letterSpacing: "1px",
                  }}
                  className="hover:text-[var(--primary-color)]"
                >
                  Home
                </Button>
              </Link>

              {/* Academics Dropdown */}
              <Button
                onClick={handleOpenAcademicsMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  letterSpacing: "1px",
                }}
                className="hover:text-[var(--primary-color)]"
              >
                Academics <ArrowDropDownIcon />
              </Button>
              <Menu
                anchorEl={anchorElAcademics}
                open={Boolean(anchorElAcademics)}
                onClose={handleCloseAcademicsMenu}
              >
                <MenuItem onClick={handleCloseAcademicsMenu}>
                  <Link href="/programs">Programs</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseAcademicsMenu}>
                  <Link href="/admission">Admission</Link>
                </MenuItem>
              </Menu>

              <Link href="/events">
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    letterSpacing: "1px",
                  }}
                  className="hover:text-[var(--primary-color)]"
                >
                  Events
                </Button>
              </Link>

              <Link href="/faculty">
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    letterSpacing: "1px",
                  }}
                  className="hover:text-[var(--primary-color)]"
                >
                  Faculty
                </Button>
              </Link>

              <Link href="/gallery">
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    letterSpacing: "1px",
                  }}
                  className="hover:text-[var(--primary-color)]"
                >
                  Gallery
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    letterSpacing: "1px",
                  }}
                  className="hover:text-[var(--primary-color)]"
                >
                  About
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    letterSpacing: "1px",
                  }}
                  className="hover:text-[var(--primary-color)]"
                >
                  Contact
                </Button>
              </Link>

              {!user && (
                <Link href="/login">
                  <Button
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      letterSpacing: "1px",
                    }}
                    className="hover:text-[var(--primary-color)]"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Box>

            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User"
                      className="border-2 rounded-full"
                      src="/images/global/user-icon.png"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting === "Logout") userLogout();
                        else if (setting === "Dashboard")
                          router.push("/dashboard");
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navigation;
