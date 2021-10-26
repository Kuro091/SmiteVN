import React from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";
import { objectHasData } from "../../utilities";

const OverviewPanel = ({ value, index, godData, translatedGodData, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <TextField
            sx={{ width: "80%" }}
            label="Name"
            variant="standard"
            value={
              objectHasData(translatedGodData)
                ? translatedGodData.name
                : godData?.name
            }
            InputLabelProps={{ shrink: true }}
            disabled
          />
          <TextField
            sx={{ width: "80%" }}
            label="Title"
            value={
              objectHasData(translatedGodData)
                ? translatedGodData.title
                : godData?.title
            }
            InputLabelProps={{ shrink: true }}
            variant="standard"
            disabled
          />
          <TextField
            sx={{ width: "80%" }}
            label="Pros"
            value={godData?.pros}
            InputLabelProps={{ shrink: true }}
            variant="standard"
            disabled
          />
          <TextField
            sx={{ width: "80%" }}
            label="Cons"
            value={godData?.cons}
            InputLabelProps={{ shrink: true }}
            variant="standard"
            disabled
          />
          <TextField
            sx={{ width: "80%" }}
            label="Type"
            value={godData?.type}
            InputLabelProps={{ shrink: true }}
            variant="standard"
            disabled
          />
          <TextField
            sx={{ width: "91.5%" }}
            multiline
            rows={7}
            label="Lore"
            variant="standard"
            value={godData?.lore}
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>
      )}
    </div>
  );
};

OverviewPanel.propTypes = {};

export default OverviewPanel;
