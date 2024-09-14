import { useEffect, useState } from "react";
import {
  InputPasswordLable,
} from "../../components/common/InputFields";
import {
  validatePassword,
} from "../../components/helpers/Validations";
import { Link, useNavigate } from "react-router-dom";
import { ButtonBox, ButtonLoading } from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useErrorMsgContext } from "../../context/ErrorMsgContext";
import { useSuccessMsgContext } from "../../context/SuccessMsgContext";
import { resetUserAuth } from "../../redux/feature/userAuth/userAuthSlice";
import { userAuthResetPasswordAction } from "../../redux/feature/userAuth/userAuthActions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleErrorMsg } = useErrorMsgContext();
  const { handleSuccessMsg } = useSuccessMsgContext();
  const [newPassword, setNewPassword] = useState("");
  const [repeatePassword, setRepeatePassword] = useState("");
  const [formError, setFormError] = useState({});
  const [token, setToken] = useState("");
  let formErr = {};

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    setToken(tokenFromUrl);
  }, []);

  const { resetPasswordAct } = useSelector((state) => {
    return state.userAuth;
  });

  const handleFormError = () => {

    if (String(newPassword).trim().length === 0) {
      formErr.password = "New Password is required";
    } else if (!validatePassword(newPassword)) {
      formErr.newPassword =
        "New Password use 8 charater, atleast one uppercase, atleast one number, atleast one symbol";
    }
    if (String(repeatePassword).trim().length === 0) {
      formErr.repeatePassword = "Repeate Password is required";
    } else if (!validatePassword(repeatePassword)) {
      formErr.repeatePassword =
        "Repeate Password use 8 charater, atleast one uppercase, atleast one number, atleast one symbol";
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormError();
    if (Object.keys(formErr).length > 0) {
      setFormError(formErr);
      formErr = {};
    } else {
      const formData = {
        password:newPassword,
      };
      dispatch(userAuthResetPasswordAction({formData , token}))
    }
  };

  
  useEffect(() => {
    if (resetPasswordAct?.isError) {
      handleErrorMsg({
        actionResponse: resetPasswordAct?.errorResponse,
        msg: "Can't change password",
        actionResolve: () => {
          dispatch(resetUserAuth());
        },
        isNeedAction401: false,
      });
    }
  }, [resetPasswordAct,handleErrorMsg, dispatch]);

  useEffect(() => {
    if (resetPasswordAct?.isSuccess) {
      handleSuccessMsg({
        actionMsg: resetPasswordAct?.successMsg,
        msg: "Successfully change password",
        actionResolve: () => {
          dispatch(resetUserAuth());
          navigate("/login")
        },
      });
    }
  }, [resetPasswordAct , dispatch , handleSuccessMsg , navigate ]);

  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[500px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h4 className="text-center">Reset Password</h4>
          </div>
          <div className="col-span-12">
            <InputPasswordLable
              value={newPassword}
              placeholder={"Enter New Password"}
              onChange={(e) => {
                setNewPassword(e.target.value);
                delete formError?.newPassword;
              }}
              label={"New Password"}
              error={formError?.newPassword}
            />
          </div>
          <div className="col-span-12">
            <InputPasswordLable
              value={repeatePassword}
              placeholder={"Enter Repeate Password"}
              onChange={(e) => {
                setRepeatePassword(e.target.value);
                if (newPassword.trim() !== e.target.value.trim()) {
                  setFormError({
                    ...formError,
                    repeatePassword: "Password and Repeate Password are same",
                  });
                } else {
                  delete formError?.repeatePassword;
                }
              }}
              label={"Repeate Password"}
              error={formError?.repeatePassword}
            />
          </div>
          <div className="col-span-12 flex justify-center items-center">
            <ButtonBox type={ resetPasswordAct?.isLoading ? "" : "submit"}> {resetPasswordAct?.isLoading ? <ButtonLoading /> : "Change Password"} </ButtonBox>
          </div>
          <div className="col-span-12 text-center">
            <Link to={"/login"}>Back to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
