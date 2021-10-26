import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { default as AlertCompo } from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Snackbar open='true' anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
    }}>
      <AlertCompo key={alert.id} severity={`${alert.alertType}`}>
        {alert.msg}
      </AlertCompo>
    </Snackbar>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
