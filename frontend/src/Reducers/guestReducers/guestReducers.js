import { createSlice } from "@reduxjs/toolkit";
import {
  addGuestdetails,
  deleteCurrentGuest,
  getAllGuestList,
  updateGuestDetails,
} from "../../Actions/guestAction/guestActions";

let initialState = {
  loading: false,
  guestList: [],
  error: null,
  message: null,
};
const guestSlice = createSlice({
  name: "Hotel",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addGuestdetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addGuestdetails.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(addGuestdetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    });

    builder.addCase(getAllGuestList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAllGuestList.fulfilled, (state, action) => {
      state.loading = false;
      state.guestList = action.payload.guestList;
    });
    builder.addCase(getAllGuestList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateGuestDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateGuestDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateGuestDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteCurrentGuest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deleteCurrentGuest.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteCurrentGuest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { clearError, clearMessage } = guestSlice.actions;
export default guestSlice.reducer;
