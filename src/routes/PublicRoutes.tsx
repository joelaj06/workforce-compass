import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/Auth/ErrorHandler/NotFound";
import UserDetails from "../pages/EmployeeDetails";
import { Employees } from "../pages/Employees";
import Leaves from "../pages/Leaves/components/Leaves";
import Reports from "../pages/Reports/components/Reports";
import Tasks from "../pages/Tasks/components/Tasks";
import Teams from "../pages/Teams/components/Teams";
import { AppPages } from "./appPages";
import { Dashboard } from "../pages/Dashboard";
import Notifications from "../pages/Notification/Notifications";
import Settings from "../pages/Settings/components/Settings";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={AppPages.index} element={<Dashboard />} />
      <Route path={AppPages.dashboard} element={<Dashboard />} />
      <Route path={AppPages.employees} element={<Employees />} />
      <Route path={AppPages.employeeDetails(":id")} element={<UserDetails />} />
      <Route path={AppPages.leaves} element={<Leaves />} />
      <Route path={AppPages.notifications} element={<Notifications />} />
      <Route path={AppPages.settings} element={<Settings />} />
      <Route path={AppPages.notFound} element={<NotFound />} />
      <Route path={AppPages.teams} element={<Teams />} />
      <Route path={AppPages.reports} element={<Reports />} />
      <Route path={AppPages.tasks} element={<Tasks />} />
    </Routes>
  );
};

export default PublicRoutes;
