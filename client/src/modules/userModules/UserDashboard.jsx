import { useDispatch, useSelector } from "react-redux";
import { ButtonBox, ButtonCancle } from "../../components/common/Button";
import { useEffect } from "react";
import { userAuthGetLoggedAction } from "../../redux/feature/userAuth/userAuthActions";
import { PageLoading } from "../../components/common/LoadingCustom";

const UserDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      return dispatch(userAuthGetLoggedAction());
    };
  }, [dispatch]);

  const { getUserLoggedAct, userData } = useSelector((state) => {
    return state.userAuth;
  });
  
  return (
    <div className="bg-whiteOne h-[100vh] flex justify-center items-center px-4">
      <div className=" w-[100%] md:w-[400px] px-4 py-4 rounded-[6px] bg-white border-2 border-whiteTwo">
        {getUserLoggedAct?.isLoading ? (
          <PageLoading />
        ) : (
          <div className=" grid grid-cols-12 gap-4">
            <div className="col-span-12 text-center">
              <h4>User Details</h4>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Name:</span>
              <span>{userData?.name || ""}</span>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Email:</span>
              <span>{userData?.email || ""}</span>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Mobile:</span>
              <span>{userData?.mobile || ""}</span>
            </div>
            <div className="col-span-12 flex items-center gap-4">
              <span>Role:</span>
              <span>{userData?.name || ""}</span>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <ButtonBox to={"/editUser"} className={"w-[100%] sm:w-auto"}>
                  Edit
                </ButtonBox>
                <ButtonCancle
                  to={"/changePassword"}
                  className={"w-[100%] sm:w-auto"}
                >
                  Change Password
                </ButtonCancle>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
