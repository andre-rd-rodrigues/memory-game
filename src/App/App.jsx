import React, { useEffect } from "react";
import { getUser } from "api/user";
import Loading from "components/Loading/Loading";
import { AnimatePresence } from "framer-motion";
import Login from "pages/Auth/Login/Login";
import Register from "pages/Auth/Register/Register";
import Game from "pages/Game/Game";
import Settings from "pages/Settings/Settings";
import { connect } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateUser } from "store/entities/user";
import "styles/global.scss";

const App = ({ updateUser }) => {
  const location = useLocation();

  const getUserHttp = async () => {
    await getUser().then((data) => {
      if (data) return updateUser(data);
    });
  };
  useEffect(() => {
    getUserHttp();
  }, []);

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
      <ToastContainer autoClose={1800} progressClassName="progressBar" />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (obj) => dispatch(updateUser(obj))
  };
};

export default connect(null, mapDispatchToProps)(App);
