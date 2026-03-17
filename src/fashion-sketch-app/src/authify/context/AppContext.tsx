import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import authClient, { setAuthToken, clearAuthToken } from '../../services/authClient';
import { setAuthToken as setApiToken, clearAuthToken as clearApiToken } from '../../services/apiClient';
import { API_ENDPOINTS, AUTH_BASE_URL } from '../../config/api.config';

const JWT_KEY = 'jwt_token';

export interface UserData {
  name: string;
  email: string;
  isAccountVerified: boolean;
}

interface AppContextType {
  backendUrl: string;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  getUserData: () => Promise<void>;
  saveToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const backendUrl = AUTH_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  const saveToken = async (token: string) => {
    await SecureStore.setItemAsync(JWT_KEY, token);
    setAuthToken(token);
    setApiToken(token);
  };

  const clearToken = async () => {
    await SecureStore.deleteItemAsync(JWT_KEY);
    clearAuthToken();
    clearApiToken();
  };

  const getUserData = async () => {
    try {
      const response = await authClient.get(API_ENDPOINTS.AUTH.PROFILE);
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      // user is not authenticated
    }
  };

  const getAuthState = async () => {
    try {
      const token = await SecureStore.getItemAsync(JWT_KEY);
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      setAuthToken(token);
      setApiToken(token);
      const response = await authClient.get(API_ENDPOINTS.AUTH.IS_AUTHENTICATED);
      if (response.status === 200 && response.data === true) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        await clearToken();
        setIsLoggedIn(false);
      }
    } catch (error) {
      await clearToken();
      setIsLoggedIn(false);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isLoggedIn,
        isAuthLoading,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        saveToken,
        clearToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
