import { Avatar } from "@mui/material";
import { ICurrentCheckIn } from "../common/dashboard";

export interface DashboardPresentUserCardProps {
  currentCheckIn: ICurrentCheckIn;
}

const DashboardPresentUserCard = (props: DashboardPresentUserCardProps) => {
  return (
    <>
      <div>
        <div className="flex gap-1 py-1">
          <div>
            <Avatar
              sx={{ height: "30px", width: "30px", fontSize: "12px" }}
            ></Avatar>
          </div>
          <div className="">
            <div className="font-bold text-sm">
              {`${props.currentCheckIn.user.first_name} ${props.currentCheckIn.user.last_name}`}
            </div>
            <div className="text-xs">{props.currentCheckIn.user.role}</div>
            <div className="text-xs">
              Checked in: {props.currentCheckIn.check_in}
            </div>
            <div className="text-xs">
              Checked out: {props.currentCheckIn.check_out || "N/A"}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default DashboardPresentUserCard;
