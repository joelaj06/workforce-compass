import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import { getInitials, stringToColor } from "../utils/getInitials";

const notificationIcon = <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>;

const Header = () => {
  function stringAvatar(firstname: string, lastname: string) {
    return {
      sx: {
        bgcolor: stringToColor(firstname, lastname),
        height: "30px",
        width: "30px",
        fontSize: "10px",
      },
      children: getInitials(firstname, lastname),
    };
  }
  const handleNotification = () => {
    console.log("Notification");
  };

  return (
    <>
      <div className="bg-white p-1 w-full h-14 shadow-sm content-center">
        <div className="flex items-center justify-end px-5 gap-2">
          <div className="cursor-pointer" onClick={handleNotification}>
            <Avatar
              sx={{
                height: "30px",
                width: "30px",
                fontSize: "12px",
                backgroundColor: "#f0f0f0",
                color: "var(--primary-color)",
              }}
            >
              {" "}
              {notificationIcon}
            </Avatar>
          </div>
          <div className="text-xl px-1">|</div>
          <div className="w-1 h-full bg-gray-300 m-0 10px"></div>
          <div className="flex gap-1 items-center">
            <Avatar {...stringAvatar("Osei", "Bonsu")} />
            <div>
              <div>obosei@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
