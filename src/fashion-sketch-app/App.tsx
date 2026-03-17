import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { View, ActivityIndicator } from "react-native";
import { AppContextProvider, useAppContext } from "./src/authify/context/AppContext";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { store, persistor } from "./src/store";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { RootStackParamList } from "./src/navigation/types";
import Login from "./src/authify/screens/Login";
import EmailVerify from "./src/authify/screens/EmailVerify";
import ResetPassword from "./src/authify/screens/ResetPassword";
import TabNavigator from "./src/navigation/TabNavigator";
import CanvasScreen from "./src/pages/sketch/screens/CanvasScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isLoggedIn, isAuthLoading } = useAppContext();
  const { colors } = useTheme();

  if (isAuthLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.gold} size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Canvas" component={CanvasScreen} />
          <Stack.Screen name="EmailVerify" component={EmailVerify} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ErrorBoundary fallbackMessage="Aplicatia a intampinat o eroare neasteptata">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <AppContextProvider>
              <NavigationContainer>
                <ErrorBoundary fallbackMessage="Eroare de navigare">
                  <RootNavigator />
                </ErrorBoundary>
              </NavigationContainer>
            </AppContextProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
