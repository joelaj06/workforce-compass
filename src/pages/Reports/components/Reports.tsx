import { useMemo } from "react";
import ReportCard from "./ReportCard";
import ReportTile from "./ReportTile";
import {
  abscentManagementReports,
  attendanceTrackingReports,
} from "../common/reports";

const Reports = () => {
  const attendanceTrackingReport = useMemo(() => attendanceTrackingReports, []);
  const abscentManagementReport = useMemo(() => abscentManagementReports, []);

  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-lg font-bold text-black">Reports</div>
      </div>
      <div className="flex flex-col gap-6">
        <ReportTile header="Attendance Tracking Reports">
          {attendanceTrackingReport.map((report) => (
            <ReportCard
              key={report.id}
              image={report.image}
              title={report.title}
              description={report.description}
            />
          ))}
        </ReportTile>
        <ReportTile header="Abscent Mangement Reports">
          {abscentManagementReport.map((report) => (
            <ReportCard
              key={report.id}
              image={report.image}
              title={report.title}
              description={report.description}
            />
          ))}
        </ReportTile>
      </div>
    </>
  );
};

export default Reports;
