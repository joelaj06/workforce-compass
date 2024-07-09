import { ChangeEvent, useEffect, useState } from "react";
import { ITeam } from "../common/teams";
import TeamCard from "./TeamCard";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DialogComponent from "../../../components/DialogComponent";
import { ButtonComponent, CustomInputField } from "../../../components";
import AddTeamForm from "./AddTeamForm";
import { useLazyGetTeamsWithoutPagingQuery } from "../common/teams-api";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingBox from "../../../components/LoadingBox";
import NoResultsFound from "../../Auth/ErrorHandler/NoResultFound";

const TeamsTable = () => {
  const [getTeams, { isLoading, isFetching }] =
    useLazyGetTeamsWithoutPagingQuery();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [closeDialog, setCloseDialog] = useState<boolean>(false);

  const fetchTeams = async () => {
    const res = await getTeams({ query: searchQuery });

    if (res && res.data) {
      setTeams(res.data);
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [searchQuery]);

  useEffect(() => {
    if (closeDialog) {
      setCloseDialog(false);
    }
  }, [closeDialog]);

  const handleUserSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) setSearchQuery(e.target.value);
  };
  const handleCloseDialog = () => {
    setCloseDialog(true);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="border border-gray-300 rounded-md h-full flex flex-row p-2 justify-between items-center">
          <CustomInputField
            placeholder="Search"
            variantSize={"small"}
            backgroundColor="white"
            onChange={handleUserSearch}
            suffixIcon={
              searchQuery.length > 0 ? (
                <CancelIcon
                  sx={{ fontSize: "20px" }}
                  onClick={() => setSearchQuery("")}
                />
              ) : (
                <SearchRoundedIcon sx={{ fontSize: "20px" }} />
              )
            }
          />
          <DialogComponent
            title="New Team"
            content={<AddTeamForm isSubmitted={handleCloseDialog} />}
            closeDialog={closeDialog}
          >
            <ButtonComponent
              btnHeight="small"
              iconOnLeft={<AddRoundedIcon />}
              bgColor="primary"
            >
              <span className="capitalize text-sm">New Team</span>
            </ButtonComponent>
          </DialogComponent>
        </div>
        {isFetching || isLoading ? (
          <LoadingBox />
        ) : teams.length === 0 ? (
          <NoResultsFound />
        ) : (
          <div className="flex gap-3 flex-wrap">
            {teams.map((team) => (
              <TeamCard key={team._id} team={team} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TeamsTable;
