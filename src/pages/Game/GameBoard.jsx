import React, { useEffect, useRef, useState } from "react";
import { generateRandomIconsBoard } from "utils/globalUtils";
import FeatherIcon from "feather-icons-react";
import "./game.scss";
import WinnerModal from "components/Modals/WinnerModal";
import { updateWinner } from "store/entities/game";
import { connect } from "react-redux";

function GameBoard({ updateWinner, boardReset }) {
  const [currentPlayer, setCurrentPlayer] = useState({ id: 1, moves: 0 });
  const [cards, setCards] = useState([]);
  const [randomBoardContent, setRandomBoardContent] = useState(undefined);
  const [winnerModal, setWinnerModal] = useState(false);

  const cardsRef = useRef([]);

  //Actions
  const handleSelect = (iconName) => {
    const cardsCopy = [...cards];
    const flippedCards = cardsCopy.filter((icon) =>
      icon.classList.contains("flip")
    );
    if (flippedCards.length === 2) return;

    const index = cardsCopy.findIndex(
      (item) => item.getAttribute("name") === iconName
    );
    const itemClassList = cardsCopy[index].classList;

    if (itemClassList.contains("flip")) return;
    itemClassList.add("flip");
    setCards(cardsCopy);
  };
  const handleWin = () => {
    updateWinner({ id: currentPlayer.id });

    setWinnerModal(true);
  };

  const checkMatch = () => {
    const cardsCopy = [...cards];
    const flippedCards = cardsCopy.filter((icon) =>
      icon.classList.contains("flip")
    );

    if (flippedCards.length === 2) {
      const isAMatch =
        flippedCards[0].getAttribute("value") ===
        flippedCards[1].getAttribute("value");

      if (isAMatch) {
        setTimeout(() => {
          flippedCards.forEach((item) => item.classList.add("matched"));
          flippedCards.forEach((item) => item.classList.remove("flip"));
          setCards(cardsCopy);
        }, 300);
      } else {
        setTimeout(() => {
          flippedCards.forEach((item) => item.classList.remove("flip"));
          setCards(cardsCopy);
        }, 1300);
      }
    }
  };
  const checkWin = () => {
    const filteredMatch = cards.filter((icon) =>
      icon.classList.contains("matched")
    );
    if (filteredMatch.length === 4 * 4) return handleWin();
  };
  const restoreMatchedCards = () => {
    const cardsCopy = [...cards];
    const flippedCards = cardsCopy.filter((icon) =>
      icon.classList.contains("matched")
    );
    if (flippedCards.length > 0) {
      flippedCards.forEach((item) => item.classList.remove("matched"));
      setCards(cardsCopy);
    }
  };
  //Lifecycle
  useEffect(() => {
    checkMatch();
    checkWin();
  }, [cards]);

  useEffect(() => {
    setCards(cardsRef.current);
    setRandomBoardContent(generateRandomIconsBoard(4 * 4));
  }, []);

  useEffect(() => {
    if (boardReset) {
      restoreMatchedCards();
      setRandomBoardContent(generateRandomIconsBoard(4 * 4));
    }
  }, [boardReset]);

  return (
    <div className="game-board">
      {randomBoardContent?.map((icon, i) => (
        <div
          ref={(item) => (cardsRef.current[i] = item)}
          name={`card-${icon}-${i}`}
          value={icon}
          key={i}
          className="memory-card"
          onClick={() => handleSelect(`card-${icon}-${i}`)}
        >
          <FeatherIcon icon={icon} />
        </div>
      ))}
      <WinnerModal show={winnerModal} onHide={() => setWinnerModal(false)} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    boardReset: state.entities.game.board.reset
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateWinner: (obj) => dispatch(updateWinner(obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
