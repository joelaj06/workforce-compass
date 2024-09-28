export interface IAttendanceDate {
  check_in: string;
  check_out: string;
  location: string;
  workingHrs: string;
  createdAt: string;
  _id: string;
}

export interface IUserAttendanceSummary {
  avgWorkingHrs: number;
  avgCheckout: number;
  avgCheckIn: number;
  totalLeave: number;
}

export const dummyAverageAttendanceData: IUserAttendanceSummary = {
  avgWorkingHrs: 1254,
  avgCheckout: 1110,
  avgCheckIn: 1021,
  totalLeave: 10,
};
