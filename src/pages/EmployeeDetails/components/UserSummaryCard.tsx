import { Avatar } from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { ReactNode } from "react";
import { IUser } from "../../Employees/common/employee";
import { ButtonComponent } from "../../../components";

interface UserSummaryCardProps {
  user: IUser;
}

const InfoCard = ({ icon, value }: { icon: ReactNode; value?: string }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center gap-1">
        <div>{icon}</div>
        <div className="text-xs">{value ?? "N/A"}</div>
      </div>
    </>
  );
};

const UserSummaryCard = ({ user }: UserSummaryCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 bg-white rounded-md shadow-sm justify-center p-2">
        <div className="flex justify-end">
          <div className=" text-end text-[10px] bg-green-300 text-green-700 py-[2px] px-1  w-fit rounded-xl capitalize">
            {user.status}
          </div>
        </div>
        <div className="self-center">
          <Avatar src={user?.imgUrl} sx={{ width: "100px", height: "100px" }} />
        </div>
        <div className="text-sm self-center text-black font-bold">{`${user.first_name} ${user.last_name}`}</div>
        <p className="text-xs self-center">{user.job_title || "Job Not Set"}</p>
        <InfoCard
          icon={<MailOutlinedIcon sx={{ fontSize: "16px" }} />}
          value={user.email}
        />
        <InfoCard
          icon={<LocalPhoneOutlinedIcon sx={{ fontSize: "16px" }} />}
          value={user.phone}
        />
        <InfoCard
          icon={<FmdGoodOutlinedIcon sx={{ fontSize: "16px" }} />}
          value={user.address}
        />
      </div>
      <ButtonComponent
        btnHeight="small"
        minWidth="fit-content"
        btnWidth="105px"
        bgColor="danger"
        variantType="outlined"
        onClick={() => {}}
      >
        <span className="capitalize text-xs">Block Account</span>
      </ButtonComponent>
    </div>
  );
};

export default UserSummaryCard;
