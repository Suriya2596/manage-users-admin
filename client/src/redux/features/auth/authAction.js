import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosIntance } from "../../../components/helpers/axiosIntance";

export const authUserLoginAction = createAsyncThunk(
  "AuthUserLoginAction/login",
  async (req, thunkAPI) => {
    try {
      const response = await axiosIntance.post("login", req?.formData);
      if (response.status >= 200 && response.status < 300) {
        const data = response?.data;
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response);
    }
  }
);
