import React from "react";

function GameHeader() {
  return (
    <div className="game-header">
      <h2>memory</h2>
      <div>
        <button name="Restart">Restart</button>
        <button>New Game</button>
      </div>
    </div>
  );
}

export default GameHeader;
