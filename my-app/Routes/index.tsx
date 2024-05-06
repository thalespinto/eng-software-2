import BottomNav from "../components/BottomNav";
import LoginScreen from "../screens/Public/Login";
import { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import useAuth, { authContext } from "../Providers/AuthProvider";

const Routes = () => {
  const Stack = createStackNavigator();
  const auths = useContext(authContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auths?.isSignedIn ? (
          <>
            <Stack.Screen
              name="BottomNav"
              component={BottomNav}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
