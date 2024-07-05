import { ChangeEvent, useEffect, useState } from "react";
import { ICurrentCheckIn } from "../common/dashboard";
import DashboardPresentUserCard from "./DashboardPresentUserCard";
import { CustomInputField } from "../../../components";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useLazyGetCurrentPresentUsersQuery } from "../common/dashboard-api";

const DashboardPresentUsersComponent = () => {
  const [getPresentUsers, { isLoading }] = useLazyGetCurrentPresentUsersQuery();

  const [currentCheckedInUsers, setCurrentCheckedInUsers] = useState<
    ICurrentCheckIn[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleUserSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) setSearchQuery(e.target.value);
  };
  const fetchCurrentCheckedInUsers = async () => {
    try {
      const response = await getPresentUsers(searchQuery);
      if (response && response.data) {
        setCurrentCheckedInUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentCheckedInUsers();
  }, [searchQuery]);
  return (
    <div className="bg-white p-2 h-full rounded-lg">
      <div className="py-4">
        <div className="text-sm font-bold py-1">Current Present</div>
        <CustomInputField
          placeholder="Search"
          variantSize={"small"}
          backgroundColor="white"
          suffixIcon={<SearchRoundedIcon sx={{ fontSize: "20px" }} />}
          onChange={handleUserSearch}
        />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : currentCheckedInUsers.length === 0 ? (
        <div className="text-center text-sm">No data found</div>
      ) : (
        <div>
          {currentCheckedInUsers.map((check) => (
            <DashboardPresentUserCard currentCheckIn={check} key={check.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPresentUsersComponent;
