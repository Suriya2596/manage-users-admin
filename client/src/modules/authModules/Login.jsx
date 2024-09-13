import { useEffect, useState } from "react";
import {
  InputPasswordLable,
  InputTextLable,
} from "../../components/common/InputFields";
import {
  validateEmail,
  validatePassword,
} from "../../components/helpers/Validations";
import { Link, useNavigate } from "react-router-dom";
import { ButtonBox, ButtonLoading } from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { userAuthLoginAction } from "../../redux/feature/userAuth/userAuthActions";
import { useErrorMsgContext } from "../../context/ErrorMsgContext";
import { useSuccessMsgContext } from "../../context/SuccessMsgContext";
import { resetUserAuth } from "../../redux/feature/userAuth/userAuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleErrorMsg } = useErrorMsgContext();
  const { handleSuccessMsg } = useSuccessMsgContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  let formErr = {};

  const { loginAct } = useSelector((state) => {
    return state.userAuth;
  });

  const handleFormError = () => {
    if (String(email).trim().length === 0) {
      formErr.email = "Email is required";
    } else if (!validateEmail(email)) {
      formErr.email = "Email is invalidate";
    }

    if (String(password).trim().length === 0) {
      formErr.password = "Password is required";
    } else if (!validatePassword(password)) {
      formErr.password =
        "Password use 8 charater, atleast one uppercase, atleast one number, atleast one symbol";
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormError();
    if (Object.keys(formErr).length > 0) {
      setFormError(formErr);
      formErr = {};
    } else {
      localStorage.clear();
      const formData = {
        email,
        password,
      };
      dispatch(userAuthLoginAction({ formData }));
    }
  };

  useEffect(() => {
    if (loginAct?.isError) {
      handleErrorMsg({
        actionResponse: loginAct?.errorResponse,
        msg: "Error in login",
        actionResolve: () => {
          dispatch(resetUserAuth());
        },
        isNeedAction401: false,
      });
    }
  }, [loginAct?.isError, dispatch]);

  useEffect(() => {
    if (loginAct?.isSuccess) {
      handleSuccessMsg({
        actionMsg: loginAct?.successMsg,
        msg: "Successfully login",
        actionResolve: () => {
          dispatch(resetUserAuth());
          navigate("/");
        },
      });
    }
  }, [loginAct?.isSuccess]);

  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[500px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h4 className="text-center">Login</h4>
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
          <div className="col-span-12">
            <InputPasswordLable
              value={password}
              placeholder={"Enter Password"}
              onChange={(e) => {
                setPassword(e.target.value);
                delete formError?.password;
              }}
              label={"Password"}
              error={formError?.password}
            />
          </div>
          <div className="col-span-12 flex justify-center items-center">
            <ButtonBox type={loginAct?.isLoading ? "" : "submit"}>
              {loginAct?.isLoading ? <ButtonLoading /> : "Login"}
            </ButtonBox>
          </div>
          <div className="col-span-12 text-center">
            <span>Don&lsquo;t have account?</span>{" "}
            <Link to={"/signup"}>Register</Link>
          </div>
          <div className="col-span-12 text-center">
            <Link to={"/forgotPassword"}>Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
