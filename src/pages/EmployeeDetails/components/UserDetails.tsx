import { useParams } from "react-router-dom";
import UserSummaryCard from "./UserSummaryCard";
import { useEffect, useState } from "react";
import { IUser } from "../../Employees/common/employee";
import TabsComponent, { Tab } from "../../../components/TabComponent";
import UserAttendanceRecords from "./UserAttendanceRecords";
import LeaveQuota from "./LeaveQuota";
import UserInfo from "./UserInfo";
import { useLazyGetUserDetailsQuery } from "../../Employees/common/users-api";
import { showToast } from "../../../utils/ui/notifications";
import { IErrorData } from "../../../components/login/common/auth";
import LoadingBox from "../../../components/LoadingBox";

const UserDetails = () => {
  const defaultUser: IUser = {
    _id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    job_title: "",
    location: "",
  };

  const { id } = useParams();
  const [user, setUser] = useState<IUser>(defaultUser);
  const [getUser, { isLoading: isLoadingUser }] = useLazyGetUserDetailsQuery();

  const getUserDetails = async () => {
    if (id === undefined) return;
    const res = await getUser(id);

    if (res && res.data) setUser(res.data);
    else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  useEffect(() => {
    if (id === undefined) return;
    getUserDetails();
  }, [id]);

  return (
    <>
      <div className="flex flex-row gap-2 ">
        <div className="w-1/4">
          {isLoadingUser ? <LoadingBox /> : <UserSummaryCard user={user} />}
        </div>
        <div className="w-3/4">
          <TabsComponent defaultActiveTab={0}>
            <Tab label={"Attendance"}>
              <UserAttendanceRecords userId={id ?? ""} />
            </Tab>
            <Tab label={"Leave Quota"}>
              <LeaveQuota userId={id ?? ""} />
            </Tab>
            <Tab label={"User Info"}>
              <UserInfo user={user} />
            </Tab>
          </TabsComponent>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
