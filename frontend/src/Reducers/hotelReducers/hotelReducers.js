import { createSlice } from "@reduxjs/toolkit";
import { addNewHotel, getAllHotelList } from "../../Actions/hotelAction/hotelAction";

let initialState = {
  loading: false,
  hotelList:[],
  error: null,
  message: null,
};
const hotelSlice = createSlice({
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
    builder.addCase(getAllHotelList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAllHotelList.fulfilled, (state, action) => {
      state.loading = false;
      state.hotelList = action.payload.hotelList;
    });
    builder.addCase(getAllHotelList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });


    builder.addCase(addNewHotel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(addNewHotel.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(addNewHotel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message=null;
    });

  
  },
});
export const { clearError, clearMessage } = hotelSlice.actions;
export default hotelSlice.reducer;
