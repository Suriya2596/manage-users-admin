import { useState } from "react";
import {
  InputNumberLable,
  InputPasswordLable,
  InputTextLable,
} from "../../components/common/InputFields";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../components/helpers/Validations";
import { Link } from "react-router-dom";
import { ButtonBox } from "../../components/common/Button";

const Signup = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatePassword, setRepeatePassword] = useState("");
  const [formError, setFormError] = useState({});
  let formErr = {};

  const handleFormError = () => {
    if (String(name).trim().length === 0) {
      formErr.name = "Name is required";
    }
    if (String(mobile).trim().length === 0) {
      formErr.mobile = "Mobile is required";
    }
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
        name,
        email: String(email).toLowerCase(),
        mobile,
        password,
        role:"user"
      };
      console.log(formData);
    }
  };

  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[500px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h4 className="text-center">Register</h4>
          </div>
          <div className="col-span-12">
            <InputTextLable
              value={name}
              placeholder={"Enter Name"}
              onChange={(e) => {
                if (validateName(e.target.value)) {
                  setName(e.target.value);
                  delete formError?.name;
                }
              }}
              label={"Name"}
              error={formError?.name}
            />
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
            <InputNumberLable
              value={mobile}
              placeholder={"Enter Mobile"}
              onChange={(e) => {
                setMobile(e.target.value);
                if (String(e.target.value).trim().length !== 10) {
                  setFormError({
                    ...formError,
                    mobile: "Mobile length should be 10",
                  });
                } else {
                  delete formError?.mobile;
                }
              }}
              label={"Mobile"}
              error={formError?.mobile}
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
          <div className="col-span-12">
            <InputPasswordLable
              value={repeatePassword}
              placeholder={"Enter Repeate Password"}
              onChange={(e) => {
                setRepeatePassword(e.target.value);
                if (password.trim() !== e.target.value.trim()) {
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
            <ButtonBox type={"submit"}>Sign up</ButtonBox>
          </div>
          <div className="col-span-12 text-center">
            <span>Already have account?</span> <Link to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
