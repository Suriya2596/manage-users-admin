import { ButtonBox, ButtonCancle } from "../../components/common/Button";

const UserDashboard = () => {
  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[400px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        <div className=" grid grid-cols-12 gap-4">
          <div className="col-span-12 text-center">
            <h4>User Details</h4>
          </div>
          <div className="col-span-12 flex items-center gap-4">
            <span>Name:</span>
            <span>Suriya</span>
          </div>
          <div className="col-span-12 flex items-center gap-4">
            <span>Email:</span>
            <span>Suriya@gmail.com</span>
          </div>
          <div className="col-span-12 flex items-center gap-4">
            <span>Mobile:</span>
            <span>9080866066</span>
          </div>
          <div className="col-span-12 flex items-center gap-4">
            <span>Role:</span>
            <span>User</span>
          </div>
          <div className="col-span-12">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
              <ButtonBox to={"/editUser"}>Edit</ButtonBox>
              <ButtonCancle to={"/changePassword"}>Change Password</ButtonCancle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
