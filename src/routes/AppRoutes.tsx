import { Route, Routes } from "react-router-dom";
import { AppPages } from "./appPages";
import Dashboard from "../pages/Dashboard/component/Dashboard";
import NotFound from "../pages/Auth/ErrorHandler/NotFound";
import Employees from "../pages/Employees/components/Employees";
import Leaves from "../pages/Leaves/components/Leaves";
import Notifications from "../pages/Notification/Notifications";
import Settings from "../pages/Settings/Settings";
import UserDetails from "../pages/EmployeeDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={AppPages.index} element={<Dashboard />} />
      <Route path={AppPages.employees} element={<Employees />} />
      <Route path={AppPages.employeeDetails(":id")} element={<UserDetails />} />
      <Route path={AppPages.leaves} element={<Leaves />} />
      <Route path={AppPages.notifications} element={<Notifications />} />
      <Route path={AppPages.settings} element={<Settings />} />
      <Route path={AppPages.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
