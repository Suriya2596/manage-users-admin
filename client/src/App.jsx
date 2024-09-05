import { lazy } from 'react'

import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/helpers/ScrollTop";
import Loadable from "./components/helpers/Loadable";

// components
const Login  = Loadable(lazy(()=>import("./modules/authModules/Login")))
const Signup  = Loadable(lazy(()=>import("./modules/authModules/Signup")))

const App = () => {
  return <ScrollToTop>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </ScrollToTop>;
};

export default App;
