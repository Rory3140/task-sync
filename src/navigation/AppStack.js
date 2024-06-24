// AppStack.js
import React, { useContext } from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { DateContext } from "../context/DateContext";
import {DrawerContent} from "../components/DrawerContent.js";
import { EventDetailsModal } from "../components/EventDetailsModal";
import { AddEventModal } from "../components/AddEventModal";
import { Calendar } from "../screens/Calendar";
import { Settings } from "../screens/Settings.js";
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
        initialRouteName="Calendar"
        drawerContent={(props) => <DrawerContent {...props} />}
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
            headerTitle: () => (
              <Image
                source={require("../../assets/logo/logo-text.png")}
                style={{ width: 100, height: 30 }}
              />
            ),
            headerRight: () => (
              <View className="mr-4">
                <TouchableOpacity onPress={goToToday}>
                  <Text className="text-primary text-lg">Today</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
      <AddEventModal />
      <EventDetailsModal />
    </>
  );
};
