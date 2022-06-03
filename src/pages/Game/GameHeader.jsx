import React from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { newGame, restartGame } from "store/entities/game";
import { vertical, motion } from "styles/motions/motionVariants";
import { logout, token } from "utils/authUtils";

function GameHeader({ restartGame, newGame, user }) {
  const location = useLocation();

  //Style
  const dynamicStyle = () =>
    location.pathname === "/settings" && {
      alignSelf: "flex-end"
    };
  //Content
  const renderContent = () => {
    switch (location.pathname) {
      case "/settings":
        return (
          token() && (
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle>{user?.name}</Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown">
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>History</Dropdown.Item>
                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        );

      default:
        return (
          <>
            <h2>memory</h2>
            <div>
              <button name="Restart" onClick={() => restartGame()}>
                Restart
              </button>
              <button onClick={newGame}>New Game</button>
              {token() && (
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle>{user?.name}</Dropdown.Toggle>
                  <Dropdown.Menu className="user-dropdown">
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>History</Dropdown.Item>
                    <Dropdown.Item onClick={() => logout()}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <motion.div
      variants={vertical}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="game-header"
      style={dynamicStyle()}
    >
      {renderContent()}
    </motion.div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    restartGame: (obj) => dispatch(restartGame(obj)),
    newGame: (obj) => dispatch(newGame(obj))
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.entities.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameHeader);
