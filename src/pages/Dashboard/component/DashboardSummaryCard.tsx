const DashboardSummaryCard = ({
  title,
  image,
  total,
}: {
  title: string;
  image: string;
  total: number;
}) => {
  return (
    <div className="bg-white rounded-lg p-2 shadow-md flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs">Total</div>
          <div className="font-bold text-lg text-primary">{total}</div>
        </div>
        <div className="w-16 h-16">
          <img src={`/assets/images/${image}`}></img>
        </div>
      </div>
      <hr />
      <div className="text-sm">{title}</div>
    </div>
  );
};

export default DashboardSummaryCard;
