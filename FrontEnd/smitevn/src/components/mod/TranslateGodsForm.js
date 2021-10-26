import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid, TextField } from "@mui/material";
import { connect } from "react-redux";
import { getGod, updateGodTranslatedData } from "../../actions/gods";
import { CLEAR_GOD_LOCAL } from "../../actions/types";

const TranslateGodsForm = ({
  godData,
  translatedGodData,
  setOpen,
  getGod,
  user,
  updateGodTranslatedData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    pros: "",
    cons: "",
    type: "",
    lore: "",
    ability1: {
      id: "",
      summary: "",
      desc: "",
    },
    ability2: {
      id: "",
      summary: "",
      desc: "",
    },
    ability3: {
      id: "",
      summary: "",
      desc: "",
    },
    ability4: {
      id: "",
      summary: "",
      desc: "",
    },
    ability5: {
      id: "",
      summary: "",
      desc: "",
    },
  });

  const {
    name,
    title,
    pros,
    cons,
    type,
    lore,
    ability1,
    ability2,
    ability3,
    ability4,
    ability5,
  } = formData;

  useEffect(() => {
    setFormData({
      name: "",
      title: "",
      pros: "",
      cons: "",
      type: "",
      lore: "",
      ability1: {
        id: "",
        summary: "",
        desc: "",
      },
      ability2: {
        id: "",
        summary: "",
        desc: "",
      },
      ability3: {
        id: "",
        summary: "",
        desc: "",
      },
      ability4: {
        id: "",
        summary: "",
        desc: "",
      },
      ability5: {
        id: "",
        summary: "",
        desc: "",
      },
    });
    if (
      typeof translatedGodData !== "undefined" &&
      Object.keys(translatedGodData).length !== 0
    ) {
      console.log("NOT UNDEFINED");
      setFormData({
        ...formData,
        name: translatedGodData ? translatedGodData.name : "",
        title: translatedGodData ? translatedGodData.title : "",
        pros: translatedGodData ? translatedGodData.pros : "",
        cons: translatedGodData ? translatedGodData.cons : "",
        type: translatedGodData ? translatedGodData.type : "",
        lore: translatedGodData ? translatedGodData.lore : "",
        ability1: translatedGodData
          ? translatedGodData.ability1
          : { id: "", summary: "", desc: "" },
        ability2: translatedGodData
          ? translatedGodData.ability2
          : { id: "", summary: "", desc: "" },
        ability3: translatedGodData
          ? translatedGodData.ability3
          : { id: "", summary: "", desc: "" },
        ability4: translatedGodData
          ? translatedGodData.ability4
          : { id: "", summary: "", desc: "" },
        ability5: translatedGodData
          ? translatedGodData.ability5
          : { id: "", summary: "", desc: "" },
      });
    } else {
      console.log("UNDEFINED");
      setFormData({
        name: "",
        title: "",
        pros: "",
        cons: "",
        type: "",
        lore: "",
        ability1: "",
        ability2: "",
        ability3: "",
        ability4: "",
        ability5: "",
      });
    }

  }, [godData]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setOpen(false);

    const data = {
      ...formData,
      _id: godData?._id,
      ability1: {
        ...formData.ability1,
        id: godData?.ability1?._id,
      },
      ability2: {
        ...formData.ability2,
        id: godData?.ability2?._id,
      },
      ability3: {
        ...formData.ability3,
        id: godData?.ability3?._id,
      },
      ability4: {
        ...formData.ability4,
        id: godData?.ability4?._id,
      },
      ability5: {
        ...formData.ability5,
        id: godData?.ability5?._id,
      },
      translatedBy: {
        userId: user._id,
        userName: user.name,
      },
    };

    updateGodTranslatedData(data);
  };

  return (
    <Grid container>
      <Grid item xs={6} sx={{ flexGrow: 2 }}>
        <h1> Original data </h1>
        <TextField
          sx={{ width: "80%" }}
          label="Name"
          variant="standard"
          value={godData?.name}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          sx={{ width: "80%" }}
          label="Title"
          value={godData?.title}
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

        {/*---------------------------------------------- ABILITY 1 ----------------------------------------------*/}
        <Box sx={{ marginTop: 5, display: "flex", alignItems: "flex-end" }}>
          <TextField
            sx={{ width: "80%" }}
            label="Ability 1 Title"
            variant="standard"
            value={godData?.ability1?.Summary}
            disabled
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <img src={godData?.ability1?.URL} />
          <TextField
            sx={{ width: "80%" }}
            multiline
            rows={4}
            label="Ability 1 Desc"
            variant="standard"
            value={godData?.ability1?.Description?.itemDescription.description}
            name="ability1"
            disabled
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/*---------------------------------------------- ABILITY 2 ----------------------------------------------*/}
        <Box sx={{ marginTop: 5, display: "flex", alignItems: "flex-end" }}>
          <TextField
            sx={{ width: "80%" }}
            label="Ability 2 Title"
            variant="standard"
            value={godData?.ability2?.Summary}
            disabled
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <img src={godData?.ability2?.URL} />
          <TextField
            sx={{ width: "80%" }}
            multiline
            rows={4}
            label="Ability 2"
            variant="standard"
            value={godData?.ability2?.Description?.itemDescription.description}
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>

        {/*---------------------------------------------- ABILITY 3 ----------------------------------------------*/}
        <Box sx={{ marginTop: 5, display: "flex", alignItems: "flex-end" }}>
          <TextField
            sx={{ width: "80%" }}
            label="Ability 3 Title"
            variant="standard"
            value={godData?.ability3?.Summary}
            disabled
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <img src={godData?.ability3?.URL} />
          <TextField
            sx={{ width: "80%" }}
            multiline
            rows={4}
            label="Ability 3"
            variant="standard"
            value={godData?.ability3?.Description?.itemDescription.description}
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>

        {/*---------------------------------------------- ABILITY 4 ----------------------------------------------*/}
        <Box sx={{ marginTop: 5, display: "flex", alignItems: "flex-end" }}>
          <TextField
            sx={{ width: "80%" }}
            label="Ability 4 Title"
            variant="standard"
            value={godData?.ability4?.Summary}
            disabled
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <img src={godData?.ability4?.URL} />
          <TextField
            sx={{ width: "80%" }}
            multiline
            rows={4}
            label="Ability 4"
            variant="standard"
            value={godData?.ability4?.Description?.itemDescription.description}
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>

        {/*---------------------------------------------- ABILITY 5 ----------------------------------------------*/}
        <Box sx={{ marginTop: 5, display: "flex", alignItems: "flex-end" }}>
          <TextField
            sx={{ width: "80%" }}
            label="Ability 5 Title"
            variant="standard"
            value={godData?.ability5?.Summary}
            disabled
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <img src={godData?.ability5?.URL} />
          <TextField
            sx={{ width: "80%" }}
            multiline
            rows={4}
            label="Passive"
            variant="standard"
            value={godData?.ability5?.Description?.itemDescription.description}
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <h1> Translated data </h1>
        <TextField
          sx={{ width: "80%" }}
          label="Name"
          variant="standard"
          value={name}
          name="name"
          onChange={(e) => onChange(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={title}
          name="title"
          sx={{ width: "80%" }}
          label="Title"
          variant="standard"
          onChange={(e) => onChange(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={pros}
          name="pros"
          sx={{ width: "80%" }}
          label="Pros"
          variant="standard"
          onChange={(e) => onChange(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={cons}
          name="cons"
          sx={{ width: "80%" }}
          label="Cons"
          variant="standard"
          onChange={(e) => onChange(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          value={type}
          name="type"
          sx={{ width: "80%" }}
          label="Type"
          variant="standard"
          onChange={(e) => onChange(e)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ width: "80%" }}
          multiline
          rows={7}
          label="Lore"
          variant="standard"
          value={lore}
          name="lore"
          onChange={(e) => onChange(e)}
          InputLabelProps={{ shrink: true }}
        />

        {/*---------------------------------------------- ABILITY 1 ----------------------------------------------*/}
        <TextField
          sx={{ marginTop: 5, width: "80%" }}
          label="Ability 1 Title"
          variant="standard"
          value={ability1 !== "" ? ability1.Summary : ""}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setFormData({
              ...formData,
              ability1: { ...formData.ability1, summary: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          sx={{ width: "80%" }}
          multiline
          rows={4}
          label="Ability 1 Desc"
          variant="standard"
          value={
            ability1 !== ""
              ? ability1?.Description?.itemDescription.description
              : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              ability1: { ...formData.ability1, desc: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
        />

        {/*---------------------------------------------- ABILITY 2 ----------------------------------------------*/}
        <TextField
          sx={{ marginTop: 5, width: "80%" }}
          label="Ability 2 Title"
          variant="standard"
          value={ability2 !== "" ? ability2?.Summary : ""}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setFormData({
              ...formData,
              ability2: { ...formData.ability2, summary: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ width: "80%" }}
          multiline
          rows={4}
          label="Ability 2"
          variant="standard"
          value={
            ability2 !== ""
              ? ability2?.Description?.itemDescription.description
              : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              ability2: { ...formData.ability2, desc: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
        />

        {/*---------------------------------------------- ABILITY 3 ----------------------------------------------*/}
        <TextField
          sx={{ marginTop: 5, width: "80%" }}
          label="Ability 3 Title"
          variant="standard"
          value={ability3 !== "" ? ability3?.Summary : ""}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setFormData({
              ...formData,
              ability3: { ...formData.ability3, summary: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ width: "80%" }}
          multiline
          rows={4}
          label="Ability 3"
          variant="standard"
          value={
            ability3 !== ""
              ? ability3?.Description?.itemDescription.description
              : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              ability3: { ...formData.ability3, summary: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
        />

        {/*---------------------------------------------- ABILITY 4 ----------------------------------------------*/}
        <TextField
          sx={{ marginTop: 5, width: "80%" }}
          label="Ability 4 Title"
          variant="standard"
          value={ability4 !== "" ? ability4?.Summary : ""}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setFormData({
              ...formData,
              ability4: { ...formData.ability4, summary: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          sx={{ width: "80%" }}
          multiline
          rows={4}
          label="Ability 4"
          variant="standard"
          value={
            ability4 !== ""
              ? ability4?.Description?.itemDescription.description
              : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              ability4: { ...formData.ability4, desc: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
        />

        {/*---------------------------------------------- ABILITY 5 ----------------------------------------------*/}
        <TextField
          sx={{ marginTop: 5, width: "80%" }}
          label="Passive"
          variant="standard"
          value={ability5 !== "" ? ability5?.Summary : ""}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setFormData({
              ...formData,
              ability5: { ...formData.ability5, summary: e.target.value },
            })
          }
        />
        <TextField
          sx={{ width: "80%" }}
          multiline
          rows={4}
          label="Passive"
          variant="standard"
          value={
            ability5 !== ""
              ? ability5?.Description?.itemDescription.description
              : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              ability5: { ...formData.ability5, desc: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button
          sx={{ margin: 2, width: "30%" }}
          variant="contained"
          component="span"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

TranslateGodsForm.propTypes = {};

export default connect(null, { updateGodTranslatedData })(TranslateGodsForm);
