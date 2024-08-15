import { Close } from "@mui/icons-material";
import { Divider, IconButton, styled, Theme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

const StyledDialog = styled(Dialog)(({ theme }: { theme: Theme }) => ({
  "& + .pac-container": {
    zIndex: theme.zIndex.modal + 1,
  },
}));
export default function DialogComponent({
  children,
  title,
  actions,
  content,
  maxWidth,
  fullWidth,
  closeDialog,
}: {
  title: string;
  maxWidth?: "sm" | "lg" | "md" | "xl" | "xs";
  content: React.ReactNode;
  actions?: React.ReactNode;
  fullWidth?: boolean;
  closeDialog?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    if (closeDialog) {
      handleClose();
    }
  }, [closeDialog]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{children}</div>
      <StyledDialog
        sx={{}}
        fullScreen={fullWidth}
        maxWidth={maxWidth || "sm"}
        fullWidth
        open={isOpen}
      >
        <DialogTitle className="bg-white text-primary flex  items-center justify-between">
          <p className="text-sm font-bold">{title}</p>
          <IconButton
            onClick={handleClose}
            sx={{ fontSize: "18px" }}
            style={{ color: "white", fontSize: "18px" }}
          >
            <Close sx={{ fontSize: "18px", color: "gray" }} />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{ padding: "0px" }}
          className="shadow-lg bg-white p-0"
        >
          {content}
        </DialogContent>

        {actions ? (
          <DialogActions className="bg-white">{actions}</DialogActions>
        ) : null}
      </StyledDialog>
    </div>
  );
}
