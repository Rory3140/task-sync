import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Modal,
  TextInput,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Event } from "../components/Event";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

const AddEvent = ({ date, setShowAddEvent }) => {
  const { addEvent } = useContext(AuthContext);
  const [event, setEvent] = useState("");

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setShowAddEvent(false);
      }}
    >
      <View
        className="w-full h-full absolute bg-black opacity-50"
        onPress={() => setShowAddEvent(false)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          setShowAddEvent(false);
        }}
      >
        <View className="flex-1 items-center justify-end">
          <TouchableOpacity
            className="w-full h-full absolute"
            onPress={() => setShowAddEvent(false)}
          />
          <SafeAreaView className="bg-white rounded-t-xl w-full shadow-xl flex items-center justify-start h-2/3">
            <View className="flex items-center justify-center w-full p-4">
              <Text className="text-xl font-thick color-black">Add Event</Text>
              <TextInput
                className="bg-lightGrey p-2 m-2 rounded-full w-1/2"
                placeholder="Event"
                value={event}
                onChangeText={(text) => setEvent(text)}
              />
              <TouchableOpacity
                className="bg-secondary p-2 rounded-full mt-4 flex items-center justify-center"
                onPress={() => {
                  addEvent(date, event);
                  setShowAddEvent(false);
                }}
              >
                <Text className="text-xl font-thin">Add</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  className="text-xl font-thin"
                  onPress={() => setShowAddEvent(false)}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </Modal>
  );
};

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
      <View className="bg-offwhite p-4 flex justify-center items-center">
        {userData.events &&
          userData.events
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
                <Event key={index} event={event} />
              );
            })}
      </View>
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
