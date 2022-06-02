import React, { useEffect } from "react";
import Loading from "components/Loading/Loading";
import { AnimatePresence } from "framer-motion";
import Login from "pages/Auth/Login/Login";
import Register from "pages/Auth/Register/Register";
import Game from "pages/Game/Game";
import Settings from "pages/Settings/Settings";
import { Switch, Route, useLocation } from "react-router-dom";
import "styles/global.scss";

const App = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/settings" component={Settings} />
          <Route path="/game" component={Game} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Login} />
        </Switch>
      </AnimatePresence>
      <Loading />
    </>
  );
};

export default App;
