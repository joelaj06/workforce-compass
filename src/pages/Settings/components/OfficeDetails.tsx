import { useEffect, useState } from "react";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";
import { IOrganization } from "../common/settings";
import { useLazyGetOrganizationsQuery } from "../common/settings-api";
import OfficeInfo from "./OfficeInfo";
import OfficeLocation from "./OfficeLocation";

const OfficeDetails = () => {
  const [getOrganization] = useLazyGetOrganizationsQuery();
  const [data, setData] = useState<IOrganization>();

  const fetchOrganization = async () => {
    const res = await getOrganization();
    if (res && res.data) {
      setData(res.data);
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  return (
    <div className="py-4 flex flex-col gap-3">
      <OfficeInfo data={data ? data : null} />
      <OfficeLocation data={data ? data : null} />
    </div>
  );
};

export default OfficeDetails;
