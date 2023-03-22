import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { config } from "../api/config";
import { AuthValuesType, LoginParams } from "./types";
import { instance as api, setAuthHeader } from "../api";

const loginEndpoint = `${config.apiHost}/auth/token`;
const meEndpoint = `${config.apiHost}/auth/me`;
const storageTokenKeyName = "accessToken";

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState<boolean>(
    defaultProvider.isInitialized
  );
  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setIsInitialized(true);
      const storedToken = window.localStorage.getItem(storageTokenKeyName)!;
      if (storedToken) {
        setAuthHeader(storedToken);
        setLoading(true);
        api
          .get(meEndpoint)
          .then((response) => {
            setUser({ ...response.data });
            setLoading(false);
          })
          .catch(() => {
            setUser(null);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (params: LoginParams) => {
    axios.post(loginEndpoint, params).then(async (res) => {
      setAuthHeader(res.data.token);
      document.cookie = `auth=${res.data.token}`;
      window.localStorage.setItem(storageTokenKeyName, res.data.token);
      api
        .get(meEndpoint)
        .then((response) => {
          setUser({ ...response.data });
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
      router.push("/course");
    });
  };

  const handleLogout = () => {
    setUser(null);
    setIsInitialized(false);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(storageTokenKeyName);
    router.push("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
