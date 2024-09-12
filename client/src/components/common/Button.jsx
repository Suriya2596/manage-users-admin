import { Loader } from "@mantine/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ButtonLoading = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Loader color="#fff" size={15} />
      <p className="text-[#fff] text-[15px] font-semibold">Loading...</p>
    </div>
  );
};
export const ButtonBox = ({
  children,
  type = "button",
  to,
  onClick = () => {},
}) => {
  return (
    <div>
      {to ? (
        <Link
          to={to || "/"}
          className="font-[500] outline-none border-none bg-primOne hover:bg-primTwo text-whiteOne hover:text-primOne  px-8 py-1.5 rounded-[6px]"
        >
          {children}
        </Link>
      ) : (
        <button
          type={type || "button"}
          onClick={() => {
            if (type === "button") {
              onClick();
            }
          }}
          className="font-[500] outline-none border-none bg-primOne hover:bg-primTwo text-whiteOne hover:text-primOne  px-8 py-1.5 rounded-[6px]"
        >
          {children}
        </button>
      )}
    </div>
  );
};

ButtonBox.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export const ButtonCancle = ({ children, type, to }) => {
  return (
    <div>
      {to ? (
        <Link
          to={to || "/"}
          className="font-[500] outline-none border-none bg-primThree hover:bg-darkOne text-darkTwo hover:text-whiteOne px-8 py-1.5 rounded-[6px]"
        >
          {children}
        </Link>
      ) : (
        <button
          type={type || "button"}
          className="font-[500] outline-none border-none bg-primThree hover:bg-darkOne text-darkTwo hover:text-whiteOne px-8 py-1.5 rounded-[6px]"
        >
          {children}
        </button>
      )}
    </div>
  );
};

ButtonCancle.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  to: PropTypes.string,
};
