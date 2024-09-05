import PropTypes from "prop-types";
export const ButtonBox = ({ children, type }) => {
  return (
    <div>
      <button
        type={type || "button"}
        className="font-[500] outline-none border-none bg-primOne hover:bg-primTwo text-whiteOne hover:text-primOne  px-12 py-1.5 rounded-[6px]"
      >
        {children}
      </button>
    </div>
  );
};

ButtonBox.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export const ButtonCancle = ({ children, type }) => {
  return (
    <div>
      <button
        type={type || "button"}
        className="font-[500] outline-none border-none bg-primThree hover:bg-darkOne text-darkTwo hover:text-whiteOne px-12 py-1.5 rounded-[6px]"
      >
        {children}
      </button>
    </div>
  );
};

ButtonCancle.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};
