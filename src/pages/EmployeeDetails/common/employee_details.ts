export interface IAttendanceDate {
  check_in: string;
  check_out: string;
  location: string;
  createdAt: string;
  _id: string;
}

export interface IAverageAttendanceData {
  avgWorkingHrs: number;
  avgCheckout: number;
  avgCheckIn: number;
  totalLeave: number;
}

export const dummyAverageAttendanceData: IAverageAttendanceData = {
  avgWorkingHrs: 1254,
  avgCheckout: 1110,
  avgCheckIn: 1021,
  totalLeave: 10,
};

export const dummyAttendanceDates: IAttendanceDate[] = [
  {
    check_in: "09:02",
    check_out: "12:30",
    createdAt: "2021-09-01T00:00:00.000Z",
    _id: "613613131313131313131313",
    location: "GCTU",
  },
  {
    check_in: "09:02",
    check_out: "12:30",
    createdAt: "2021-09-01T00:00:00.000Z",
    _id: "613613131313131313131313",
    location: "GCTU",
  },
  {
    check_in: "09:02",
    check_out: "12:30",
    createdAt: "2021-09-01T00:00:00.000Z",
    _id: "613613131313131313131313",
    location: "GCTU",
  },
  {
    check_in: "09:02",
    check_out: "12:30",
    createdAt: "2021-09-01T00:00:00.000Z",
    _id: "613613131313131313131313",
    location: "GCTU",
  },
];
