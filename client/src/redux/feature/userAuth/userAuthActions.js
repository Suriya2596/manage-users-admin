import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookiee } from "../../../components/helpers/otherHelpers";
import { axiosIntance } from "../../../components/helpers/axiosIntance";

export const userAuthLoginAction = createAsyncThunk("userAuth/userAuthLoginAction", async (req, thunkAPI) => {
    try {
        const response = await axiosIntance.post("login", req?.formData);
        if (response.status >= 200 && response.status < 300) {
            const data = response?.data;
            if (data && data?.token) {
                setCookiee({ name: "token", value: data?.token })
            }
            return data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
    }
})