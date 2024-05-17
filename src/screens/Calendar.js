import React, { useState, useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

export const Calendar = () => {
  const { userData } = useContext(AuthContext);

  const [date, setDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("day");
  const [showDatePicker, setShowDatePicker] = useState(false);

  function incrementDate() {
    if (selectedOption === "month") {
      setDate(new Date(date.setMonth(date.getMonth() + 1)));
    } else {
      setDate(new Date(date.setDate(date.getDate() + 1)));
    }
  }

  function decrementDate() {
    if (selectedOption === "month") {
      setDate(new Date(date.setMonth(date.getMonth() - 1)));
    } else {
      setDate(new Date(date.setDate(date.getDate() - 1)));
    }
  }

  return (
    <SafeAreaView>
      <View
        className="bg-white p-2 flex justify-between items-center"
        style={{ borderBottomWidth: 0.5, borderBottomColor: colors.lightGrey }}
      >
        <View className="p-2 flex items-center justify-centre w-full">
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

        <View className="flex-row items-center justify-between w-full">
          <TouchableOpacity onPress={decrementDate}>
            <MaterialIcons
              name="keyboard-arrow-left"
              color={colors.primary}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
            <Text className="text-xl font-thick color-black">
              {(() => {
                switch (selectedOption) {
                  case "day":
                    if (date.toDateString() === new Date().toDateString()) {
                      return "Today";
                    } else {
                      return date.toDateString();
                    }
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
        {showDatePicker && (
          <View className="flex items-center justify-between w-full">
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
              <Ionicons name="close" color={colors.primary} size={30} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className="bg-offwhite p-4 flex justify-center items-center"></View>
    </SafeAreaView>
  );
};
