import { ILoginResponse } from "../../components/login/common/auth";
import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
  const token: string | null = localStorage.getItem("accessToken");
  if (token) {
    return true;
  }
  return false;
};

/**
 * Checks if the access token has expired.
 *
 * @return {boolean} true if the access token has expired, false otherwise
 */
const isAccessTokenExpired = (): boolean => {
  const token: string | null = localStorage.getItem("accessToken");
  if (!token) return true;
  const decoded = jwtDecode(token);
  console.log(decoded);
  const expiryTime = decoded.exp;
  if (!expiryTime) return true;
  return Date.now() > expiryTime * 1000;
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
