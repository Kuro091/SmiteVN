import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import img from "../img/home-overview-bg.jpg";

import TopNav from "./TopNav";
import { styled } from "@material-ui/core";
const Header = ({ open, drawerWidth, handleDrawerOpen, handleDrawerClose }) => {
  const MyBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <Fragment>
      <MyBox position="relative" open={open}>
        <Paper
          sx={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "60px",
            zIndex: "100",
          }}
        />
        <TopNav
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
      </MyBox>
    </Fragment>
  );
};

Header.propTypes = {};

export default Header;
