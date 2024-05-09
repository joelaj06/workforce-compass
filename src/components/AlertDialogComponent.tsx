import { ReactNode, useEffect, useState } from "react";
import DialogComponent from "./DialogComponent";
import ButtonComponent from "./ButtonComponent";

interface AlertDialogComponentProps {
  title: string;
  content: ReactNode;
  children: ReactNode;
  leftActionTitle?: string;
  rightActionTitle?: string;
  onRightButtonClicked?: () => void;
}
const AlertDialogComponent = ({
  children,
  title,
  content,
  leftActionTitle = "Cancel",
  rightActionTitle = "Ok",
  onRightButtonClicked,
}: AlertDialogComponentProps) => {
  const [closeDialog, setCloseDialog] = useState<boolean>(false);

  useEffect(() => {
    if (closeDialog) {
      setCloseDialog(false);
    }
  }, [closeDialog]);
  const Actions = () => (
    <>
      <div className="flex flex-row gap-1 pt-6">
        <ButtonComponent
          btnHeight="small"
          minWidth="100px"
          bgColor="secondary"
          variantType="outlined"
          onClick={() => setCloseDialog(true)}
        >
          <span className="capitalize text-sm">{leftActionTitle}</span>
        </ButtonComponent>
        <ButtonComponent
          btnHeight="small"
          bgColor="secondary"
          minWidth="100px"
          onClick={onRightButtonClicked}
        >
          <span className="capitalize text-sm">{rightActionTitle}</span>
        </ButtonComponent>
      </div>
    </>
  );
  return (
    <>
      <DialogComponent
        maxWidth="xs"
        title={title}
        content={content}
        actions={<Actions />}
        closeDialog={closeDialog}
      >
        {children}
      </DialogComponent>
    </>
  );
};

export default AlertDialogComponent;
