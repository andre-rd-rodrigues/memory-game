const restoreReset = () => (next) => (action) => {
  if (action.type === "game/restartGame") {
    setTimeout(() => {
      next({
        type: "game/restoreBoardReset"
      });
    }, 1000);
  }

  return next(action);
};

export default restoreReset;
