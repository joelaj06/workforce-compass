import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import { isAuthenticated } from "../utils/api/auth";
import PublicRoutes from "./PublicRoutes";

const PrivateRoutes = () => {
  return (
    <Routes>
      {isAuthenticated() ? (
        <Route path="/" element={<App />}>
          <Route path="/*" element={<PublicRoutes />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to={"/login"} />} />
      )}
    </Routes>
  );
};

export default PrivateRoutes;
