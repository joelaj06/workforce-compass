import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../components/login/components/Login";
import { isAuthenticated, isAccessTokenExpired } from "../utils/api/auth";

const AppRoutes = () => {
  return (
    <Routes>
      {isAuthenticated() && !isAccessTokenExpired() ? (
        <Route path="/*" element={<PrivateRoutes />}></Route>
      ) : (
        <Route path="*" element={<Navigate to={"/login"} />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
