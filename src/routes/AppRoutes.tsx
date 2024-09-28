import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import { isAuthenticated, isAccessTokenExpired } from "../utils/api/auth";
import Login from "../components/login/components/Login";

const AppRoutes = () => {
  return (
    <Routes>
      {isAuthenticated() && !isAccessTokenExpired() ? (
        <Route path="/*" element={<PrivateRoutes />}></Route>
      ) : (
        <Route path="/*" element={<Login />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
