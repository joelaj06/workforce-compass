import { ReportCardProps } from "../components/ReportCard";

export interface IReportRequestParam {
  date?: string;
  startDate?: string;
  endDate?: string;
}

export const attendanceTrackingReports: ReportCardProps[] = [
  {
    id: 1,
    title: "Daily Attendance Report",
    description: "Records of each worker's check-in and check-out times.",
    image: "calendar.png",
  },
  {
    id: 2,
    title: "Attendance Summary Report",
    description: "Aggregated data of attendance for date range.",
    image: "calendar.png",
  },
  {
    id: 3,
    title: "Geolocation Report",
    description:
      "GPS-based tracking of worker locations during check-in and check-out.",
    image: "calendar.png",
  },
];
export const abscentManagementReports: ReportCardProps[] = [
  {
    id: 1,
    title: "Absenteeism Report",
    description: "Records of workers who were absent on a given day or period",
    image: "calendar.png",
  },
  {
    id: 2,
    title: "Leave Management Report",
    description:
      "Detailed report on approved, pending, and rejected leave requests",
    image: "calendar.png",
  },
];
