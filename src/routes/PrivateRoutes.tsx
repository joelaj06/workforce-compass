import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import { isAccessTokenExpired, isAuthenticated } from "../utils/api/auth";
import PublicRoutes from "./PublicRoutes";

// Redirect to dashboard if user is authenticated and token is not expired

const PrivateRoutes = () => {
  return (
    <Routes>
      {isAuthenticated() && !isAccessTokenExpired() ? (
        <Route path="/" element={<App />}>
          <Route path="/*" element={<PublicRoutes />} />
          <Route
            //path={AppPages.index}
            index
            element={<Navigate to={"/dashboard"} replace />}
          />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to={"/login"} />} />
      )}
    </Routes>
  );
};

export default PrivateRoutes;
