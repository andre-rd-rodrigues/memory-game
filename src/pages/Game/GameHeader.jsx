import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { restartGame } from "store/entities/game";

function GameHeader({ restartGame }) {
  return (
    <div className="game-header">
      <h2>memory</h2>
      <div>
        <button name="Restart" onClick={() => restartGame()}>
          Restart
        </button>
        <Link to="/settings">
          <button>New Game</button>
        </Link>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    restartGame: (obj) => dispatch(restartGame(obj))
  };
};

export default connect(null, mapDispatchToProps)(GameHeader);
