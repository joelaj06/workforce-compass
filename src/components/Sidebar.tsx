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
import { NavLink, useLocation } from "react-router-dom";
//import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { AppPages } from "../routes/appPages";
import { useEffect, useState } from "react";
import { IOrganization } from "../pages/Settings/common/settings";
import { useLazyGetOrganizationsQuery } from "../pages/Settings/common/settings-api";
import { IErrorData } from "./login/common/auth";
import { showToast } from "../utils/ui/notifications";

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

  const [getOrganization] = useLazyGetOrganizationsQuery();
  const location = useLocation();

  const [organization, setOrganization] = useState<IOrganization>();
  const [selectedMenu, setSelectedMenu] = useState(() => {
    if (location && location.pathname) {
      return location.pathname == "/" ? AppPages.dashboard : location.pathname;
    }
  });

  const fetchOrganization = async () => {
    const res = await getOrganization();
    if (res && res.data) {
      setOrganization(res.data);
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  return (
    <div className="w-full h-full bg-white  text-primary shadow-md flex flex-col justify-between">
      <div className=" transition ease-in duration-400 flex flex-col justify-between">
        <div>
          <div className="h-14 content-center p-3">
            <p className="font-bold text-primary-color">Work Compass</p>
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
                  <NavLink
                    to={link}
                    key={id}
                    className="flex"
                    onClick={() => setSelectedMenu(link)}
                  >
                    <span className="px-3">{icon}</span>
                    <p className="">{title}</p>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* app logo and version */}
      <div className="flex flex-col justify-between items-center">
        <img
          src={organization?.logo}
          className="w-36"
          alt="Organization logo"
        />
        <p className="text-xs font-bold text-center">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default SideBar;
