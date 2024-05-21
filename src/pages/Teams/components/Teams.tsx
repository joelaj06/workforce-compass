import TeamsTable from "./TeamsTable";

const Teams = () => {
  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-lg font-bold text-black">Teams</div>
      </div>
      <div className="">
        <TeamsTable />
      </div>
    </>
  );
};

export default Teams;
