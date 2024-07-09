import { useEffect, useState } from "react";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";
import LeavesTable from "./LeavesTable";
import { ILeave } from "../common/leaves";
import { usePagination } from "../../../utils/helper";
import { useLazyGetLeavesQuery } from "../common/leaves-api";
import LoadingBox from "../../../components/LoadingBox";

const Leaves = () => {
  const [
    getLeaves,
    { isLoading: leavesIsLoading, isFetching: leavesIsFetching },
  ] = useLazyGetLeavesQuery();

  const { pageSize, pageIndex, onPaginationChange, pagination } =
    usePagination();

  const [leaves, setLeaves] = useState<ILeave[]>([]);

  const fetchUserLeaves = async () => {
    try {
      const res = await getLeaves({
        pageIndex: pageIndex + 1,
        pageSize: pageSize,
      });
      if (res && res.data) {
        setLeaves(res.data.contents);
        onPaginationChange({
          ...pagination,
          pageCount: res.data.pagination.totalPages,
          totalCount: res.data.pagination.totalCount,
        });
      } else {
        const error = res.error as IErrorData;
        showToast({ message: error.data.message, type: "error" });
      }
    } catch (error) {
      if (error)
        showToast({ message: "Sorry an error occured", type: "error" });
    }
  };

  useEffect(() => {
    fetchUserLeaves();
  }, []);
  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-lg font-bold text-black">Leaves</div>
      </div>
      {leavesIsFetching || leavesIsLoading ? (
        <LoadingBox />
      ) : (
        <LeavesTable
          leavesData={leaves}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
        />
      )}
    </>
  );
};

export default Leaves;
