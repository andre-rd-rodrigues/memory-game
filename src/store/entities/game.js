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
    addPlayerMove: (game, { payload }) => {
      const playerIndex = game.players.findIndex(
        (player) => player.id === payload.id
      );
      game.players[playerIndex].moves += 1;
    },
    updatePlayers: (game, { payload }) => {
      let result = [];
      for (let i = 1; i <= payload.numberOfPlayers; i++) {
        result.push({ id: i, moves: 0, winner: false });
      }
      game.players = result;
    },
    updateSettings: (game, { payload }) => {
      game.settings = payload;
    },
    updateGameTime: (game, { payload }) => {
      game.time[payload.type] = payload.value;
    },
    updateWinner: (game, { payload }) => {
      const index = game.players.findIndex(
        (player) => player.id === payload.id
      );
      game.players[index].winner = true;
      game.time.finished = Date.now();
    },
    restartGame: (game) => {
      game.players.forEach((player) => {
        player.winner = false;
        player.moves = 0;
      });
      game.board.reset = true;
      game.time = { started: Date.now(), finished: 0 };
    },
    newGame: (game) => {
      window.location.hash = "#/settings";
      game.settings = {
        theme: "icons",
        boardSize: 4
      };
    },
    restoreBoardReset: (game) => {
      game.board.reset = false;
    }
  }
});

export const {
  updatePlayers,
  updateSettings,
  updateGameTime,
  updateWinner,
  restartGame,
  restoreBoardReset,
  addPlayerMove,
  newGame
} = slice.actions;

export default slice.reducer;
