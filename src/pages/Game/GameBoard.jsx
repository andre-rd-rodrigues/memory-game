import React, { useEffect, useRef, useState } from "react";
import { WinnerModal } from "components";
import FeatherIcon from "feather-icons-react";
import { connect } from "react-redux";
import { addPlayerMove, updateWinner } from "store/entities/game";
import { horizontal, motion } from "styles/motions/motionVariants";
import { generateRandomBoard } from "utils/globalUtils";
import "./game.scss";

function GameBoard({ updateWinner, boardReset, addPlayerMove, settings }) {
  const [currentPlayer] = useState({ id: 1, moves: 0 });
  const [cards, setCards] = useState([]);
  const [randomBoardContent, setRandomBoardContent] = useState(undefined);
  const [winnerModal, setWinnerModal] = useState(false);

  const cardsRef = useRef([]);

  const { boardSize, theme } = settings;

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
    addPlayerMove({ id: currentPlayer.id });
    setCards(cardsCopy);
  };

  //Winner
  const handleGameMatch = async () => {
    updateWinner({ id: currentPlayer.id });
    //Open winner modal
    setWinnerModal(true);
  };

  //Checks
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
    if (filteredMatch.length === 4 * 4) return handleGameMatch();
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

  //Render icons or numbers
  const Theme = ({ element }) =>
    theme === "icons" ? (
      <FeatherIcon icon={element} />
    ) : (
      <p className="card-number">{element}</p>
    );

  //Lifecycle
  useEffect(() => {
    checkMatch();
    checkWin();
  }, [cards]);

  useEffect(() => {
    setCards(cardsRef.current);
    setRandomBoardContent(generateRandomBoard(boardSize ** 2, theme));
  }, []);

  useEffect(() => {
    if (boardReset) {
      restoreMatchedCards();
      setRandomBoardContent(generateRandomBoard(boardSize ** 2, theme));
    }
  }, [boardReset]);

  return (
    <motion.div
      variants={horizontal}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="game-board"
      style={{ maxWidth: boardSize === 4 ? "360px" : "550px" }}
    >
      {randomBoardContent?.map((element, i) => (
        <div
          ref={(item) => (cardsRef.current[i] = item)}
          name={`card-${element}-${i}`}
          value={element}
          key={i}
          className="memory-card"
          onClick={() => handleSelect(`card-${element}-${i}`)}
          onKeyUp={() => handleSelect(`card-${element}-${i}`)}
          role="button"
          tabIndex={0}
        >
          <Theme element={element} />
        </div>
      ))}
      <WinnerModal show={winnerModal} onHide={() => setWinnerModal(false)} />
    </motion.div>
  );
}

const mapStateToProps = (state) => {
  return {
    boardReset: state.entities.game.board.reset,
    settings: state.entities.game.settings
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateWinner: (obj) => dispatch(updateWinner(obj)),
    addPlayerMove: (obj) => dispatch(addPlayerMove(obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
