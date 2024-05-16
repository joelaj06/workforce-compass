import LeavesTable from "./LeavesTable";

const Leaves = () => {
  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-lg font-bold text-black">Leaves</div>
      </div>
      <LeavesTable />
    </>
  );
};

export default Leaves;
