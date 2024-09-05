import { useState } from "react";
import {
  InputNumberLable,
  InputTextLable,
} from "../../components/common/InputFields";
import {
  validateName,
} from "../../components/helpers/Validations";
import { Link } from "react-router-dom";
import { ButtonBox } from "../../components/common/Button";

const EditUser = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [formError, setFormError] = useState({});
  let formErr = {};

  const handleFormError = () => {
    if (String(name).trim().length === 0) {
      formErr.name = "Name is required";
    }
    if (String(mobile).trim().length === 0) {
      formErr.mobile = "Mobile is required";
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
        mobile,
      };
      console.log(formData);
    }
  };

  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[500px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <h4 className="text-center">Edit User</h4>
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
          <div className="col-span-12 flex justify-center items-center">
            <ButtonBox type={"submit"}>Save Change</ButtonBox>
          </div>
          <div className="col-span-12 text-center flex justify-center items-center gap-4 flex-col lg:flex-row">
            <Link to={"/"}>Back to home</Link> (or)
            <Link to={"/changePassword"}>Change Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
