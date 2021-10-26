import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";

const AbilityPanel = ({ value, index, godData, translatedGodData, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fragment>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <img src={godData?.ability1?.URL} />
            <TextField
              sx={{ width: "80%" }}
              multiline
              rows={4}
              label={godData?.ability1?.Summary}
              variant="standard"
              value={
                godData?.ability1?.Description?.itemDescription.description
              }
              name="ability1"
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <img src={godData?.ability2?.URL} />
            <TextField
              sx={{ width: "80%" }}
              multiline
              rows={4}
              label={godData?.ability2?.Summary}
              variant="standard"
              value={
                godData?.ability2?.Description?.itemDescription.description
              }
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <img src={godData?.ability3?.URL} />
            <TextField
              sx={{ width: "80%" }}
              multiline
              rows={4}
              label={godData?.ability3?.Summary}
              variant="standard"
              value={
                godData?.ability3?.Description?.itemDescription.description
              }
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <img src={godData?.ability4?.URL} />
            <TextField
              sx={{ width: "80%" }}
              multiline
              rows={4}
              label={godData?.ability4?.Summary}
              variant="standard"
              value={
                godData?.ability4?.Description?.itemDescription.description
              }
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <img sx={{ maxWidth: "10px" }} src={godData?.ability5?.URL} />
            <TextField
              sx={{ width: "80%" }}
              multiline
              rows={4}
              label={godData?.ability5?.Summary}
              variant="standard"
              value={
                godData?.ability5?.Description?.itemDescription.description
              }
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Box>
        </Fragment>
      )}
    </div>
  );
};

AbilityPanel.propTypes = {};

export default AbilityPanel;
