import React from "react";
import { connect } from "react-redux";
import { newGame, restartGame } from "store/entities/game";
import { vertical, motion } from "styles/motions/motionVariants";

function GameHeader({ restartGame, newGame }) {
  return (
    <motion.div
      variants={vertical}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="game-header"
    >
      <h2>memory</h2>
      <div>
        <button name="Restart" onClick={() => restartGame()}>
          Restart
        </button>
        <button onClick={newGame}>New Game</button>
      </div>
    </motion.div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    restartGame: (obj) => dispatch(restartGame(obj)),
    newGame: (obj) => dispatch(newGame(obj))
  };
};

export default connect(null, mapDispatchToProps)(GameHeader);
