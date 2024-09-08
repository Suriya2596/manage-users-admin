import { createSlice } from "@reduxjs/toolkit";
import { authUserLoginAction } from "./AuthAction";

const getInitialState = ()=>{
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

const authSlice = createSlice({
  name: "Auth",
  initialState : initialState,
  reducers: {
    resetAuth: (state) => {
      state.loginAct = getInitialState();
    },
  },
  extraReducers: (build) => {
    build.addCase(authUserLoginAction.pending,(state)=>{
       state.loginAct = getInitialState()
       state.loginAct.isLoading = true
    });
    build.addCase(authUserLoginAction.rejected,(state , action)=>{
        state.loginAct = getInitialState()
        state.loginAct.isError = true
        state.loginAct.errorResponse = action.payload
        state.loginAct.errorMsg = "Failed to login"
     });
     build.addCase(authUserLoginAction.fulfilled,(state)=>{
        state.loginAct = getInitialState()
        state.loginAct.isSuccess = true
        state.loginAct.successMsg = "Successfully login"
     });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
