import React from "react";
import GameBoard from "./GameBoard";
import GameHeader from "./GameHeader";
import "./game.scss";

const Game = () => {
  return (
    <div className="game">
      <GameHeader />
      <GameBoard />
    </div>
  );
};

export default Game;
