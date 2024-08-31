import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({});
const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReduxProvider;
