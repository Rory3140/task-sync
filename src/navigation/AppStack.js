import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Calendar } from "../screens/Calendar";
import { Settings } from "../screens/Settings";

import { colors } from "../utils/colors";

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Calendar"
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
      <Drawer.Screen name="Calendar" component={Calendar} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};
