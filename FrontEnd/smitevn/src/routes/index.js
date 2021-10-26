import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "../utilities";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { Header, NotFound } from "../components/common";
import { Box, Container, CssBaseline, styled } from "@material-ui/core";
import Alert from "../components/common/Alert";
import LeftNav from "../components/common/LeftNav";
import { connect } from "react-redux";
import { loadUser } from "../actions/auth";
import store from "../store";
import { Grid } from "@mui/material";

const Routes = () => {
  const drawerWidth = 240;
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const Main = styled(Grid, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: "240px",
      }),
    })
  );

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router history={history}>
      <Alert />
      <Box sx={{ backgroundColor: "#c9c9c9", height:"1200px"}}>
        <CssBaseline />
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          drawerWidth={drawerWidth}
        />
        <LeftNav
          handleDrawerClose={handleDrawerClose}
          drawerWidth={drawerWidth}
          open={open}
        />
        <Main
          container
          spacing={0}
          bgcolor="#FFFFFF"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "900px",
          }}
          open={open}
        >
          <Grid item xs={12}>
            <Switch>
              <Route path="/manage">
                <PrivateRoutes />
              </Route>
              <Route exact path="">
                <PublicRoutes />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Grid>
        </Main>
      </Box>
    </Router>
  );
};

export default connect((state) => ({
  user: state.auth.user,
}))(Routes);
