import { createSlice } from "@reduxjs/toolkit";

//Slice
const slice = createSlice({
  name: "game",
  initialState: {
    settings: {
      theme: "icons",
      boardSize: 4
    },
    board: { reset: false },
    status: {
      started: false,
      finished: false
    },
    time: {
      started: 0,
      finished: 0
    },
    players: [
      {
        id: 1,
        moves: 0,
        winner: false
      }
    ]
  },
  reducers: {
    updatePlayers: (game, { payload }) => {
      let result = [];
      for (let i = 1; i <= payload.numberOfPlayers; i++) {
        result.push({ id: i, moves: 0, winner: false });
      }
      return { ...game, players: result };
    },
    updateSettings: (game, { payload }) => {
      return { ...game, settings: payload };
    },
    updateGameTime: (game, { payload }) => {
      return { ...game, time: { ...game.time, [payload.type]: payload.value } };
    },
    updateWinner: (game, { payload }) => {
      return;
    },
    restartGame: (game) => {
      const playersCopy = [...game.players];
      playersCopy.forEach((player) => {
        player.winner = false;
        player.moves = 0;
      });

      return {
        ...game,
        players: playersCopy,
        time: { started: Date.now(), finished: 0 },
        board: { reset: true }
      };
    },
    restoreBoardReset: (game) => {
      return {
        ...game,
        board: { reset: false }
      };
    }
  }
});

export const {
  updatePlayers,
  updateSettings,
  updateGameTime,
  updateWinner,
  restartGame,
  restoreBoardReset
} = slice.actions;

export default slice.reducer;
