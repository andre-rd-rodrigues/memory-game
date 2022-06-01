import { createSlice } from "@reduxjs/toolkit";

//Slice
const slice = createSlice({
  name: "user",
  initialState: {
    name: undefined,
    id: undefined,
    email: undefined
  },
  reducers: {
    loginUser: (user, { payload }) => {
      const { name, email, id } = payload;
      user.name = name;
      user.email = email;
      user.id = id;
    }
  }
});

export const { loginUser } = slice.actions;

export default slice.reducer;
