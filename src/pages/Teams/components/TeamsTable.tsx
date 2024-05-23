import { useEffect, useMemo, useState } from "react";
import { dummyTeams } from "../common/teams";
import TeamCard from "./TeamCard";
import DropDownComponent from "../../../components/DropDownComponent";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DialogComponent from "../../../components/DialogComponent";
import { ButtonComponent } from "../../../components";
import AddTeamForm from "./AddTeamForm";

const TeamsTable = () => {
  const options = [
    {
      label: "Team 1",
      value: "Team 1",
    },
    {
      label: "Team 2",
      value: "Team 2",
    },
  ];

  const [closeDialog, setCloseDialog] = useState<boolean>(false);

  useEffect(() => {
    if (closeDialog) {
      setCloseDialog(false);
    }
  }, [closeDialog]);

  const handleCloseDialog = () => {
    setCloseDialog(true);
  };
  const teams = useMemo(() => dummyTeams, []);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="border border-gray-300 rounded-md h-full flex flex-row p-2 justify-between items-center">
          {" "}
          <DropDownComponent
            label={"Choose by team "}
            options={options}
            onChanged={() => {}}
            //width="60%"
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
        <div className="flex gap-3">
          {teams.map((team) => (
            <TeamCard team={team} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamsTable;
