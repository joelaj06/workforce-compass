import { useMemo, useState } from "react";
import ReportCard, { ReportCardProps } from "./ReportCard";
import ReportTile from "./ReportTile";
import {
  abscentManagementReports,
  attendanceTrackingReports,
} from "../common/reports";
import DatePicker from "react-datepicker";
import { ButtonComponent } from "../../../components";
import {
  useLazyGetAttendanceSummaryReportQuery,
  useLazyGetDailyAttendanceReportQuery,
  useLazyGetGeoloactionReportQuery,
  useLazyGetLeaveReportQuery,
} from "../common/reports-api";
import { IErrorData } from "../../../components/login/common/auth";
import { showToast } from "../../../utils/ui/notifications";
import { downloadBlobPdf } from "../../../utils/helper";

const Reports = () => {
  const [getAttendanceSummaryReport] = useLazyGetAttendanceSummaryReportQuery();
  const [getDailyAttendanceReport] = useLazyGetDailyAttendanceReportQuery();
  const [getGeolocationReport] = useLazyGetGeoloactionReportQuery();
  const [getLeaveReport] = useLazyGetLeaveReportQuery();

  const attendanceTrackingReport = useMemo(() => attendanceTrackingReports, []);
  const abscentManagementReport = useMemo(() => abscentManagementReports, []);
  const [selectedReport, setSelectedReport] = useState<ReportCardProps | null>(
    null
  );
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const now: number = Date.now();

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? new Date(now));
    setEndDate(end ?? new Date(now));
  };

  const fetchAttendanceSummaryReport = async () => {
    const res = await getAttendanceSummaryReport({
      startDate: startDate.toISOString(),
      endDate: endDate?.toISOString(),
    });
    if (res && res.data) {
      downloadBlobPdf(res.data);
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  const fetchDailyAttendanceReport = async () => {
    const res = await getDailyAttendanceReport({
      date: date?.toISOString(),
    });
    if (res && res.data) {
      downloadBlobPdf(res.data);
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  const fetchGeolocationReport = async () => {
    const res = await getGeolocationReport({
      startDate: startDate.toISOString(),
      endDate: endDate?.toISOString(),
    });
    if (res && res.data) {
      downloadBlobPdf(res.data);
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };
  const fetchLeaveReport = async () => {
    const res = await getLeaveReport({
      startDate: startDate.toISOString(),
      endDate: endDate?.toISOString(),
    });
    if (res && res.data) {
      downloadBlobPdf(res.data);
    } else {
      const error = res.error as IErrorData;
      showToast({ message: error.data.message, type: "error" });
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-4">
        <div className="text-lg font-bold text-black">Reports</div>
      </div>
      <div className="flex flex-row gap-2 items-start">
        <div className="flex-grow flex flex-col gap-6">
          <ReportTile header="Attendance Tracking Reports">
            {attendanceTrackingReport.map((report) => (
              <ReportCard
                key={report.id}
                image={report.image}
                title={report.title}
                description={report.description}
                onClick={() => setSelectedReport(report)}
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
                onClick={() => setSelectedReport(report)}
              />
            ))}
          </ReportTile>
        </div>
        {selectedReport && (
          <div className=" bg-white flex flex-col gap-2 p-2 rounded-lg w-1/3">
            <p className="font-bold text-sm">Select a report to view details</p>
            <p className="text-sm">{selectedReport?.title}</p>
            {selectedReport?.title == "Daily Attendance Report" && (
              <div>
                <p className="text-sm">Select Date</p>
                <DatePicker
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  inline
                  onChange={(date) => setDate(date)}
                />
                <div className="flex flex-row justify-center pt-4">
                  <ButtonComponent
                    btnHeight="small"
                    //btnWidth=""
                    bgColor="primary"
                    onClick={() => {
                      fetchDailyAttendanceReport();
                    }}
                  >
                    <span className="capitalize text-sm">Generate Report</span>
                  </ButtonComponent>
                </div>
              </div>
            )}
            {selectedReport?.title == "Attendance Summary Report" && (
              <div>
                <p className="text-sm">Select Date Range</p>
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  // showTimeSelect
                  // timeFormat="HH:mm"
                  // timeIntervals={15}
                  // timeCaption="Time"
                  // dateFormat="MMMM d, yyyy h:mm aa"
                />
                <div className="flex flex-row justify-center pt-4">
                  <ButtonComponent
                    btnHeight="small"
                    //btnWidth=""
                    bgColor="primary"
                    onClick={() => {
                      fetchAttendanceSummaryReport();
                    }}
                  >
                    <span className="capitalize text-sm">Generate Report</span>
                  </ButtonComponent>
                </div>
              </div>
            )}
            {selectedReport?.title == "Geolocation Report" && (
              <div>
                <p className="text-sm">Select Date Range</p>
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  // showTimeSelect
                  // timeFormat="HH:mm"
                  // timeIntervals={15}
                  // timeCaption="Time"
                  // dateFormat="MMMM d, yyyy h:mm aa"
                />
                <div className="flex flex-row justify-center pt-4">
                  <ButtonComponent
                    btnHeight="small"
                    //btnWidth=""
                    bgColor="primary"
                    onClick={() => {
                      fetchGeolocationReport();
                    }}
                  >
                    <span className="capitalize text-sm">Generate Report</span>
                  </ButtonComponent>
                </div>
              </div>
            )}
            {selectedReport?.title == "Leave Management Report" && (
              <div>
                <p className="text-sm">Select Date</p>
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  // showTimeSelect
                  // timeFormat="HH:mm"
                  // timeIntervals={15}
                  // timeCaption="Time"
                  // dateFormat="MMMM d, yyyy h:mm aa"
                />
                <div className="flex flex-row justify-center pt-4">
                  <ButtonComponent
                    btnHeight="small"
                    //btnWidth=""
                    bgColor="primary"
                    onClick={() => {
                      fetchLeaveReport();
                    }}
                  >
                    <span className="capitalize text-sm">Generate Report</span>
                  </ButtonComponent>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;
