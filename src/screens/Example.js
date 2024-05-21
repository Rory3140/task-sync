import React from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import { colors } from "../utils/colors";

export const Example = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Menu>
        <MenuTrigger text="Select action" customStyles={triggerStyles} />
        <MenuOptions customStyles={optionsStyles} anchorStyle={anchorStyles}>
          <MenuOption onSelect={() => alert(`Edit`)} text="Edit" />
          <MenuOption onSelect={() => alert(`Delete`)}>
            <Text style={{ color: "red" }}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const TRIGGER_WIDTH = 200;
const OPTIONS_WIDTH = 150;

const triggerStyles = {
  triggerText: {
    color: colors.white,
  },
  triggerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: 10,
    width: TRIGGER_WIDTH,
    borderRadius: 5,
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

const anchorStyles = {
  alignItems: "center",
  justifyContent: "center",
};
