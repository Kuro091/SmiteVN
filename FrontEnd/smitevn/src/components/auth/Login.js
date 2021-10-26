import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid, TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Redirect } from "react-router";

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Box sx={{ marginLeft: { xs: "150px", md: "700px"}, width: 500}}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              name="email"
              label="Username here"
              variant="standard"
              value={email}
              onChange={(e) => onChange(e)}
              sx={{ width: 300 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              label="Password here"
              variant="standard"
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              sx={{ width: 300 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ marginTop: 5 }}
            fullWidth
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

Login.propTypes = {};

export default connect(
  (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }),
  { login }
)(Login);
