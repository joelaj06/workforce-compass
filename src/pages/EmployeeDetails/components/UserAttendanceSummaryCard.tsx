interface UserAttendanceSummaryCardProps {
  icon: string;
  title: string;
  value: string;
}

const UserAttendanceSummaryCard = ({
  icon,
  title,
  value,
}: UserAttendanceSummaryCardProps) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div>
        <img className="w-7" src={`/assets/images/${icon}`} alt="" />
      </div>
      <div className="flex flex-col ">
        <div className="font-bold text-lg text-black">{value}</div>
        <div className="text-sm">{title}</div>
      </div>
    </div>
  );
};

export default UserAttendanceSummaryCard;
