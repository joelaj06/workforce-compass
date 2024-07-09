import { Avatar, IconButton } from "@mui/material";
import { ITeam, ITeamRequestPayload } from "../common/teams";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";
import { DialogComponent } from "../../../components";
import AddTeamMemberForm from "./AddTeamMemberForm";
import {
  useDeleteTeamMutation,
  useUpdateTeamMutation,
} from "../common/teams-api";
import { showToast } from "../../../utils/ui/notifications";
import AlertDialogComponent from "../../../components/AlertDialogComponent";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

interface TeamCardProps {
  team: ITeam;
}
//TODO implement team leader
const TeamCard = ({ team }: TeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredMemberId, setHoveredMemberId] = useState<number | null>(null);
  const [closeDialog, setCloseDialog] = useState<boolean>(false);

  const [updateTeam] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const onTeamUpdated = async (team: ITeamRequestPayload) => {
    try {
      const res = await updateTeam(team).unwrap();
      if (res) {
        showToast({ message: "Team created successfully", type: "success" });
        setCloseDialog(true);
      } else {
        showToast({ message: "Failed to update team", type: "error" });
      }
    } catch (error) {
      if (error) showToast({ message: "Failed to update team", type: "error" });
    }
  };

  const onDeleteTeam = async (teamId: string) => {
    try {
      const res = await deleteTeam(teamId).unwrap();
      if (res) {
        showToast({ message: "Team deleted successfully", type: "success" });
        setCloseDialog(true);
      } else {
        showToast({ message: "Failed to delete team", type: "error" });
      }
    } catch (error) {
      if (error) showToast({ message: "Failed to delete team", type: "error" });
    }
  };

  const removeTeamMember = (team: ITeam, memberId: string) => {
    const newTeam: ITeamRequestPayload = {
      ...team,
      id: team._id,
      members: team.members
        .filter((member) => member._id !== memberId)
        .map((member) => member._id.toString()),
    };
    onTeamUpdated(newTeam);
  };

  const addNewTeamMember = (team: ITeam, memberId: string) => {
    const oldMembers = team.members.map((member) => member._id.toString());
    const newTeam: ITeamRequestPayload = {
      ...team,
      id: team._id,
      members: [...oldMembers, memberId],
    };
    // console.log(newTeam);
    onTeamUpdated(newTeam);
  };

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
            <div className="flex flex-row gap-2 items-center ">
              <DialogComponent
                title="Add Member"
                content={
                  <AddTeamMemberForm
                    isSubmitted={handleCloseDialog}
                    setNewMember={(val: string) => addNewTeamMember(team, val)}
                  />
                }
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
              <AlertDialogComponent
                title={"Delete User"}
                close={closeDialog}
                onRightButtonClicked={() => onDeleteTeam(team._id)}
                content={
                  <p className="text-center">
                    Are you sure you want to delete this account?
                  </p>
                }
              >
                <IconButton>
                  {" "}
                  <DeleteOutlineRoundedIcon
                    sx={{ fontSize: "16px", color: "red" }}
                  />
                </IconButton>
              </AlertDialogComponent>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[2px]">
        {team.members.map((member, index) => (
          <div
            key={member._id}
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
                <AlertDialogComponent
                  title={"Delete User"}
                  close={closeDialog}
                  content={
                    <p className="text-center">
                      Are you sure you want to remove this member?
                    </p>
                  }
                  onRightButtonClicked={() =>
                    removeTeamMember(team, member._id.toString())
                  }
                >
                  <IconButton>
                    <CloseRoundedIcon
                      sx={{ color: "red", width: "20px", height: "20px" }}
                    />
                  </IconButton>
                </AlertDialogComponent>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
