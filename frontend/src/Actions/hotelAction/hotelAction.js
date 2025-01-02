import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const DEV_URL = "http://localhost:4000";

export const getAllHotelList = createAsyncThunk("getAllHotelList", async () => {
  try {
    const response = await axios.get(`${DEV_URL}/api/v1/all/hotels`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // rejectWithValue(error);

    return rejectWithValue(error.response.data.message);
  }
});

export const addNewHotel = createAsyncThunk(
  "addNewHotel",
  async (values, { rejectWithValue }) => {
    try {
      console.log('values',values)
      const response = await axios.post(`${DEV_URL}/api/v1/add/hotel`, values, {
        withCredentials: true,
        // headers: {
        //   "Content-Type": "multipart/form-data", // Important for file uploads
        // },
      });
      return response.data;
    } catch (error) {
      // rejectWithValue(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);
