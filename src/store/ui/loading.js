import { createSlice } from "@reduxjs/toolkit";

//Slice
const slice = createSlice({
  name: "loading",
  initialState: {
    state: false
  },
  reducers: {
    updateLoading: (loading, { payload }) => {
      loading.state = payload;
    }
  }
});

export const { updateLoading } = slice.actions;

export default slice.reducer;
