import { getCookies } from "../helpers/otherHelpers";
import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRouter = () => {
  return <>{getCookies("token") ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export const AuthRouter = () => {
  return <>{getCookies("token") ? <Navigate to={"/"} /> : <Outlet />}</>;
};
