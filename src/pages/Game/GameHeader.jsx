import React from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { restartGame } from "store/entities/game";
import { verticalEntrance } from "styles/motions/motionVariants";

function GameHeader({ restartGame }) {
  return (
    <motion.div
      variants={verticalEntrance}
      initial="hidden"
      animate="visible"
      className="game-header"
    >
      <h2>memory</h2>
      <div>
        <button name="Restart" onClick={() => restartGame()}>
          Restart
        </button>
        <Link to="/settings">
          <button>New Game</button>
        </Link>
      </div>
    </motion.div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    restartGame: (obj) => dispatch(restartGame(obj))
  };
};

export default connect(null, mapDispatchToProps)(GameHeader);
