import Button from "components/Button/Button";
import ListRow from "components/ListRow/ListRow";
import React from "react";
import { Modal } from "react-bootstrap";
import "./modals.scss";

const WinnerModal = ({ show, onHide }) => (
  <Modal
    show={show}
    onHide={onHide}
    id="winner-modal"
    centered
    backdrop="static"
  >
    <Modal.Body>
      <h2>Player 3 Wins!</h2>
      <p id="modal-subtitle">Game over! Here are the results...</p>
      <ListRow label="Time Elapsed" content="1:53" />
      <ListRow label="Moves Taken" content="39 Moves" />
      <div className="modal-actions">
        <Button label="Restart" color="orange" onClick={onHide} />
        <Button label="New Game" color="secondary-light" onClick={onHide} />
      </div>
    </Modal.Body>
  </Modal>
);

export default WinnerModal;
