import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Game from "pages/Game/Game";
import Settings from "pages/Settings/Settings";
import { Switch, Route, useLocation } from "react-router-dom";
import "styles/global.scss";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/settings" component={Settings} />
        <Route path="/game" component={Game} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Login} />
        <Route path="*" component={Login} />
      </Switch>
    </AnimatePresence>
  );
};
export default App;
