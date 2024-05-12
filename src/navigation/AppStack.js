import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Dashboard } from "../screens/Dashboard";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};
