import { icons } from "mocks/local-data";

const generateNumbersArray = (n) => {
  let result = [];
  for (let i = 1; i <= n; i++) {
    result.push(i);
  }
  return result;
};

const generateRandomIconsBoard = (n) => {
  let result = [];

  for (let i = 0; i < n; i++) {
    let randomIcon = icons[Math.floor(Math.random() * icons.length)];
    let iconsAlreadyPushed = result.filter(
      (icon) => icon === randomIcon
    ).length;
    let isDoubled = iconsAlreadyPushed === 2;

    do {
      randomIcon = icons[Math.floor(Math.random() * icons.length)];

      iconsAlreadyPushed = result.filter((icon) => icon === randomIcon).length;
      isDoubled = iconsAlreadyPushed === 2;
    } while (isDoubled);

    result.push(randomIcon);
  }
  return result;
};
const getTimeElapsed = (started, finished) => {
  const milliseconds = finished - started;
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
export { generateNumbersArray, generateRandomIconsBoard, getTimeElapsed };
