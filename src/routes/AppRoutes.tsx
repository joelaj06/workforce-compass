import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../components/login/components/Login";

const AppRoutes = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/*" element={<PrivateRoutes />}></Route>
      <Route path="/login" element={<Login />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default AppRoutes;
