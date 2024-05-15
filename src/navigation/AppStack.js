import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Dashboard } from "../screens/Dashboard";
import { Settings } from "../screens/Settings";

import { colors } from "../utils/colors";

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerTitleStyle: {
          color: colors.black,
        },
        headerStyle: {
          borderBottomColor: colors.lightGrey,
          borderBottomWidth: 0.25,
        },
        headerTintColor: colors.primary,
        drawerActiveBackgroundColor: colors.secondary,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.black,
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};
