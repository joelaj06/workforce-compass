import { useMemo } from "react";
import { dummyTeams } from "../common/teams";
import TeamCard from "./TeamCard";
import DropDownComponent from "../../../components/DropDownComponent";

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
  const teams = useMemo(() => dummyTeams, []);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="border border-gray-300 rounded-md h-full flex flex-row p-2">
          {" "}
          <DropDownComponent
            label={"Choose by team "}
            options={options}
            onChanged={() => {}}
            //width="60%"
          />
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
