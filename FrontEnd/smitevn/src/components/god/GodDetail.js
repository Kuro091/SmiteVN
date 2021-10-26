import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getGod } from "../../actions/gods";
import { connect } from "react-redux";
import { Box, Grid, Tab, Tabs, TextField } from "@mui/material";
import { objectHasData } from "../../utilities/index";
import AbilityPanel from "./AbilityPanel";
import OverviewPanel from "./OverviewPanel";

const GodDetail = ({ godData, translatedGodData }) => {
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} sx={{ flexGrow: 2, whiteSpace: "pre-wrap" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Abilities" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <OverviewPanel
        value={value}
        index={0}
        godData={godData}
        translatedGodData={translatedGodData}
      />
      <AbilityPanel
        value={value}
        index={1}
        godData={godData}
        translatedGodData={translatedGodData}
      />
    </Box>
  );
};

GodDetail.propTypes = {};

export default connect(null, null)(GodDetail);
