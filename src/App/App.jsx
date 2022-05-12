import Game from "pages/Game/Game";
import Settings from "pages/Settings/Settings";
import React from "react";
import { Switch, Route } from "react-router-dom";
import "styles/global.scss";

const App = () => (
  <Switch>
    <Route path="/settings" component={Settings} />
    <Route path="/game" component={Game} />
    <Route path="*" component={Settings} />
  </Switch>
);
export default App;
