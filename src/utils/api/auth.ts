import { ILoginResponse } from "../../components/login/common/auth";

const isAuthenticated = () => {
  const token: string | null = localStorage.getItem("accessToken");
  if (token) {
    return true;
  }
  return false;
};

const isAccessTokenExpired = (): boolean => {
  const expiryTime = localStorage.getItem("expiryTime");
  if (!expiryTime) return true;
  return new Date().getTime() > parseInt(expiryTime, 10);
};

const storeAccessToken = (authResponse: ILoginResponse) => {
  const { token } = authResponse;
  localStorage.setItem("accessToken", token);
};

const getApiHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export {
  isAuthenticated,
  storeAccessToken,
  isAccessTokenExpired,
  getApiHeaders,
};
