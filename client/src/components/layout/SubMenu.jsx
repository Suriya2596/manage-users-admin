import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { GoDot } from "react-icons/go";
import { TiArrowSortedDown } from "react-icons/ti";
import PropTypes from "prop-types";

const SubMenu = ({ data, open }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const buttonRef = useRef(null);
  const submenuRef = useRef(null);

  useEffect(() => {
    if (pathname.startsWith(data.link)) {
      setSubMenuOpen(true);
    } else {
      setSubMenuOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleHide = (e) => {
      if (e.key === "Escape") {
        setShowSubMenu(false);
      }
    };

    const handleOnClickOutside = (e) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowSubMenu(false);
      }
    };

    document.addEventListener("keydown", handleHide, true);
    document.addEventListener("click", handleOnClickOutside, true);

    return () => {
      document.removeEventListener("keydown", handleHide, true);
      document.removeEventListener("click", handleOnClickOutside, true);
    };
  }, []);

  return (
    <div className="relative group z-50">
      {open ? (
        <div className="overflow-y-auto scrollbar-hide">
          <motion.div
            ref={buttonRef}
            className={`${
              pathname.startsWith(data.link)
                ? "bg-primary text-white"
                : "hover:text-primary group"
            } p-2.5 flex rounded-md gap-6 items-center cursor-pointer duration-300 font-medium`}
            onClick={() => setSubMenuOpen(!subMenuOpen)}
            onMouseEnter={() => setShowSubMenu(true)}
            onMouseLeave={() => setShowSubMenu(false)}
          >
            <data.icon size={23} className="min-w-max" />
            <p
              className={`text-[0.9rem] font-medium flex-1 capitalize ${
                pathname.startsWith(data.link)
                  ? "text-white"
                  : "text-white group-hover:text-primary"
              }`}
            >
              {data.name}
            </p>
            <IoIosArrowDown
              className={`${subMenuOpen && "rotate-180"} duration-200`}
            />
          </motion.div>
          <motion.ul
            ref={submenuRef}
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={
              subMenuOpen
                ? { maxHeight: 500, opacity: 1 }
                : { maxHeight: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "linear" }}
            className="flex flex-col pl-8 text-[0.8rem] font-normal overflow-hidden scrollbar-hide"
            onMouseEnter={() => setShowSubMenu(true)}
            onMouseLeave={() => setShowSubMenu(false)}
          >
            {data.submenus?.map((menu, m) => (
              <div key={m}>
                <NavLink
                  to={menu.link}
                  className={`${
                    pathname.startsWith(menu.link)
                      ? "text-primary"
                      : "text-white"
                  } p-2.5 flex rounded-md gap-2 items-center cursor-pointer duration-300 font-medium capitalize hover:text-primary`}
                  onClick={() => setShowSubMenu(false)}
                >
                  <GoDot />
                  {menu.name}
                </NavLink>
              </div>
            ))}
          </motion.ul>
        </div>
      ) : (
        <>
          <motion.div
            ref={buttonRef}
            className={`${
              pathname.startsWith(data.link)
                ? "bg-primary text-white"
                : "hover:text-primary group"
            } p-2.5 flex rounded-md gap-6 items-center justify-center cursor-pointer duration-300 font-medium`}
            onClick={() => setShowSubMenu(!showSubMenu)}
            onMouseEnter={() => setShowSubMenu(true)}
            onMouseLeave={() => setShowSubMenu(false)}
          >
            <data.icon size={23} className="min-w-max" />
          </motion.div>
          {showSubMenu && (
            <>
              <motion.ul
                ref={submenuRef}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-[68px] top-0 mt-2 bg-white shadow-lg rounded-md p-2 text-sm z-50 border"
                onMouseEnter={() => setShowSubMenu(true)}
                onMouseLeave={() => setShowSubMenu(false)}
              >
                <div className="absolute top-2 left-[-26px]">
                  <TiArrowSortedDown
                    size={40}
                    className="text-[#fff] rotate-90"
                  />
                </div>
                {data.submenus?.map((menu, m) => (
                  <div key={m}>
                    <NavLink
                      to={menu.link}
                      className={`${
                        pathname.startsWith(menu.link)
                          ? "text-primary"
                          : "text-black"
                      } p-2.5 flex rounded-md gap-2 items-center cursor-pointer duration-300 font-medium capitalize hover:text-primary`}
                      onClick={() => setShowSubMenu(false)}
                    >
                      <GoDot />
                      {menu.name}
                    </NavLink>
                  </div>
                ))}
              </motion.ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

SubMenu.propTypes = {
  data: PropTypes.any,
  open: PropTypes.any,
};

export default SubMenu;
