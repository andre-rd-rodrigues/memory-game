import React, { useEffect, useState } from "react";
import { postGameMatch } from "api/user";
import Button from "components/Button/Button";
import ListRow from "components/ListRow/ListRow";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { newGame, restartGame } from "store/entities/game";
import { getTimeElapsed } from "utils/globalUtils";
import "./modals.scss";

const WinnerModal = ({
  show,
  onHide,
  players,
  time,
  restartGame,
  newGame,
  user
}) => {
  const [winner, setWinner] = useState(undefined);
  const [updatedDB, setUpdatedDB] = useState(false);

  const handleGameMatch = async () => {
    //Set winner
    setWinner(players?.filter((player) => player.winner)[0]);

    //Game match
    const match = {
      duration: getTimeElapsed(time.started, time.finished),
      moves: winner?.moves,
      date: new Date().toDateString()
    };

    //Save results in db
    await postGameMatch(match)
      .then(() => setUpdatedDB(true))
      .catch((err) => console.log(err));
  };

  //Finish
  const handleClose = (type) => {
    if (type === "restart") {
      restartGame();
    } else {
      newGame();
    }
    return onHide();
  };

  //Lifecycle
  useEffect(() => {
    if (show && !updatedDB) handleGameMatch();
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
        <h2>You won {user.name}!</h2>
        <p id="modal-subtitle">Game over! Here are the results...</p>
        <ListRow
          label="Time Elapsed"
          content={getTimeElapsed(time.started, time.finished)}
        />
        <ListRow label="Moves Taken" content={`${winner?.moves} Moves`} />
        <div className="modal-actions">
          <Button
            label="Restart"
            color="orange"
            onClick={() => handleClose("restart")}
          />
          <Button
            label="New Game"
            color="secondary-light"
            nClick={() => handleClose("newGame")}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.entities.game.players,
    time: state.entities.game.time,
    user: state.entities.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restartGame: (obj) => dispatch(restartGame(obj)),
    newGame: (obj) => dispatch(newGame(obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WinnerModal);
