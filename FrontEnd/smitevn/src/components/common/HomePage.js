import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { Box, Dialog, DialogContent, Grid, Slide } from "@mui/material";
import { connect } from "react-redux";
import { GodCard, GodDetail } from "../god";
import { getGodsFromLocal, getGod } from "../../actions/gods";
import { CLEAR_GOD_LOCAL } from "../../actions/types";
import store from "../../store";

const HomePage = ({
  gods,
  getGodsFromLocal,
  godData,
  translateGodData,
  getGod,
}) => {

  const [open, setOpen] = useState(false);
  const [godId, setGodId] = useState(false);

  useEffect(() => {
    getGodsFromLocal();

    store.dispatch({
      type: CLEAR_GOD_LOCAL,
      payload: "",
    });
    getGod(godId);
  }, [getGod, godId]);

  

  return (
    <Box sx={{ paddingLeft: "250px" }}>
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
        {gods.length > 1 &&
          gods.map((god) => (
            <GodCard setGodId={setGodId} setOpen={setOpen} godData={god} />
          ))}

        <Dialog
          fullWidth
          maxWidth="lg"
          keepMounted
          open={open}
          onClose={() => {
            console.log("GOT IN TO HERE WITH OPEN IS FALSE");
            setOpen(false);
          }}
        >
          <DialogContent>
            <GodDetail
              godData={godData.god}
              translatedGodData={translateGodData}
              open={open}
            />
          </DialogContent>
        </Dialog>
      </Grid>
    </Box>
  );
};

HomePage.propTypes = {};

export default connect(
  (state) => {
    if (state.gods.god) {
      if (typeof state.gods.god.translateData !== "undefined") {
        return {
          gods: state.gods.gods,
          godData: state.gods.god,
          translateGodData: state.gods.god.translateData[0],
        };
      } else {
        return {
          gods: state.gods.gods,
          godData: state.gods.god,
          translateGodData: {},
        };
      }
    }
    return {
      gods: state.gods.gods,
      godData: {},
      translateGodData: {},
    };
  },
  { getGodsFromLocal, getGod }
)(HomePage);
