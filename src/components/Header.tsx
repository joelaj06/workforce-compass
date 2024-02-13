import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Avatar } from "@mui/material";
import { getInitials, stringToColor } from "../utils/getInitials";

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
      <div className="bg-white shadow-md gap-20px p-8px 4px h-45px sticky top-0 z-10 flex justify-end items-center">
        <div>
          <span onClick={handleNotification}>{notificationIcon}</span>
        </div>

        <div className="w-1 h-full bg-gray-300 m-0 10px"></div>
        <div className="flex gap-12">
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
