import { Switch } from "react-router";
import { Route, useRouteMatch } from "react-router-dom";
import { NotFound } from "../components/common/";
/*
 * This is the route utility component used for generating
 * routes and child routes it only requires routes array and basePath
 */

const MapAllowedRoutes = ({ routes, basePath }) => {
  const match = useRouteMatch(basePath);
  return (
    <Switch>
      {routes.map((route) => {
        const {
          path,
          component: Component,
          children,
          title,
          permission,
          ...rest
        } = route;
        return (
          <Route {...rest} key={path} exact path={`${match.path}${path}`}>
            <Component children={children} />
          </Route>
        );
      })}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default MapAllowedRoutes;
