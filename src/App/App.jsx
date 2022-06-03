import React, { useEffect } from "react";
import { getUser } from "api/user";
import Loading from "components/Loading/Loading";
import { AnimatePresence } from "framer-motion";
import Login from "pages/Auth/Login/Login";
import Register from "pages/Auth/Register/Register";
import Game from "pages/Game/Game";
import Settings from "pages/Settings/Settings";
import { connect } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateUser } from "store/entities/user";
import "styles/global.scss";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";

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
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
        </Routes>
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
