export interface ReportCardProps {
  title: string;
  id?: number;
  image: string;
  description: string;
}
const ReportCard = ({ title, image, description }: ReportCardProps) => {
  return (
    <div className="flex flex-col gap-1 w-1/4 cursor-pointer">
      <div className="bg-background rounded-md p-1 flex justify-center">
        <img className="w-28" src={`/assets/images/${image}`} alt="" />
      </div>
      <div className="font-bold text-sm">{title}</div>
      <div className="text-xs">{description}</div>
    </div>
  );
};

export default ReportCard;
