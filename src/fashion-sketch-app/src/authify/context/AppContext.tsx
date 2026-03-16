import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { AppConstants } from '../constants';

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
  const backendUrl = AppConstants.BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  const saveToken = async (token: string) => {
    await SecureStore.setItemAsync(JWT_KEY, token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const clearToken = async () => {
    await SecureStore.deleteItemAsync(JWT_KEY);
    delete axios.defaults.headers.common['Authorization'];
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(backendUrl + '/profile');
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      // utilizatorul nu e autentificat
    }
  };

  const getAuthState = async () => {
    try {
      const token = await SecureStore.getItemAsync(JWT_KEY);
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(backendUrl + '/is-authenticated');
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
