import { createSlice } from "@reduxjs/toolkit";

//Slice
const slice = createSlice({
  name: "user",
  initialState: {
    name: "",
    id: "",
    email: ""
  },
  reducers: {
    loginUser: (user, { payload }) => {
      user = { ...payload.user };
    }
  }
});

export const { loginUser } = slice.actions;

export default slice.reducer;
