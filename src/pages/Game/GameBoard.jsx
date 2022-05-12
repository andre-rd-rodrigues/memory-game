import React, { useEffect, useRef, useState } from "react";
import { generateRandomIconsBoard } from "utils/globalUtils";
import FeatherIcon from "feather-icons-react";
import "./game.scss";

function GameBoard() {
  const [cards, setCards] = useState([]);
  const [randomBoardContent, setRandomBoardContent] = useState(undefined);

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
    if (filteredMatch.length === 4 * 4) return alert("Won!");
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
    </div>
  );
}

export default GameBoard;
