import React, { Fragment } from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import { Box } from "@mui/material";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;
const App = () => {
  return (
    <Box>
      <Provider store={store}>
        <Routes />
      </Provider>
    </Box>
  );
};

export default App;
