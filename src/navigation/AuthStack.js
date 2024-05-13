import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screens/Login";
import { Register } from "../screens/Register";

import { colors } from "../utils/colors";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerTitle: "Create an Account",
          headerTitleStyle: {
            color: colors.black,
          },
          headerTintColor: colors.primary,
        }}
      />
    </Stack.Navigator>
  );
};
