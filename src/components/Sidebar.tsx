import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faPeopleGroup,
  faGear,
  faRightFromBracket,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

import { AppPages } from "../routes/appPages";

const dashboardIcon = <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>;
const users = <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>;
const teams = <FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon>;
const leaves = <FontAwesomeIcon icon={faShareFromSquare}></FontAwesomeIcon>;
const settings = <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>;
const logoutIcon = (
  <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
);

const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboardIcon,
    link: AppPages.index,
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
    icon: teams,
    link: AppPages.leaves,
  },
  {
    id: 4,
    title: "Notifications",
    icon: leaves,
    link: AppPages.notifications,
  },
  {
    id: 5,
    title: "Settings",
    icon: settings,
    link: AppPages.settings,
  },
];

const SideBar = () => {
  //states
  const logout = async () => {};

  const location = useLocation();

  return (
    <div className="w-full h-full bg-white  text-primary shadow-md">
      <div className=" transition ease-in duration-400 ">
        <div>
          <div className="h-14 content-center p-3">
            <p>Work Compass</p>
          </div>

          <div className="">
            {menuItems.map(({ title, icon, id, link }) => {
              return (
                <div
                  key={id}
                  className={`p-2  ml-2 mb-2 hover:bg-gray-300 rounded-s-full  transition duration-400 ease-in ${
                    location.pathname == link &&
                    "bg-primary-color font-semibold text-white shadow-custom"
                  }`}
                >
                  <Link to={link} key={id} className="flex">
                    <span className="px-3">{icon}</span>
                    <p className="">{title}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="">
          <span onClick={logout} className="">
            {logoutIcon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
