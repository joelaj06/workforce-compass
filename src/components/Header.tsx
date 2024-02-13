import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import * as stylex from "@stylexjs/stylex";
import { Avatar } from "@mui/material";
import { getInitials, stringToColor } from "../utils/getInitials";

const styles = stylex.create({
  header: {
    backgroundColor: "white",
    boxShadow: "1px 1px 3px #80808052",
    gap: "20px",
    padding: "8px 4px",
    height: "45px",
    position: "sticky",
    top: 0,
    zIndex: 1,
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  divider: {
    width: "1px",
    height: "100%",
    backgroundColor: "#d7d7d7",
    margin: " 0 10px",
  },
  userProfile: {
    display: "flex",
    gap: "12px",
  },

  userRole: {
    fontSize: "12px",
  },
});

const notificationIcon = <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>;

const Header = () => {
  function stringAvatar(firstname: string, lastname: string) {
    return {
      sx: {
        bgcolor: stringToColor(firstname, lastname),
      },
      children: getInitials(firstname, lastname),
    };
  }
  const handleNotification = () => {
    console.log("Notification");
  };

  return (
    <>
      <div {...stylex.props(styles.header)}>
        <div>
          <span onClick={handleNotification}>{notificationIcon}</span>
        </div>

        <div {...stylex.props(styles.divider)}></div>
        <div {...stylex.props(styles.userProfile)}>
          <Avatar {...stringAvatar("Osei", "Bonsu")} />
          <div>
            <div>Mr. Osei Bonsu</div>
            <span>HR Admin</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
