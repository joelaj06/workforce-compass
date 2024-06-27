import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import { getInitials, stringToColor } from "../utils/getInitials";
import { useLazyGetUserQuery } from "./login/common/authentication-api";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "../app/store";
import { setActiveUser } from "../pages/Employees/common/user-slice";
import { IUser } from "../pages/Employees/common/employee";

const notificationIcon = <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>;

const Header = () => {
  //hooks
  const [getUser] = useLazyGetUserQuery();
  const dispatch: AppDispatch = useDispatch();

  // state variables
  const [currentUser, setCurrentUser] = useState<IUser>();

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

  const fetchUser = async () => {
    const res = await getUser();
    if (res && res.data) {
      setCurrentUser(res.data);
      dispatch(setActiveUser(res.data));
    }
  };

  //functions
  useEffect(() => {
    fetchUser();
  }, [getUser]);

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
            {currentUser?.image ? (
              <Avatar
                src={currentUser?.image}
                sx={{ width: "30px", height: "30px" }}
              />
            ) : (
              <Avatar
                {...stringAvatar(
                  currentUser?.first_name ?? "",
                  currentUser?.last_name ?? ""
                )}
              />
            )}
            <div>
              <div className="text-sm">{currentUser?.email ?? ""}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
