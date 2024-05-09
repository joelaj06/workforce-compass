export const pages = {
  notFound: "*",
  index: "/",
  login: "/login",
  employees: "/employees",
  employeeDetails: (id: string) => `/employees/${id}`,
  leaves: "/leaves",
  notifications: "/notifications",
  settings: "/settings",
};

export const AppPages = Object.freeze(pages);
