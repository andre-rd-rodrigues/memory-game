import Button from "components/Button/Button";
import ListRow from "components/ListRow/ListRow";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { restartGame } from "store/entities/game";
import { getTimeElapsed } from "utils/globalUtils";
import "./modals.scss";

const WinnerModal = ({ show, onHide, players, time, restartGame }) => {
  const [winner, setWinner] = useState(undefined);

  const winnerFromStore = () =>
    setWinner(players?.filter((player) => player.winner)[0]);

  const handleRestart = () => {
    restartGame();
    return onHide();
  };

  const handleNewGame = () => {
    <Redirect to="settings" />;
    return onHide();
  };

  useEffect(() => {
    if (show) return winnerFromStore();
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      id="winner-modal"
      centered
      backdrop="static"
    >
      <Modal.Body>
        <h2>Player {winner?.id} Wins!</h2>
        <p id="modal-subtitle">Game over! Here are the results...</p>
        <ListRow
          label="Time Elapsed"
          content={getTimeElapsed(time.started, time.finished)}
        />
        <ListRow label="Moves Taken" content={`${winner?.moves} Moves`} />
        <div className="modal-actions">
          <Button label="Restart" color="orange" onClick={handleRestart} />
          <Button
            label="New Game"
            color="secondary-light"
            onClick={handleNewGame}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.entities.game.players,
    time: state.entities.game.time
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restartGame: (obj) => dispatch(restartGame(obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WinnerModal);
