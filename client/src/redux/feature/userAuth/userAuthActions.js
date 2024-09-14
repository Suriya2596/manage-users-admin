import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAPIToken, getCookies, setCookiee } from "../../../components/helpers/otherHelpers";
import { axiosIntance } from "../../../components/helpers/axiosIntance";
import { jwtDecode } from "jwt-decode";

const getUserId = () => {
    const tokenBearer = getCookies("token")
    if (tokenBearer) {
        const token = tokenBearer.split(" ")[1]
        const jwtDecodeData = jwtDecode(token)
        return jwtDecodeData?._id || ""
    } else {
        return ""
    }
}
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


export const userAuthGetLoggedAction = createAsyncThunk("userAuth/userAuthGetLoggedAction", async (req, thunkAPI) => {
    try {

        const response = await axiosIntance.get("user", {
            headers: {
                Authorization: getAPIToken("token")
            }
        });
        if (response.status >= 200 && response.status < 300) {
            const data = response?.data;
            return data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
    }
})

export const userAuthUpdateAction = createAsyncThunk("userAuth/userAuthUpdateAction", async (req, thunkAPI) => {
    try {
        const response = await axiosIntance.patch(`user/${req?.id}`, req?.formData, {
            headers: {
                Authorization: getAPIToken("token")
            }
        });
        if (response.status >= 200 && response.status < 300) {
            const data = response?.data;
            return data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
    }
})


export const userAuthUpdatePasswordAction = createAsyncThunk("userAuth/userAuthUpdatePasswordAction", async (req, thunkAPI) => {
    try {

        const response = await axiosIntance.patch(`user/change-password/${getUserId()}`, req?.formData, {
            headers: {
                Authorization: getAPIToken("token")
            }
        });
        if (response.status >= 200 && response.status < 300) {
            const data = response?.data;
            return data;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response);
    }
})