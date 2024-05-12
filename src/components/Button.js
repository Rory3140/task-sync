import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const Button = ({
  label,
  onPress,
  style,
  textColor,
  isVis = false,
  flexDirection,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: colors.primary,
          padding: 10,
          borderRadius: 5,
          margin: 5,
          width: "95%",
        },
        style,
      ]}
    >
      <View
        style={[styles.arrow, { flexDirection: flexDirection || "column" }]}
      >
        <Text
          style={[
            {
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: textColor || colors.white,
            },
          ]}
        >
          {label}
        </Text>

        {isVis && (
          <MaterialIcons name="arrow-forward-ios" size={22} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrow: {
    display: "flex",
    justifyContent: "space-between",
    width: "98%",
  },
});
