import { Avatar } from "@mui/material";
import { ICurrentCheckIn } from "../common/dashboard";
import { convertToHM } from "../../../utils";

export interface DashboardPresentUserCardProps {
  currentCheckIn: ICurrentCheckIn;
}

const DashboardPresentUserCard = (props: DashboardPresentUserCardProps) => {
  return (
    <>
      <div>
        <div className="flex gap-1 py-1">
          <div>
            <Avatar sx={{ height: "30px", width: "30px", fontSize: "12px" }}>
              AM
            </Avatar>
          </div>
          <div className="">
            <div className="font-bold text-sm">
              {`${props.currentCheckIn.user.first_name} ${props.currentCheckIn.user.last_name}`}
            </div>
            <div className="text-xs">{props.currentCheckIn.user.role}</div>
            <div className="text-xs">
              Checked in: {convertToHM(props.currentCheckIn.check_in)}
            </div>
            <div className="text-xs">
              Checked out: {convertToHM(props.currentCheckIn.check_out)}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default DashboardPresentUserCard;
