export const pages = {
  notFound: "*",
  index: "/",
  login: "/login",
  employees: "/employees",
  employeeDetails: (id: string) => `/employees/${id}`,
  leaves: "/leaves",
  notifications: "/notifications",
  settings: "/settings",
  teams: "/teams",
  reports: "/reports",
};

export const AppPages = Object.freeze(pages);
