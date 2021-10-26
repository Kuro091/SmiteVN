import React, { Fragment, useState } from "react";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  MenuList,
} from "@mui/material";
import { Roles } from "../../config";
import { styled } from "@material-ui/core";
import { useTheme } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { connect } from "react-redux";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const LeftNav = ({ handleDrawerClose, open, drawerWidth, user }) => {
  /**
   * ADMIN PART
   */
  const [openAdmin, setOpenAdmin] = useState(true);
  const [openMod, setOpenMod] = useState(true);

  const AdminButtons = (
    <div>
      <MenuItem
        sx={{ width: drawerWidth, display: "inline-block" }}
        onClick={() => {
          setOpenAdmin(!openAdmin);
        }}
      >
        AdminStuff
        {openAdmin ? (
          <ExpandLess sx={{ float: "right" }} />
        ) : (
          <ExpandMore sx={{ float: "right" }} />
        )}
      </MenuItem>
      <Collapse in={openAdmin} timeout="auto" unmountOnExit>
        <MenuList disablePadding>
          <MenuItem sx={{ pl: 4, pt: 1 }} component={Link} to="/manage/admin">
            Gods Stuff
          </MenuItem>
          <MenuItem sx={{ pl: 4, pt: 1 }} component={Link} to="/manage/users">
            User Manager
          </MenuItem>
        </MenuList>
      </Collapse>
    </div>
  );

  /**
   * MODERATOR PART
   */
  const ModeratorButtons = (
    <div>
      <MenuItem
        sx={{ width: drawerWidth, display: "inline-block" }}
        onClick={() => {
          setOpenMod(!openMod);
        }}
      >
        Manager Stuff
        {openMod ? (
          <ExpandLess sx={{ float: "right" }} />
        ) : (
          <ExpandMore sx={{ float: "right" }} />
        )}
      </MenuItem>
      <Collapse in={openMod} timeout="auto" unmountOnExit>
        <MenuList disablePadding>
          <MenuItem sx={{ pl: 4, pt: 1 }} component={Link} to="/manage/translate">
            Translate Gods
          </MenuItem>
        </MenuList>
      </Collapse>
    </div>
  );

  /**
   * GUEST PART
   */

  const GuestButtons = (
    <MenuItem
      sx={{ width: drawerWidth, display: "inline-block" }}
      component={Link}
      to="/"
    >
      GuestStuff
    </MenuItem>
  );

  const theme = useTheme();
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  return (
    <Drawer
      anchor="left"
      variant="persistent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          zIndex: "3",
        },
      }}
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <MenuList>
        {user?.role == Roles.ADMIN && AdminButtons}
        {(user?.role == Roles.ADMIN || user?.role == Roles.MODERATOR) &&
          ModeratorButtons}
        {GuestButtons}
      </MenuList>
    </Drawer>
  );
};

LeftNav.propTypes = {};

export default connect(
  (state) => ({
    user: state.auth.user,
  }),
  null
)(LeftNav);
