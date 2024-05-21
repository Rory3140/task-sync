import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { AuthContext } from "../context/AuthContext";

export const AddEvent = ({ date, setShowAddEvent }) => {
  const { addEvent } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const [startDateTime, setStartDateTime] = useState(date);
  const [endDateTime, setEndDateTime] = useState(
    new Date(date.getTime() + 60 * 60 * 1000)
  );

  function createEvent() {
    const newStartDateTime = startDateTime.toISOString();
    const newEndDateTime = endDateTime.toISOString();

    addEvent({
      title,
      location,
      startDateTime: newStartDateTime,
      endDateTime: newEndDateTime,
    });
    setShowAddEvent(false);
  }

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
          <SafeAreaView className="bg-offWhite rounded-t-xl w-full shadow-xl flex items-center justify-start h-2/3">
            <View className="flex items-center justify-center w-full p-4">
              <View className="flex-row items-center justify-between w-full">
                <TouchableOpacity
                  onPress={() => {
                    setShowAddEvent(false);
                  }}
                >
                  <Text className="color-primary text-xl ">Cancel</Text>
                </TouchableOpacity>

                <Text className="text-xl font-thick color-black">
                  Add Event
                </Text>
                <TouchableOpacity onPress={() => createEvent()}>
                  <Text className="color-primary text-xl ">Add</Text>
                </TouchableOpacity>
              </View>
              <View className="flex items-center justify-center w-full">
                <View className="flex items-center justify-center rounded-xl w-full m-4 bg-white">
                  <View className="p-2 pl-4 m-2 w-full h-8 justify-center align-center">
                    <TextInput
                      className="w-full h-8"
                      placeholder="Event Title"
                      value={title}
                      onChangeText={(text) => setTitle(text)}
                    />
                  </View>
                  <View className="absolute w-5/6 bg-offWhite h-0.5 rounded-full" />
                  <View className="p-2 pl-4 m-2 w-full h-8 justify-center align-center">
                    <TextInput
                      className="w-full h-8"
                      placeholder="Location"
                      value={location}
                      onChangeText={(text) => setLocation(text)}
                    />
                  </View>
                </View>

                <View className="flex items-center justify-center rounded-xl w-full m-4 bg-white">
                  <View className="p-2 pl-4 m-2 w-full h-8 flex-row justify-between align-center">
                    <Text className="text-l font-thick color-black">
                      Start Time
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <DateTimePicker
                        value={startDateTime}
                        mode="date"
                        display="calendar"
                        onChange={(event, selectedDate) => {
                          if (selectedDate) {
                            setStartDateTime(selectedDate);
                            if (selectedDate > endDateTime) {
                              setEndDateTime(
                                new Date(
                                  selectedDate.getTime() + 60 * 60 * 1000
                                )
                              );
                            }
                          }
                        }}
                      />
                      <DateTimePicker
                        value={startDateTime}
                        mode="time"
                        display="default"
                        minuteInterval={5}
                        onChange={(event, selectedDate) => {
                          if (selectedDate) {
                            setStartDateTime(selectedDate);
                            if (selectedDate > endDateTime) {
                              setEndDateTime(
                                new Date(
                                  selectedDate.getTime() + 60 * 60 * 1000
                                )
                              );
                            }
                          }
                        }}
                      />
                    </View>
                  </View>
                  <View className="absolute w-5/6 bg-offWhite h-0.5 rounded-full" />
                  <View className="p-2 pl-4 m-2 w-full h-8 flex-row justify-between align-center">
                    <Text className="text-l font-thick color-black">
                      End Time
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <DateTimePicker
                        value={endDateTime}
                        mode="date"
                        display="calendar"
                        onChange={(event, selectedDate) => {
                          if (selectedDate) {
                            if (selectedDate < startDateTime) {
                              setStartDateTime(selectedDate);
                            }
                            setEndDateTime(selectedDate);
                          }
                        }}
                      />
                      <DateTimePicker
                        value={endDateTime}
                        mode="time"
                        display="default"
                        minuteInterval={5}
                        onChange={(event, selectedDate) => {
                          if (selectedDate) {
                            if (selectedDate < startDateTime) {
                              setStartDateTime(selectedDate);
                            }
                            setEndDateTime(selectedDate);
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </Modal>
  );
};
