import { createSlice } from "@reduxjs/toolkit";
import { getUserFromStorage } from "utils/authUtils";

//Slice
const slice = createSlice({
  name: "user",
  initialState: {
    name: undefined,
    id: undefined,
    email: undefined,
    games: {
      history: []
    }
  },
  reducers: {
    loginUser: (user, { payload }) => {
      const { name, email, id } = payload;
      user.name = name;
      user.email = email;
      user.id = id;
    },
    updateGameMatch: (user, { payload }) => {
      user.games.history.push(payload);
    },
    updateUser: (user, { payload }) => {
      const { name, email, id, games } = payload;
      user.name = name;
      user.email = email;
      user.id = id;
      user.games = games;
    }
  }
});

export const { loginUser, updateGameMatch, updateUser } = slice.actions;

export default slice.reducer;
