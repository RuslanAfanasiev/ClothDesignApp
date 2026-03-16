import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { AppContextProvider, useAppContext } from "./src/authify/context/AppContext";
import { store } from "./src/store";
import { RootStackParamList } from "./src/navigation/types";
import Login from "./src/authify/screens/Login";
import EmailVerify from "./src/authify/screens/EmailVerify";
import ResetPassword from "./src/authify/screens/ResetPassword";
import TabNavigator from "./src/navigation/TabNavigator";
import CanvasScreen from "./src/pages/sketch/CanvasScreen";
import { Colors } from "./src/theme/colors";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isLoggedIn, isAuthLoading } = useAppContext();

  if (isAuthLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={Colors.gold} size="large" />
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
    <Provider store={store}>
      <AppContextProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AppContextProvider>
    </Provider>
  );
}
