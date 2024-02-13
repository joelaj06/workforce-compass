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
    title: "Employees",
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
    <div className="">
      <div className=" w-52 sticky h-[calc(100vh-48px)] bg-white px-1 pe-5 transition ease-in duration-400 ">
        <div>
          <div>
            <h4>Roll Kall</h4>
          </div>

          <div className="">
            {menuItems.map(({ title, icon, id, link }) => {
              return (
                <div
                  key={id}
                  className={`text-skin-base p-2 ml-4  rounded-xl  transition !duration-400 ease-in ${
                    location.pathname == link &&
                    "opacity-80 bg-skin-active !text-primary-color font-semibold"
                  }`}
                >
                  <Link to={link} key={id} className="flex">
                    <span className="pe-1">{icon}</span>
                    <p className="title">{title}</p>
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
