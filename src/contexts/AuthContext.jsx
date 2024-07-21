import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import authApi from "../apis/auth";
import { removeAccessToken, setAccessToken } from "../utils/local-storage";
import { getAccessToken } from "../utils/local-storage";
import userApi from "../apis/user";
// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthUserLoading, setAIsAuthUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await authApi.getAuthUser();
          setAuthUser(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setAIsAuthUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    setAccessToken(res.data.accessToken);
    const resGetAuthUser = await authApi.getAuthUser();
    setAuthUser(resGetAuthUser.data);
    console.log(resGetAuthUser.data);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };
  const editUserProfile = async (data) => {
    const result = await userApi.EditUserProfile(data);
    console.log(result);
  };

  const value = {
    logout,
    login,
    authUser,
    isAuthUserLoading,
    editUserProfile,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
