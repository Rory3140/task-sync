import React, { useState, useContext } from "react";
import { Text, TouchableOpacity, View, Platform } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { DateContext } from "../context/DateContext";
import { colors } from "../utils/colors";

export const DateSelector = ({
  selectedOption,
  setSelectedOption,
  incrementDate,
  decrementDate,
}) => {
  const { date, setDate } = useContext(DateContext);
  const [datePickerHeight, setDatePickerHeight] = useState(0);
  const animatedHeight = useSharedValue(95);

  const handleDatePress = () => {
    animatedHeight.value = withTiming(
      animatedHeight.value === 95 ? 95 + datePickerHeight : 95,
      {
        duration: 300,
      }
    );
  };

  return (
    <Animated.View
      className="bg-white px-2 flex justify-start items-center"
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lightGrey,
        height: animatedHeight,
      }}
    >
      <View className="p-2 flex items-center justify-centre w-full bg-white">
        <SwitchSelector
          options={[
            { label: "Day", value: "day" },
            { label: "Month", value: "month" },
          ]}
          initial={0}
          onPress={(value) => {
            setSelectedOption(value);
          }}
          buttonColor={colors.primary}
          backgroundColor={colors.lightGrey}
          borderColor={colors.lightGrey}
          hasPadding
        />
      </View>

      <View className="flex-row items-center justify-between w-full bg-white">
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
              switch (selectedOption) {
                case "day":
                  return date.toDateString();
                case "month":
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
