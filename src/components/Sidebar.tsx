import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faPeopleGroup,
  faGear,
  faRightFromBracket,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { AppPages } from "../routes/appPages";
import * as stylex from "@stylexjs/stylex";

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

const styles = stylex.create({
  sideContainer: {
    backgroundColor: "white",
    width: " 215px",
    height: " calc(100vh - 45px)",
    position: "sticky",
    color: "white",
    transition: "0.4s",
    bottom: 0,
    top: "45px",
  },
  sideNavContainer: {},
  navUpper: {
    display: "grid",
    overflow: "hidden",
  },
  navHeading: {},
  navBrand: {},
  navMenu: {},
  menuItem: {
    height: "45px",
    width: "12em",
    display: "flex",
    alignItems: "center",
    color: "white",
    textDecoration: "none",
    margin: "auto 6px",
    borderRadius: "30px",
    position: "relative",
  },
  navFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "0px 8px",
    backgroundColor: "blue",
    display: "flex",
    alignContent: "flex-start",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "4px",
  },
  navDetails: {},
  navFooterInfo: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  activeMenuItme: {},
});

const SideBar = () => {
  //states
  const logout = async () => {};

  return (
    <>
      <div {...stylex.props(styles.sideContainer)}>
        <div {...stylex.props(styles.sideNavContainer)}>
          <div {...stylex.props(styles.navUpper)}>
            <div {...stylex.props(styles.navHeading)}>
              <div {...stylex.props(styles.navBrand)}>
                <h4>Roll Kall</h4>
              </div>
            </div>
            <div {...stylex.props(styles.navMenu)}>
              {menuItems.map(({ title, icon, id, link }) => {
                return (
                  <Link to={link} key={id}>
                    <span>{icon}</span>
                    <p>{title}</p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <span onClick={logout}>{logoutIcon}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
