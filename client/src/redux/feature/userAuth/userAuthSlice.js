import { createSlice } from "@reduxjs/toolkit";
import { userAuthLoginAction } from "./userAuthActions";

const getInitialState = () => {
    return {
        isLoading: false,
        isSuccess: false,
        isError: false,
        successMsg: null,
        errorMsg: null,
        errorResponse: null,
    };
}

const initialState = {
    loginAct: getInitialState(),
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        resetUserAuth: (state) => {
            state.loginAct = getInitialState();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userAuthLoginAction.pending, (state) => {
            state.loginAct = getInitialState()
            state.loginAct.isLoading = true
        })
        builder.addCase(userAuthLoginAction.rejected, (state, action) => {
            state.loginAct = getInitialState()
            state.loginAct.isError = true
            state.loginAct.errorResponse = action.payload
            state.loginAct.errorMsg = "Failed to login"
        });
        builder.addCase(userAuthLoginAction.fulfilled, (state) => {
            state.loginAct = getInitialState()
            state.loginAct.isSuccess = true
            state.loginAct.successMsg = "Successfully login"
        });
    }
})

export const { resetUserAuth } = userAuthSlice.actions

export default userAuthSlice.reducer