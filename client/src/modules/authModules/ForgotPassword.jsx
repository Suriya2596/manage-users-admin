import { useEffect, useState } from "react";
import { InputTextLable } from "../../components/common/InputFields";
import { validateEmail } from "../../components/helpers/Validations";
import { Link } from "react-router-dom";
import { ButtonBox, ButtonLoading } from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { userAuthforgotPasswordAction } from "../../redux/feature/userAuth/userAuthActions";
import { useSuccessMsgContext } from "../../context/SuccessMsgContext";
import { useErrorMsgContext } from "../../context/ErrorMsgContext";
import { resetUserAuth } from "../../redux/feature/userAuth/userAuthSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { handleErrorMsg } = useErrorMsgContext();
  const { handleSuccessMsg } = useSuccessMsgContext();
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState({});
  let formErr = {};

  const { forgotPasswordAct } = useSelector((state) => {
    return state.userAuth;
  });

  const handleFormError = () => {
    if (String(email).trim().length === 0) {
      formErr.email = "Email is required";
    } else if (!validateEmail(email)) {
      formErr.email = "Email is invalidate";
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
        email,
      };
      dispatch(userAuthforgotPasswordAction({ formData }));
    }
  };

  useEffect(() => {
    if (forgotPasswordAct?.isError) {
      handleErrorMsg({
        actionResponse: forgotPasswordAct?.errorResponse,
        msg: "Can't send forgot password link",
        actionResolve: () => {
          dispatch(resetUserAuth());
        },
        isNeedAction401: false,
      });
    }
  }, [forgotPasswordAct, dispatch, handleErrorMsg]);

  useEffect(() => {
    if (forgotPasswordAct?.isSuccess) {
      handleSuccessMsg({
        actionMsg: forgotPasswordAct?.successMsg,
        msg: "Successfully send forgot password link",
        actionResolve: () => {
          dispatch(resetUserAuth());
          setEmail("")
        },
      });
    }
  }, [forgotPasswordAct, dispatch, handleSuccessMsg]);

  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[500px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h4 className="text-center">Forgot Password</h4>
          </div>
          <div className="col-span-12">
            <InputTextLable
              value={email}
              placeholder={"Enter Email"}
              onChange={(e) => {
                setEmail(e.target.value);
                delete formError?.email;
              }}
              label={"Email"}
              error={formError?.email}
            />
          </div>
          <div className="col-span-12 flex justify-center items-center">
            <ButtonBox type={forgotPasswordAct?.isLoading ? "" : "submit"}>
              {forgotPasswordAct?.isLoading ? <ButtonLoading /> : "Send Link"}
            </ButtonBox>
          </div>
          <div className="col-span-12 text-center">
            <Link to={"/login"}>Back to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
