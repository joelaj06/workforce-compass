import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Avatar, IconButton } from "@mui/material";
import { getInitials, stringToColor } from "../utils/getInitials";
import { useLazyGetUserQuery } from "./login/common/authentication-api";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "../app/store";
import { setActiveUser } from "../pages/Employees/common/user-slice";
import { IUser } from "../pages/Employees/common/employee";
import { useLazyGetOrganizationsQuery } from "../pages/Settings/common/settings-api";
import { IErrorData } from "./login/common/auth";
import { showToast } from "../utils/ui/notifications";
import { setOrganization } from "../pages/Settings/common/settings-slice";
import LogoutIcon from "@mui/icons-material/Logout";
import AlertDialogComponent from "./AlertDialogComponent";

const notificationIcon = <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>;

const Header = () => {
  //hooks
  const [getUser] = useLazyGetUserQuery();
  const dispatch: AppDispatch = useDispatch();
  const [getOrganization] = useLazyGetOrganizationsQuery();

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:root");

    // Redirect to login page
    window.location.href = "/login";
  };

  const fetchUser = async () => {
    const res = await getUser();
    if (res && res.data) {
      setCurrentUser(res.data);
      dispatch(setActiveUser(res.data));
    }
  };

  const fetchOrganization = async () => {
    const res = await getOrganization();
    if (res && res.data) {
      dispatch(setOrganization(res.data));
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  //functions
  useEffect(() => {
    fetchUser();
  }, []);

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
                src={currentUser?.imgUrl}
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
          <AlertDialogComponent
            title={"Logout"}
            content={
              <p className="text-center">Are you sure you want to logout?</p>
            }
            onRightButtonClicked={handleLogout}
          >
            <IconButton>
              {" "}
              <div
                //onClick={}
                className="flex flex-row gap-1 items-center cursor-pointer"
              >
                <Avatar
                  sx={{
                    height: "30px",
                    width: "30px",
                    fontSize: "12px",
                    backgroundColor: "#dc2626",
                    color: "#dc2626",
                  }}
                >
                  <LogoutIcon sx={{ fontSize: "16px", color: "white" }} />
                </Avatar>
                <span className="text-sm">Logout</span>
              </div>
            </IconButton>
          </AlertDialogComponent>
        </div>
      </div>
    </>
  );
};

export default Header;
