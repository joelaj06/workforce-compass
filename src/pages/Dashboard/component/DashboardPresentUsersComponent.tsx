import { useMemo } from "react";
import { dummyCurrentCheckIn } from "../common/dashboard";
import DashboardPresentUserCard from "./DashboardPresentUserCard";
import { CustomInputField } from "../../../components";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const DashboardPresentUsersComponent = () => {
  const currentCheckedInUsers = useMemo(() => dummyCurrentCheckIn, []);
  return (
    <div className="bg-white p-2 h-full rounded-lg">
      <div className="py-4">
        <div className="text-sm font-bold py-1">Current Present</div>
        <CustomInputField
          placeholder="Search"
          variantSize={"small"}
          backgroundColor="white"
          suffixIcon={<SearchRoundedIcon sx={{ fontSize: "20px" }} />}
        />
      </div>

      <div>
        {currentCheckedInUsers.map((check) => (
          <DashboardPresentUserCard currentCheckIn={check} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPresentUsersComponent;
