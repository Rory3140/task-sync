import React, { useState, useContext } from "react";
import { Text, TouchableOpacity, View, Platform } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { DateContext } from "../context/DateContext";
import { colors } from "../utils/colors";

export const DateSelector = ({ incrementDate, decrementDate }) => {
  const { date, setDate, listView } = useContext(DateContext);
  const [datePickerHeight, setDatePickerHeight] = useState(0);

  const headerHeight = 50;
  const animatedHeight = useSharedValue(headerHeight);

  const handleDatePress = () => {
    animatedHeight.value = withTiming(
      animatedHeight.value === headerHeight
        ? headerHeight + datePickerHeight
        : headerHeight,
      {
        duration: 300,
      }
    );
  };

  return (
    <Animated.View
      className="bg-white px-2 flex justify-start items-center border-b-0.5 border-lightGrey"
      style={{
        height: animatedHeight,
      }}
    >
      <View
        className="flex-row items-center justify-between w-full bg-white p-2"
      >
        <TouchableOpacity onPress={decrementDate}>
          <MaterialIcons
            name="keyboard-arrow-left"
            color={colors.primary}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDatePress()}>
          <Text className="text-xl font-thick color-black">
            {(() => {
              switch (listView) {
                case false:
                  return date.toDateString();
                case true:
                  return `${date.toLocaleString("default", {
                    month: "long",
                  })} ${date.getFullYear()}`;
                default:
                  return "";
              }
            })()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={incrementDate}>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={colors.primary}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View
        className="flex items-center justify-between p-2 w-full absolute bottom-0 z-[-10] bg-white"
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setDatePickerHeight(height);
        }}
      >
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              if (Platform.OS === "android") {
                handlePress();
              }
              setDate(selectedDate);
            }
          }}
        />
        {Platform.OS === "ios" && (
          <TouchableOpacity onPress={() => handleDatePress()}>
            <Ionicons name="close" color={colors.primary} size={30} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};
