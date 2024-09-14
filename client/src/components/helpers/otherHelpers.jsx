import cookies from "js-cookie";
import PropTypes from "prop-types";

export const setCookiee = ({ name, value }) => {
  return cookies.set(name, JSON.stringify(value));
};

setCookiee.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
};

export const getCookies = (name) => {
  return cookies.get(name) && JSON.parse(cookies.get(name));
};

export const removeCookies = (name) => {
  return cookies.get(name) && cookies.remove(name);
};

export const getAPIToken = (name) => {
  return cookies.get(name) && JSON.parse(cookies.get(name));
};
