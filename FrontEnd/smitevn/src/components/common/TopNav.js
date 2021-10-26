import React, { Fragment, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import OfflineBoltRoundedIcon from "@mui/icons-material/OfflineBoltRounded";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import img from "../img/smite-logo.png";
import { Paper, styled } from "@material-ui/core";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const TopNav = ({ isAuthenticated, logout, handleDrawerOpen, handleDrawerClose, open }) => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(e.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = (e) => {
    setProfileAnchorEl(e.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuProfileId = "menu-account";
  const renderProfileMenu = (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuProfileId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {!isAuthenticated && (
        <MenuItem component={Link} to="/login">
          <Typography variant="button">Login</Typography>
        </MenuItem>
      )}
      {isAuthenticated && (
        <MenuItem onClick={logout}>
          <Typography variant="button">Logout</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <IconButton color="inherit">
        <OfflineBoltRoundedIcon fontSize="small" />
        <span style={{ marginLeft: "0.3em" }}>All gods /</span>
      </IconButton>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle fontSize="small" />
        <span style={{ marginLeft: "0.3em" }}>Account actions </span>
      </IconButton>
    </Menu>
  );

  return (
    <Fragment>
      <AppBar
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7);",
          bottom: 0,
          position: "absolute",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              textDecoration: "none",
              color: "white",
              display: "inline-flex",
            }}
            component={Link}
            to="/"
          >
            <Box
              sx={{
                backgroundImage: `url(${img})`,
                backgroundPosition: "center",
                height: "50px",
                width: "150px",
                backgroundRepeat: "no-repeat",
                display: { xs: "none", md: "flex" },
              }}
            />
            <Box
              sx={{
                marginTop: "5px",
                marginLeft: "15px",
              }}
            >
              <Typography
                sx={{
                  display: { xs: "none", sm: "block" },
                  "&:hover": { backgroundColor: "white", color: "black" },
                }}
                variant="h5"
                noWrap
              >
                Smite Việt Nam
              </Typography>
            </Box>
          </Box>

          {/* Search box here*/}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton color="inherit">
              <OfflineBoltRoundedIcon fontSize="large" />{" "}
              <span style={{ marginLeft: "0.3em" }}>All gods /</span>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle fontSize="large" />
              <span style={{ marginLeft: "0.3em" }}>Account actions </span>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderProfileMenu}
    </Fragment>
  );
};

TopNav.propTypes = {};

export default connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
  { logout }
)(TopNav);
