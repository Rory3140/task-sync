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

export const Event = ({ event }) => {
  const { deleteEvent } = useContext(AuthContext);

  return (
    <Menu className="mb-2">
      <MenuTrigger customStyles={triggerStyles}>
        <Text className="text-xl font-thin">{event.event}</Text>
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

const TRIGGER_WIDTH = 300;
const OPTIONS_WIDTH = 150;

const triggerStyles = {
  triggerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    width: TRIGGER_WIDTH,
    height: 50,
  },
  triggerTouchable: {
    style: {
      borderRadius: 5,
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
