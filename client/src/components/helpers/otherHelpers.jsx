import cookies from "js-cookie";
import PropTypes from "prop-types";

export const setCookiee = ({ name, value }) => {
  return cookies.set(name, JSON.stringify(value));
};

setCookiee.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
};
