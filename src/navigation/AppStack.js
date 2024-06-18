import React, { useContext } from "react";
import { Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DateContext } from "../context/DateContext";
import { EventDetailsModal } from "../components/EventDetailsModal";
import { AddEventModal } from "../components/AddEventModal";
import { Calendar } from "../screens/Calendar";
import { Settings } from "../screens/Settings.js";
import Example from "../screens/Example";
import { colors } from "../utils/colors";

const Drawer = createDrawerNavigator();

export const AppStack = () => {
  const { setDate } = useContext(DateContext);

  const goToToday = () => {
    setDate(new Date());
  };

  return (
    <>
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
        <Drawer.Screen
          name="Calendar"
          component={Calendar}
          options={() => ({
            title: "Calendar",
            headerRight: () => (
              <Button
                onPress={() => {
                  goToToday();
                }}
                title="Today"
                color={colors.primary}
              />
            ),
          })}
        />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Example" component={Example} />
      </Drawer.Navigator>
      <AddEventModal />
      <EventDetailsModal />
    </>
  );
};
