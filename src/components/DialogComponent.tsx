import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

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
      <Dialog
        className=""
        fullScreen={fullWidth}
        maxWidth={maxWidth || "sm"}
        fullWidth
        open={isOpen}
      >
        <DialogTitle className="bg-background text-primary flex items-center justify-between">
          <p className="text-xl">{title}</p>
          <IconButton
            onClick={handleClose}
            style={{ backgroundColor: "red", color: "white" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent className="shadow-lg bg-background p-3">
          {content}
        </DialogContent>

        {actions ? (
          <DialogActions className="bg-primary">{actions}</DialogActions>
        ) : null}
      </Dialog>
    </div>
  );
}
