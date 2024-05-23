import { Avatar, IconButton } from "@mui/material";
import { ITeam } from "../common/teams";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";
import { DialogComponent } from "../../../components";
import AddTeamMemberForm from "./AddTeamMemberForm";

interface TeamCardProps {
  team: ITeam;
}
//TODO implement team leader
const TeamCard = ({ team }: TeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredMemberId, setHoveredMemberId] = useState<number | null>(null);

  const [closeDialog, setCloseDialog] = useState<boolean>(false);

  useEffect(() => {
    if (closeDialog) {
      setCloseDialog(false);
    }
  }, [closeDialog]);

  const handleCloseDialog = () => {
    setCloseDialog(true);
  };
  return (
    <div className="w-1/4">
      <div
        className="px-2 bg-gray-300 text-black rounded text-sm font-bold mb-2  flex flex-row justify-between items-center h-9"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-row justify-center">
          <p className="text-center"> {team.name}</p>
        </div>
        <div className="text-end transition-all">
          {isHovered && hoveredMemberId == null && (
            <DialogComponent
              title="Add Member"
              content={<AddTeamMemberForm isSubmitted={handleCloseDialog} />}
              closeDialog={closeDialog}
            >
              <IconButton>
                <AddRoundedIcon
                  sx={{
                    color: "var(--primary-color-shade800)",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </IconButton>
            </DialogComponent>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[2px]">
        {team.members.map((member, index) => (
          <div
            key={member.id}
            className="bg-white border border-gray-300 px-2 text-sm rounded flex justify-between items-center h-10 "
            onMouseEnter={() => {
              setIsHovered(true);
              setHoveredMemberId(index); // Set hovered member on enter
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setHoveredMemberId(null); // Reset hovered member on leave
            }}
          >
            <div className="capitalize  flex items-center gap-1">
              <Avatar
                sx={{ height: "30px", width: "30px" }}
                src={member.image}
              />{" "}
              <span className="text-sm">
                {member.first_name} {member.last_name}
              </span>
            </div>
            <div className="">
              {isHovered && index === hoveredMemberId && (
                <IconButton>
                  <CloseRoundedIcon
                    sx={{ color: "red", width: "20px", height: "20px" }}
                  />
                </IconButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
