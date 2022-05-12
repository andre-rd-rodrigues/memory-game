import React, { useState } from "react";
import GameBoard from "./GameBoard";
import GameHeader from "./GameHeader";
import "./game.scss";
import WinnerModal from "components/Modals/WinnerModal";

const Game = () => {
  const [winnerModal, setWinnerModal] = useState(true);
  return (
    <div className="game">
      <GameHeader />
      <GameBoard />
      <WinnerModal show={winnerModal} onHide={() => setWinnerModal(false)} />
    </div>
  );
};

export default Game;
