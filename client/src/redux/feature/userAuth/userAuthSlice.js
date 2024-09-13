import { createSlice } from "@reduxjs/toolkit";
import { userAuthGetLoggedAction, userAuthLoginAction } from "./userAuthActions";

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
    getUserLoggedAct: getInitialState(),
    userData: {}
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        resetUserAuth: (state) => {
            state.loginAct = getInitialState();
            state.getUserLoggedAct = getInitialState()
        },
        resetUserAuthValue: (state) => {
            state.loginAct = getInitialState()
            state.getUserLoggedAct = getInitialState()
            state.userData = {}
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



        builder.addCase(userAuthGetLoggedAction.pending, (state) => {
            state.getUserLoggedAct = getInitialState()
            state.getUserLoggedAct.isLoading = true
        })
        builder.addCase(userAuthGetLoggedAction.rejected, (state, action) => {
            state.getUserLoggedAct = getInitialState()
            state.getUserLoggedAct.isError = true
            state.getUserLoggedAct.errorResponse = action.payload
            state.getUserLoggedAct.errorMsg = action.payload?.message
        });
        builder.addCase(userAuthGetLoggedAction.fulfilled, (state, action) => {
            state.getUserLoggedAct = getInitialState()
            state.getUserLoggedAct.isSuccess = true
            state.getUserLoggedAct.successMsg = action.payload?.message
            state.userData = action.payload?.data
        });
    }
})

export const { resetUserAuth, resetUserAuthValue } = userAuthSlice.actions

export default userAuthSlice.reducer