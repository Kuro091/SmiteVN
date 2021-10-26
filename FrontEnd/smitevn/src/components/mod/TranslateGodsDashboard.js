import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { getGodsFromLocal } from "../../actions/gods";
import { setAlert } from "../../actions/alert";
import { GodCard } from "../god/index";
import TranslateGodsForm from "./TranslateGodsForm";
import { getGod } from "../../actions/gods";
import { CLEAR_GOD_LOCAL } from "../../actions/types";
import store from "../../store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TranslateGodsDashboard = ({
  getGodsFromLocal,
  setAlert,
  gods,
  getGod,
  translateGodData,
  godData,
  user
}) => {
  const handleGetGodsClick = () => {
    getGodsFromLocal();
  };
  const [open, setOpen] = useState(false);
  const [godId, setGodId] = useState("");

  useEffect(() => {
    store.dispatch({
      type: CLEAR_GOD_LOCAL,
      payload: "",
    });
    getGod(godId);
  }, [godId, open]);

  return (
    <Box sx={{ height: "1900px" }}>
      <Grid
        spacing={1}
        container
        sx={{
          alignContent: "center",
          width: "1500px",
          padding: 2,
          overflow: "hidden",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom component="div">
            First step
          </Typography>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={handleGetGodsClick}>Get Gods</Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={12}>
          <Alert severity={gods.length > 1 ? "success" : "error"}>
            {gods.length > 1 ? (
              <span>Data loaded for: {gods.length} gods</span>
            ) : (
              "No gods loaded"
            )}
          </Alert>
        </Grid>
        <Grid item sx={{ height: 50 }} xs={12}>
          <Divider variant="fullWidth"></Divider>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" gutterBottom component="div">
            Translate zone
          </Typography>
        </Grid>
        {gods.length > 1 &&
          gods.map((god) => (
            <GodCard setGodId={setGodId} setOpen={setOpen} godData={god} />
          ))}
      </Grid>

      <Dialog
        TransitionComponent={Transition}
        fullWidth
        maxWidth="lg"
        keepMounted
        open={open}
        onClose={() => {
          store.dispatch({
            type: CLEAR_GOD_LOCAL,
            payload: "",
          });
          setOpen(false);
        }}
      >
        <DialogContent>
          <TranslateGodsForm
            godData={godData.god}
            translatedGodData={translateGodData}
            setOpen={setOpen}
            open={open}
            user={user}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

TranslateGodsDashboard.propTypes = {};

export default connect(
  (state) => {
    if (state.gods.god) {
      if (typeof state.gods.god.translateData !== "undefined") {
        return {
          gods: state.gods.gods,
          godData: state.gods.god,
          translateGodData: state.gods.god.translateData[0],
          user: state.auth.user
        };
      } else {
        return {
          gods: state.gods.gods,
          godData: state.gods.god,
          translateGodData: {},
          user: state.auth.user
        };
      }
    }
    return {
      gods: state.gods.gods,
      godData: {},
      translateGodData: [],
      user: state.auth.user
    };
  },
  { getGodsFromLocal, setAlert, getGod }
)(TranslateGodsDashboard);
