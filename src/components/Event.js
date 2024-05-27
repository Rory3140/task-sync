import React, { useContext } from "react";
import { View, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

export const Event = ({ event, height }) => {
  const { deleteEvent } = useContext(AuthContext);

  const TRIGGER_WIDTH = 300;
  const OPTIONS_WIDTH = 150;

  const triggerStyles = {
    triggerWrapper: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: event.color || colors.white,
      padding: 10,
      borderRadius: 5,
      height: height || 60,
    },
    triggerTouchable: {
      style: {
        borderRadius: 5,
        width: "100%",
      },
    },
  };

  const optionsStyles = {
    optionsContainer: {
      backgroundColor: colors.white,
      padding: 5,
      width: OPTIONS_WIDTH,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      marginLeft: (TRIGGER_WIDTH - OPTIONS_WIDTH) / 2,
    },
    optionsWrapper: {
      backgroundColor: colors.white,
    },
    optionWrapper: {
      backgroundColor: colors.white,
      margin: 5,
    },
    optionText: {
      color: colors.black,
    },
  };

  return (
    <Menu className="mb-2">
      <MenuTrigger customStyles={triggerStyles}>
        <View className="flex flex-row justify-between align-center w-full">
          <View className="flex flex-col justify-between align-center">
            <Text className="text-xl font-thick h-8">{event.title}</Text>
            <Text className="text-sm font-thin h-6">{event.location}</Text>
          </View>
          <View className="flex flex-col justify-start align-center">
            <Text className="text-sm ">
              {new Date(event.startDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text className="text-sm">
              {new Date(event.endDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        <MenuOption onSelect={() => alert(`Edit`)} text="Edit" />
        <MenuOption onSelect={() => deleteEvent(event)}>
          <Text style={{ color: "red" }}>Delete</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};
