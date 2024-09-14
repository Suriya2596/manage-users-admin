import { createSlice } from "@reduxjs/toolkit";
import { userAuthforgotPasswordAction, userAuthGetLoggedAction, userAuthLoginAction, userAuthResetPasswordAction, userAuthUpdateAction, userAuthUpdatePasswordAction } from "./userAuthActions";

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
    userAuthUpdateAct: getInitialState(),
    userAuthUpdatePasswordAct: getInitialState(),
    forgotPasswordAct : getInitialState(),
    resetPasswordAct: getInitialState(),
    userData: {}
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        resetUserAuth: (state) => {
            state.loginAct = getInitialState();
            state.getUserLoggedAct = getInitialState()
            state.userAuthUpdateAct = getInitialState()
            state.userAuthUpdatePasswordAct = getInitialState()
            state.forgotPasswordAct = getInitialState()
            state.resetPasswordAct = getInitialState()
        },
        resetUserAuthValue: (state) => {
            state.loginAct = getInitialState()
            state.getUserLoggedAct = getInitialState()
            state.userAuthUpdateAct = getInitialState()
            state.userAuthUpdatePasswordAct = getInitialState()
            state.forgotPasswordAct = getInitialState()
            state.resetPasswordAct = getInitialState()
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

        builder.addCase(userAuthforgotPasswordAction.pending, (state) => {
            state.forgotPasswordAct = getInitialState()
            state.forgotPasswordAct.isLoading = true
        })
        builder.addCase(userAuthforgotPasswordAction.rejected, (state, action) => {
            state.forgotPasswordAct = getInitialState()
            state.forgotPasswordAct.isError = true
            state.forgotPasswordAct.errorResponse = action.payload
            state.forgotPasswordAct.errorMsg = "Failed to send forgot password link"
        });
        builder.addCase(userAuthforgotPasswordAction.fulfilled, (state) => {
            state.forgotPasswordAct = getInitialState()
            state.forgotPasswordAct.isSuccess = true
            state.forgotPasswordAct.successMsg = "Successfully send forgot password link"
        });

        builder.addCase(userAuthResetPasswordAction.pending, (state) => {
            state.resetPasswordAct = getInitialState()
            state.resetPasswordAct.isLoading = true
        })
        builder.addCase(userAuthResetPasswordAction.rejected, (state, action) => {
            state.resetPasswordAct = getInitialState()
            state.resetPasswordAct.isError = true
            state.resetPasswordAct.errorResponse = action.payload
            state.resetPasswordAct.errorMsg = "Failed to change password"
        });
        builder.addCase(userAuthResetPasswordAction.fulfilled, (state) => {
            state.resetPasswordAct = getInitialState()
            state.resetPasswordAct.isSuccess = true
            state.resetPasswordAct.successMsg = "Successfully change password"
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

        builder.addCase(userAuthUpdateAction.pending, (state) => {
            state.userAuthUpdateAct = getInitialState()
            state.userAuthUpdateAct.isLoading = true
        })
        builder.addCase(userAuthUpdateAction.rejected, (state, action) => {
            state.userAuthUpdateAct = getInitialState()
            state.userAuthUpdateAct.isError = true
            state.userAuthUpdateAct.errorResponse = action.payload
            state.userAuthUpdateAct.errorMsg = action.payload?.message
        });
        builder.addCase(userAuthUpdateAction.fulfilled, (state, action) => {
            state.userAuthUpdateAct = getInitialState()
            state.userAuthUpdateAct.isSuccess = true
            state.userAuthUpdateAct.successMsg = action.payload?.message
            state.userData = action.payload?.data
        });

        builder.addCase(userAuthUpdatePasswordAction.pending, (state) => {
            state.userAuthUpdatePasswordAct = getInitialState()
            state.userAuthUpdatePasswordAct.isLoading = true
        })
        builder.addCase(userAuthUpdatePasswordAction.rejected, (state, action) => {
            state.userAuthUpdatePasswordAct = getInitialState()
            state.userAuthUpdatePasswordAct.isError = true
            state.userAuthUpdatePasswordAct.errorResponse = action.payload
            state.userAuthUpdatePasswordAct.errorMsg = action.payload?.message
        });
        builder.addCase(userAuthUpdatePasswordAction.fulfilled, (state, action) => {
            state.userAuthUpdatePasswordAct = getInitialState()
            state.userAuthUpdatePasswordAct.isSuccess = true
            state.userAuthUpdatePasswordAct.successMsg = action.payload?.message
        });

    }
})

export const { resetUserAuth, resetUserAuthValue } = userAuthSlice.actions

export default userAuthSlice.reducer