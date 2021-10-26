import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/auth/Login";
import { HomePage, NotFound } from "../components/common";

const PublicRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/login" component={Login}/>
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default PublicRoutes;
