import { useParams } from "react-router-dom";
import UserSummaryCard from "./UserSummaryCard";
import { useEffect, useMemo, useState } from "react";
import { IUser, dummyUsers } from "../../Employees/common/employee";
import TabsComponent, { Tab } from "../../../components/TabComponent";
import UserAttendanceRecords from "./UserAttendanceRecords";
import LeaveQuota from "./LeaveQuota";
import UserInfo from "./UserInfo";

const UserDetails = () => {
  const defaultUser: IUser = {
    id: 0,
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
  const users = useMemo(() => dummyUsers, []);
  const [user, setUser] = useState<IUser>(defaultUser);

  useEffect(() => {
    if (id === undefined) return;
    const getUser = () => {
      const user = users.find((user) => user.id === parseInt(id));
      if (user) setUser(user);
    };
    getUser();
  }, [id, users]);

  return (
    <>
      <div className="flex flex-row gap-2 ">
        <div className="w-1/4">
          <UserSummaryCard user={user} />
        </div>
        <div className="w-3/4">
          <TabsComponent defaultActiveTab={0}>
            <Tab label={"Attendance"}>
              <UserAttendanceRecords />
            </Tab>
            <Tab label={"Leave Quota"}>
              <LeaveQuota />
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
