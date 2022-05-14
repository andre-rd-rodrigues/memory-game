import shuffle from "lodash.shuffle";
import { icons } from "mocks/local-data";

const generateNumbersArray = (n) => {
  let result = [];
  for (let i = 1; i <= n; i++) {
    result.push(i);
  }
  return result;
};

const generateRandomBoard = (boardSize, type) => {
  let boardElements = [];

  switch (type) {
    case "icons":
      for (let i = 0; i < boardSize / 2; i++) {
        boardElements.push(icons[i], icons[i]);
      }
      break;

    default:
      for (let i = 0; i < boardSize / 2; i++) {
        boardElements.push(
          generateNumbersArray(boardSize / 2)[i],
          generateNumbersArray(boardSize / 2)[i]
        );
      }
      break;
  }
  return shuffle(boardElements);
};

const getTimeElapsed = (started, finished) => {
  const milliseconds = finished - started;
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
export { generateNumbersArray, generateRandomBoard, getTimeElapsed };
