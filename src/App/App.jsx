import React from "react";
import { AnimatePresence } from "framer-motion";
import Game from "pages/Game/Game";
import Settings from "pages/Settings/Settings";
import { Switch, Route, useLocation } from "react-router-dom";
import "styles/global.scss";

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/settings" component={Settings} />
        <Route path="/game" component={Game} />
        <Route path="*" component={Settings} />
      </Switch>
    </AnimatePresence>
  );
};
export default App;
