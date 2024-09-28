import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import { isAccessTokenExpired, isAuthenticated } from "../utils/api/auth";
import PublicRoutes from "./PublicRoutes";

// Redirect to dashboard if user is authenticated and token is not expired

const PrivateRoutes = () => {
  console.log("private route");
  return (
    <Routes>
      {isAuthenticated() && !isAccessTokenExpired() ? (
        <Route path="/" element={<App />}>
          <Route path="/*" element={<PublicRoutes />} />
          <Route
            //path={AppPages.index}
            element={<Navigate to={"/dashboard"} />}
          />
        </Route>
      ) : (
        <Route path="/login" element={<Navigate to={"/login"} />} />
      )}
    </Routes>
  );
};

export default PrivateRoutes;
