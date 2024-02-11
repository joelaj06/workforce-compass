import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppPages } from "./appPages";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/Auth/ErrorHandler/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppPages.index} element={<Dashboard />} />
        <Route path={AppPages.notFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
