import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Calendar } from "../screens/Calendar";
import { EventDetails } from "../screens/EventDetails";
import { Settings } from "../screens/Settings.js";
import Example from "../screens/Example";

import { colors } from "../utils/colors";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{
          title: "Event Details",
          headerTitleStyle: {
            color: colors.black,
          },
          headerStyle: {
            borderBottomColor: colors.lightGrey,
            borderBottomWidth: 0.25,
          },
          headerTintColor: colors.primary,
        }}
      />
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="CalendarStack"
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
      <Drawer.Screen name="CalendarStack" component={CalendarStack} options={{ title: "Calendar" }} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Example" component={Example} />
    </Drawer.Navigator>
  );
};
