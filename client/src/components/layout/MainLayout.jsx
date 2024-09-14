import { ButtonBox, ButtonCancle } from "../common/Button";
import { Outlet } from "react-router-dom";
import { getCookies } from "../helpers/otherHelpers";
import { useUserSigngOut } from "../../context/UserSigngOut";

const MainLayout = () => {
  const { handleSignOut } = useUserSigngOut();
  return (
    <>
      <div className="absolute top-0 w-[100%] px-4 pt-4">
        <div className="grid grid-cols-12">
          <div className="col-span-6 flex justify-start">
            <h5>Manage User Admin</h5>
          </div>
          <div className="col-span-6 flex items-center justify-end gap-2">
            {getCookies("token") ? (
              <div>
                <ButtonCancle onClick={handleSignOut}>Logout</ButtonCancle>
              </div>
            ) : (
              <>
                <div>
                  <ButtonBox to={"/login"}>Login</ButtonBox>
                </div>
                <div>
                  <ButtonCancle to={"/signup"}>Signup</ButtonCancle>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default MainLayout;
