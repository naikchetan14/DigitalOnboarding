
import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
const DEV_URL = "http://localhost:4000";



export const loginUser = createAsyncThunk(
  "login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${DEV_URL}/api/v1/admin/login`, values, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      // rejectWithValue(error);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
    "registerUser",
    async (values, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${DEV_URL}/api/v1/admin/register`, values, {
          withCredentials: true,
        });
        
        return response.data;
      } catch (error) {
        // rejectWithValue(error);
  
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const logoutUser = createAsyncThunk(
    "logoutUser",
    async(_, { rejectWithValue })=>{
      try {
        const response = await axios.get(`${DEV_URL}/api/v1/admin/logout`, {
          withCredentials: true,
        });
        console.log('rec',response)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

