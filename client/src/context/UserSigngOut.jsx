import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { redirect } from "react-router-dom";

const UserSigngOut = createContext();

const UserSigngOutProvider = ({ children }) => {
  const handleSignOut = () => {
    redirect("/login");
  };
  return (
    <UserSigngOut.Provider value={{ handleSignOut }}>
      {children}
    </UserSigngOut.Provider>
  );
};

const useUserSigngOut = () => {
  return useContext(UserSigngOut);
};

UserSigngOutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
// eslint-disable-next-line react-refresh/only-export-components
export { useUserSigngOut, UserSigngOutProvider };
