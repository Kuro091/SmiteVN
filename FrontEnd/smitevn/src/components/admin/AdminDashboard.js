import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { connect } from "react-redux";
import { createSession, getGods, updateGods } from "../../actions/gods";
import { setAlert } from "../../actions/alert";
import { DataGrid } from "@mui/x-data-grid";
const AdminDashboard = ({
  createSession,
  sessionIdfromStore,
  getGods,
  setAlert,
  gods,
  updateGods,
}) => {
  const columns = [
    { field: "_id", headerName: "Id", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "pantheon", headerName: "Pantheon", width: 150 },
    { field: "godCardUrl", headerName: "God Card", width: 300 },
    { field: "godIconUrl", headerName: "God icon", width: 300 },
    { field: "lore", headerName: "Lore", width: 500 },
    { field: "ability1", headerName: "Ability 1", width: 150 },
    { field: "ability2", headerName: "Ability 2", width: 150 },
    { field: "ability3", headerName: "Ability 3", width: 150 },
    { field: "ability4", headerName: "Ability 4", width: 150 },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (gods) {
      for (const [key, value] of Object.entries(gods)) {
        setRows((rows) => [
          ...rows,
          Object.create({
            id: key,
            _id: value.id,
            pantheon: value.Pantheon,
            name: value.Name,
            godCardUrl: value.godCard_URL,
            godIconUrl: value.godIcon_URL,
            lore: value.Lore,
            ability1: value.Ability1,
            ability2: value.Ability2,
            ability3: value.Ability3,
            ability4: value.Ability4,
          }),
        ]);
      }
    }
  }, [gods]);

  const handleCreateSessionClick = () => {
    createSession();
  };

  const handleGetGodsClick = () => {
    if (sessionIdfromStore) {
      getGods(sessionIdfromStore);
      return;
    }

    setAlert("SessionId missing, click getSession to get this value", "error");
  };

  const handleUpdateGodsClick = () => {
    let isGodsEmpty = true;
    for (var x in gods) {
      isGodsEmpty = false;
    }

    if (!isGodsEmpty) {
      let godsTemp = [];
      for (const [key, value] of Object.entries(gods)) {
        //build abilities obj
        var abilities = [];
        for (let i = 1; i <= 5; i++) {
          var idProp = "AbilityId" + i;
          var abiProp = "Ability_" + i;
          abilities.push({
            _id: value[idProp],
            URL: value[abiProp].URL,
            Summary: value[abiProp].Summary,
            Description: value[abiProp].Description,
          });
        }

        //build gods obj
        let godTemp = {
          _id: value.id,
          name: value.Name,
          ability1: value.AbilityId1,
          ability2: value.AbilityId2,
          ability3: value.AbilityId3,
          ability4: value.AbilityId4,
          ability5: value.AbilityId5,
          pantheon: value.Pantheon,
          pros: value.Pros,
          cons: value.Cons,
          title: value.Title,
          type: value.Type,
          godCardUrl: value.godCard_URL,
          godIconUrl: value.godIcon_URL,
          lore: value.Lore,
        };

        godsTemp.push({
          _id: value.id,
          abilities: abilities,
          god: godTemp,
        });
        
      }
      updateGods(godsTemp);
      setAlert("Done updating!!", "success");
      return;
    }

    setAlert("Gods missing, click getGods to get this value", "error");
  };

  return (
    <Box sx={{ height: "250vh" }}>
      <Grid
        spacing={1}
        container
        sx={{ width: "1200px", padding: 2, overflow: "hidden" }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom component="div">
            Main stuff
          </Typography>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={handleCreateSessionClick}>
              1. Create session
            </Button>
            <Button onClick={handleGetGodsClick}>2. Get Gods</Button>
            <Button onClick={handleUpdateGodsClick}>
              3. Update Gods to DB
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={12}>
          <TextField
            sx={{ width: "100%" }}
            disabled
            id="outlined-disabled"
            label="SessionId"
            value={sessionIdfromStore}
          />
        </Grid>

        <Grid item sx={{ height: 500 }} xs={12}>
          <DataGrid pagination rows={rows} columns={columns}></DataGrid>
        </Grid>
      </Grid>
    </Box>
  );
};

AdminDashboard.propTypes = {};

export default connect(
  (state) => ({
    sessionIdfromStore: state.gods.sessionId,
    gods: state.gods.gods,
  }),
  { createSession, getGods, setAlert, updateGods }
)(AdminDashboard);
