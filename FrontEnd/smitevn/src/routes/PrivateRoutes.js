import React, { Fragment } from "react";
import { connect } from "react-redux";
import { TopNav } from "../components/common";
import { PrivateRoutesConfig, Roles } from "../config";
import { getAllowedRoutes, isLoggedIn } from "../utilities";
import MapAllowedRoutes from "./MapAllowedRoutes";

const PrivateRoutes = ({ auth }) => {
  let allowedRoutes = getAllowedRoutes(PrivateRoutesConfig, auth.user? auth.user?.role : Roles.GUEST);
  console.log(allowedRoutes);

  return (
    <Fragment>
      <MapAllowedRoutes routes={allowedRoutes} basePath="/manage" isAddNotFound />
    </Fragment>
  );
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  null
)(PrivateRoutes);
