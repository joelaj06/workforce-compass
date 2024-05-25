import OfficeInfo from "./OfficeInfo";
import OfficeLocation from "./OfficeLocation";

const OfficeDetails = () => {
  return (
    <div className="py-4 flex flex-col gap-3">
      <OfficeInfo />
      <OfficeLocation />
    </div>
  );
};

export default OfficeDetails;
