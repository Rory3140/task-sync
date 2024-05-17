import React, { useState, useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

export const Calendar = () => {
  const { userData, addEvent } = useContext(AuthContext);

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
      <View className="bg-offwhite p-4 flex justify-center items-center">
        {userData.dates &&
          userData.dates
            .filter((event) => {
              if (selectedOption === "day") {
                return (
                  new Date(event.date).toDateString() === date.toDateString()
                );
              } else {
                return (
                  new Date(event.date).getMonth() === date.getMonth() &&
                  new Date(event.date).getFullYear() === date.getFullYear()
                );
              }
            })
            .map((event, index) => {
              return (
                <View
                  key={index}
                  className="bg-white p-2 m-2 rounded-full flex items-center justify-between w-full"
                  style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.lightGrey,
                  }}
                >
                  <Text className="text-xl font-thin">{event.event}</Text>
                </View>
              );
            })}
        <TouchableOpacity
          className="bg-secondary p-2 rounded-full mt-4 flex items-center justify-center"
          onPress={() => {
            addEvent(date, new Date().toLocaleTimeString());
          }}
        >
          <Ionicons name="add" color={colors.primary} size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
