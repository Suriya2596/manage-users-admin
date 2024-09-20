import { useEffect, useState, useRef } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// * React icons
import { TbBrandGoogleHome } from "react-icons/tb";
import {
  MdOutlineRocketLaunch,
  MdOutlineCampaign,
  MdOutlineCloudUpload,
} from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { IoStatsChartOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { RiBubbleChartFill } from "react-icons/ri";
import { PiLineSegmentsFill } from "react-icons/pi";

// components
import SubMenu from "./SubMenu";
import { useMediaQuery } from "@mantine/hooks";

const AdminLayout = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 1023px)" });
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(isTabletMid ? false : true);

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid, pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const menuItems = [
    {
      name: "Dashboard",
      link: "/",
      icon: TbBrandGoogleHome,
      submenus: [],
    },
    {
      name: "Campaigns",
      link: "/campaign",
      icon: MdOutlineCampaign,
      submenus: [
        {
          name: "Manage Campaign",
          link: "/campaign/manage-campaign",
          icon: RiBubbleChartFill,
        },
      ],
    },
    {
      name: "Upload",
      link: "/upload",
      icon: MdOutlineCloudUpload,
      submenus: [
        {
          name: "Manage Import",
          link: "/upload/manage-import",
          icon: RiBubbleChartFill,
        },
        {
          name: "Suppress Contacts",
          link: "/upload/suppress-contacts",
          icon: RiBubbleChartFill,
        },
        {
          name: "Suppress Contacts List",
          link: "/upload/manage-suppress-contacts",
          icon: RiBubbleChartFill,
        },
      ],
    },
    {
      name: "Reports",
      link: "/report",
      icon: IoStatsChartOutline,
      submenus: [
        {
          name: "General Report",
          link: "/report/general-report",
          icon: RiBubbleChartFill,
        },
        {
          name: "Operation Report",
          link: "/report/operation-report",
          icon: RiBubbleChartFill,
        },
        {
          name: "Conversion Report",
          link: "/report/conversion-report",
          icon: RiBubbleChartFill,
        },
        {
          name: "Test SMS Report",
          link: "/report/test-sms-report",
          icon: RiBubbleChartFill,
        },
      ],
    },
    {
      name: "Logs",
      link: "/logs",
      icon: RiBubbleChartFill,
      submenus: [
        {
          name: "Server Logs",
          link: "/logs/server-logs",
          icon: RiBubbleChartFill,
        },
        {
          name: "Activity Logs",
          link: "/logs/activity-logs",
          icon: RiBubbleChartFill,
        },
        {
          name: "Click Logs",
          link: "/logs/click-logs",
          icon: RiBubbleChartFill,
        },
        {
          name: "Upload Logs",
          link: "/logs/upload-logs",
          icon: RiBubbleChartFill,
        },
      ],
    },
    {
      name: "Segmentations",
      link: "/segmentation",
      icon: PiLineSegmentsFill,
      submenus: [],
    },
    {
      name: "Accounts",
      link: "/accounts",
      icon: GoShieldCheck,
      submenus: [
        {
          name: "Manage Organisation",
          link: "/accounts/organisation",
          icon: RiBubbleChartFill,
        },
        {
          name: "Manage Reseller",
          link: "/accounts/reseller",
          icon: RiBubbleChartFill,
        },
        {
          name: "Manage Client",
          link: "/accounts/client",
          icon: RiBubbleChartFill,
        },
        {
          name: "Manage Accounts",
          link: "/accounts/users",
          icon: RiBubbleChartFill,
        },
      ],
    },
    {
      name: "Setting",
      link: "/setting",
      icon: FiSettings,
      submenus: [
        {
          name: "Customization",
          link: "/setting/customization",
          icon: RiBubbleChartFill,
        },
        {
          name: "Email Templates",
          link: "/setting/email-templete",
          icon: RiBubbleChartFill,
        },
        {
          name: "Manage Category",
          link: "/setting/manage-category",
          icon: RiBubbleChartFill,
        },
        {
          name: "Manage SMPP",
          link: "/setting/manage-smpp",
          icon: RiBubbleChartFill,
        },
        {
          name: "Manage Sender ID",
          link: "/setting/manage-sender-id",
          icon: RiBubbleChartFill,
        },
        {
          name: "DLT Templates",
          link: "/setting/dlt-templates",
          icon: RiBubbleChartFill,
        },
        {
          name: "Smart Link",
          link: "/setting/smart-link",
          icon: RiBubbleChartFill,
        },
        {
          name: "API Token",
          link: "/setting/api-token",
          icon: RiBubbleChartFill,
        },
      ],
    },
    {
      name: "Release Notes",
      link: "/release-notes",
      icon: MdOutlineRocketLaunch,
      submenus: [],
    },
    {
      name: "Help",
      link: "/documentation",
      icon: BsFillQuestionCircleFill,
      submenus: [],
    },
  ];

  return (
    <div className={`${isTabletMid ? "" : "flex"}`}>
      <motion.div className={`${open ? "w-[250px]" : "w-[90px]"} width-ainm`}>
        <div
          onClick={() => setOpen(false)}
          className={`${
            isTabletMid ? "" : "hidden"
          } fixed inset-0 max-h-screen z-[60] bg-black/50 ${
            open ? "block" : "hidden"
          } `}
        ></div>
        <motion.div
          ref={sidebarRef}
          variants={Nav_animation}
          initial={{ x: isTabletMid ? -250 : 0 }}
          animate={open ? "open" : "closed"}
          className={` bg-primOne text-whiteOne shadow-xl z-[70] ${
            open ? "min-w-[250px]" : "min-w-[80px]"
          }    fixed h-screen`}
        >
          <div className="flex items-center justify-center gap-2.5 font-medium pt-6 pb-3">
            <Link to="/">
              {open ? (
                <div className="mx-3">
                  <img
                    src={"/assets/images/Login-Forgot/LogoTextWHite.svg"}
                    alt={"logo"}
                    className={"mx-auto w-36"}
                  />
                </div>
              ) : (
                <div className="pl-2">
                  <img
                    src={"/assets/images/dripeek-color-logo-icon.svg"}
                    alt={"logo"}
                    className={"mx-auto w-[80px] h-auto"}
                  />
                </div>
              )}
            </Link>
          </div>

          <div className="h-[100%] relative ">
            <ul
              className={`${
                open && "overflow-auto "
              } whitespace-pre px-3 text-[0.9rem] py-4 flex flex-col gap-1 font-medium -z-20 h-[calc(100%-100px)] scrollbar-hide `}
            >
              {menuItems &&
                menuItems.map(({ name, link, icon: Icon, submenus }, m) => {
                  return (
                    <li key={m} className=" ">
                      {submenus.length > 0 ? (
                        <div className="flex flex-col gap-1  ">
                          <SubMenu
                            data={{ name, link, icon: Icon, submenus }}
                            open={open}
                            setOpen={setOpen}
                          />
                        </div>
                      ) : open ? (
                        <NavLink
                          to={link}
                          className={` ${
                            pathname == link
                              ? "bg-primOne  text-whiteOne"
                              : "hover:text-whiteOne group"
                          } p-2.5 text-whiteOne flex rounded-md gap-6 items-center md:cursor-pointer cursor-default duration-300 font-medium  `}
                        >
                          <Icon
                            size={23}
                            className="min-w-max group-hover:text-whiteOne"
                          />
                          {name}
                        </NavLink>
                      ) : (
                        <NavLink
                          to={link}
                          className={` ${
                            pathname == link
                              ? "bg-primOne text-whiteOne"
                              : "hover:text-whiteOne group"
                          } p-2.5 flex rounded-md gap-6 items-center justify-center md:cursor-pointer cursor-default duration-300 font-medium   `}
                        >
                          <Icon
                            size={23}
                            className="min-w-max group-hover:text-whiteOne"
                          />
                        </NavLink>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </motion.div>
      </motion.div>
      <div
        className={`${
          isTabletMid
            ? "w-[100%]"
            : open
            ? "w-[calc(100%_-_255px)]"
            : "w-[calc(100%_-_90px)]"
        } ml-auto bg-[#F9FCFE] width-ainm px-2 py-4 md:px-4`}
      >
        <div className="grid grid-cols-12 gap-4  ">
          <div className="col-span-12 pb-2  sticky top-0 p-1 z-50 bg-[#F9FCFE]">
            <div className="grid grid-cols-12 gap-4 md:gap-0  ">
              <div className="col-span-12 md:col-span-6">
                <div className="flex items-center gap-4">
                  <div>
                    <button
                      onClick={() => {
                        setOpen(!open);
                      }}
                      className="p-3 bg-[#F9FCFE] border-[#EEEEEE] border-2 w-[48px] h-[48px] rounded-[8px]"
                    >
                      <BiMenu className="w-[22px] h-[22px] text-[#A1A5B7]" />
                    </button>
                  </div>
                  <div>{/* <PageNavgiatorHeader /> */}</div>
                </div>
              </div>
              {/* <HeaderLayout /> */}
            </div>
          </div>
          <div className="col-span-12 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
