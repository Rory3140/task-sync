import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Event } from "../components/Event";
import { AddEvent } from "../components/AddEvent";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

export const Calendar = () => {
  const { userData } = useContext(AuthContext);

  const [date, setDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("day");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);

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
    <SafeAreaView
      className="flex-1 bg-offwhite"
      onPress={() => setShowDatePicker(false)}
    >
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
                  if (Platform.OS === "android") {
                    setShowDatePicker(false);
                  }
                  setDate(selectedDate);
                }
              }}
            />
            {Platform.OS === "ios" && (
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close" color={colors.primary} size={30} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <ScrollView className="bg-offWhite p-4 flex-1 w-full">
        {userData.events &&
          userData.events
            .filter((event) => {
              if (selectedOption === "day") {
                return (
                  new Date(event.startDateTime).toDateString() ===
                  date.toDateString()
                );
              } else {
                return (
                  new Date(event.startDateTime).getMonth() ===
                    date.getMonth() &&
                  new Date(event.startDateTime).getFullYear() ===
                    date.getFullYear()
                );
              }
            })
            .sort((a, b) => {
              return new Date(a.startDateTime) - new Date(b.startDateTime);
            })
            .map((event, index) => {
              return <Event key={index} event={event} />;
            })}
        <View className="h-24" />
      </ScrollView>
      <View className="bg-white p-4 pb-6 rounded-t-xl flex items-center justify-between w-full absolute bottom-0 shadow-xl">
        <TouchableOpacity
          className="bg-secondary py-2 px-10 rounded-full m-2 flex items-center justify-center"
          onPress={() => setShowAddEvent(true)}
        >
          <Ionicons name="add" color={colors.primary} size={40} />
        </TouchableOpacity>
      </View>
      {showAddEvent && (
        <AddEvent date={date} setShowAddEvent={setShowAddEvent} />
      )}
    </SafeAreaView>
  );
};
