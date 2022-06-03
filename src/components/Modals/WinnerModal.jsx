import React, { useEffect, useState } from "react";
import { postGameMatch } from "api/user";
import Button from "components/Button/Button";
import ListRow from "components/ListRow/ListRow";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { newGame, restartGame } from "store/entities/game";
import { getTimeElapsed } from "utils/globalUtils";
import "./modals.scss";
import { updateGameMatch } from "store/entities/user";

const WinnerModal = ({
  show,
  onHide,
  players,
  time,
  restartGame,
  newGame,
  user,
  updateGameMatch
}) => {
  const [winner, setWinner] = useState(undefined);
  const [updatedDB, setUpdatedDB] = useState(false);

  const handleGameMatch = async () => {
    //Set winner
    const winnerFromStore = players?.filter((player) => player.winner)[0];
    setWinner(winnerFromStore);

    //Game match
    const match = {
      duration: getTimeElapsed(time.started, time.finished),
      moves: winnerFromStore?.moves,
      date: new Date().toDateString()
    };

    //Save results in db
    await postGameMatch(match)
      .then(() => {
        //Update redux store
        updateGameMatch(match);
        //Avoid repeated requests
        setUpdatedDB(true);
      })
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
        <h2>Well done {user.name}!</h2>
        <p id="modal-subtitle">Here are the results</p>
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
            onClick={() => handleClose("new game")}
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
    newGame: (obj) => dispatch(newGame(obj)),
    updateGameMatch: (obj) => dispatch(updateGameMatch(obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WinnerModal);
