import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faPeopleGroup,
  faGear,
  // faRightFromBracket,
  faShareFromSquare,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
//import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { AppPages } from "../routes/appPages";
import { useState } from "react";

const dashboardIcon = <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>;
const reportsIcon = <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>;
const users = <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>;
const teams = <FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon>;
const leaves = <FontAwesomeIcon icon={faShareFromSquare}></FontAwesomeIcon>;
const settings = <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>;

// const logoutIcon = (
//   <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
// );

const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboardIcon,
    link: AppPages.dashboard,
  },
  {
    id: 2,
    title: "Users",
    icon: users,
    link: AppPages.employees,
  },
  {
    id: 3,
    title: "Leaves",
    icon: leaves,
    link: AppPages.leaves,
  },
  {
    id: 4,
    title: "Teams",
    icon: teams,
    link: AppPages.teams,
  },
  {
    id: 5,
    title: "Tasks",
    icon: <AssignmentIcon />,
    link: AppPages.tasks,
  },
  {
    id: 6,
    title: "Reports",
    icon: reportsIcon,
    link: AppPages.reports,
  },
  {
    id: 7,
    title: "Settings",
    icon: settings,
    link: AppPages.settings,
  },
];

const SideBar = () => {
  //states
  // const logout = async () => {};

  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(() => {
    if (location && location.pathname) {
      return location.pathname;
    }
  });

  return (
    <div className="w-full h-full bg-white  text-primary shadow-md">
      <div className=" transition ease-in duration-400 ">
        <div>
          <div className="h-14 content-center p-3">
            <p>Work Compass</p>
          </div>

          <div className="">
            {menuItems.map(({ title, icon, id, link }) => {
              const isActive = selectedMenu == link;
              return (
                <div
                  key={id}
                  className={`p-2  ml-2 mb-2 rounded-s-full  transition duration-400 ease-in ${
                    isActive &&
                    "bg-primary-color font-semibold text-white shadow-custom"
                  } ${isActive ? " hover:bg-[#086d6d]" : " hover:bg-gray-300"}`}
                >
                  <Link
                    to={link}
                    key={id}
                    className="flex"
                    onClick={() => setSelectedMenu(link)}
                  >
                    <span className="px-3">{icon}</span>
                    <p className="">{title}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="">
          <span onClick={logout} className="">
            {logoutIcon}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default SideBar;
