import { lazy } from "react";

import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/helpers/ScrollTop";
import Loadable from "./components/helpers/Loadable";
import { Toaster } from "react-hot-toast";
// components
// Auth
const Login = Loadable(lazy(() => import("./modules/authModules/Login")));
const Signup = Loadable(lazy(() => import("./modules/authModules/Signup")));
const ForgotPassword = Loadable(
  lazy(() => import("./modules/authModules/ForgotPassword"))
);
const ResetPassword = Loadable(
  lazy(() => import("./modules/authModules/ResetPassword"))
);
// User
const UserDashboard = Loadable(
  lazy(() => import("./modules/userModules/UserDashboard"))
);
const EditUser = Loadable(lazy(() => import("./modules/userModules/EditUser")));
const ChangePassword = Loadable(
  lazy(() => import("./modules/userModules/ChangePassword"))
);
// Admin

const App = () => {
  return (
    <ScrollToTop>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        <Route path="/" element={<UserDashboard />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
    </ScrollToTop>
  );
};

export default App;
