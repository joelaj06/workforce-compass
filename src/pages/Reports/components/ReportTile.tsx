import { ReactNode } from "react";

interface ReportTileProps {
  children: ReactNode;
  header: string;
}
const ReportTile = ({ children, header }: ReportTileProps) => {
  return (
    <div className="bg-white flex flex-col gap-2 p-2 rounded-lg w-full ">
      <div className="font-bold ">{header}</div>
      <div className="flex flex-row gap-2">{children}</div>
    </div>
  );
};

export default ReportTile;
