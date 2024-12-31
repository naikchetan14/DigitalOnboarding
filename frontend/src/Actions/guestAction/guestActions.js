import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const DEV_URL = "http://localhost:4000";

export const addGuestdetails = createAsyncThunk(
  "addGuestdetails",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${DEV_URL}/api/v1/guest/hoteldetails`, values, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // rejectWithValue(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllGuestList = createAsyncThunk(
    "getAllGuestList",
    async () => {
      try {
        const response = await axios.get(`${DEV_URL}/api/v1/all/guest`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        // rejectWithValue(error);
  
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const updateGuestDetails = createAsyncThunk(
    "updateGuestDetails",
    async (values, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${DEV_URL}/api/v1/update/guest/${values.guestId}`, values,{
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        // rejectWithValue(error);
  
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const deleteCurrentGuest = createAsyncThunk(
    "deleteCurrentGuest",
    async (guestId) => {
      try {
        const response = await axios.delete(`${DEV_URL}/api/v1/delete/guest/${guestId}`,{
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        // rejectWithValue(error);
  
        return rejectWithValue(error.response.data.message);
      }
    }
  );