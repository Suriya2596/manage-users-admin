import { useEffect, useState } from "react";
import { InputPasswordLable } from "../../components/common/InputFields";
import { validatePassword } from "../../components/helpers/Validations";
import { Link } from "react-router-dom";
import { ButtonBox } from "../../components/common/Button";
import {
  userAuthUpdatePasswordAction,
} from "../../redux/feature/userAuth/userAuthActions";
import { useDispatch, useSelector } from "react-redux";
import { useErrorMsgContext } from "../../context/ErrorMsgContext";
import { useSuccessMsgContext } from "../../context/SuccessMsgContext";
import { resetUserAuth } from "../../redux/feature/userAuth/userAuthSlice";
import { useUserSigngOut } from "../../context/UserSigngOut";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { handleSignOut } = useUserSigngOut();
  const { handleErrorMsg } = useErrorMsgContext();
  const { handleSuccessMsg } = useSuccessMsgContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatePassword, setRepeatePassword] = useState("");
  const [formError, setFormError] = useState({});
  let formErr = {};

  const { userAuthUpdatePasswordAct } = useSelector((state) => {
    return state.userAuth;
  });

  const handleFormError = () => {
    if (String(currentPassword).trim().length === 0) {
      formErr.currentPassword = "Password is required";
    } else if (!validatePassword(currentPassword)) {
      formErr.currentPassword =
        "Current Password use 8 charater, atleast one uppercase, atleast one number, atleast one symbol";
    }

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
        newPassword: newPassword,
        oldPassword: currentPassword,
      };
      dispatch(userAuthUpdatePasswordAction({ formData }));
    }
  };

  useEffect(() => {
    if (userAuthUpdatePasswordAct?.isError) {
      handleErrorMsg({
        actionResponse: userAuthUpdatePasswordAct?.errorResponse,
        msg: "Error in change password",
        actionResolve: () => {
          dispatch(resetUserAuth());
        },
      });
    }
  }, [userAuthUpdatePasswordAct, dispatch, handleErrorMsg]);

  useEffect(() => {
    if (userAuthUpdatePasswordAct?.isSuccess) {
      handleSuccessMsg({
        actionMsg: userAuthUpdatePasswordAct?.successMsg,
        msg: "Successfully changed password",
        actionResolve: () => {
          dispatch(resetUserAuth());
          handleSignOut();
        },
      });
    }
  }, [userAuthUpdatePasswordAct, dispatch, handleSuccessMsg, handleSignOut]);

  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[500px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h4 className="text-center">Change Password</h4>
          </div>
          <div className="col-span-12">
            <InputPasswordLable
              value={currentPassword}
              placeholder={"Enter Current Password"}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                delete formError?.currentPassword;
              }}
              label={"Current Password"}
              error={formError?.currentPassword}
            />
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
            <ButtonBox type={"submit"}>Change Password</ButtonBox>
          </div>
          <div className="col-span-12 text-center">
            <Link to={"/"}>Back to home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
