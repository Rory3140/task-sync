import React, {
  useState,
  useContext,
  useEffect,
  forwardRef,
  useMemo,
} from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AuthContext } from "../context/AuthContext";

import { calendarColors, colors } from "../utils/colors";

export const AddEventModal = forwardRef((props, ref) => {
  const { date } = props;

  const { addEvent } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [eventColor, setEventColor] = useState(calendarColors.violet);

  const [startDateTime, setStartDateTime] = useState(date);
  const [endDateTime, setEndDateTime] = useState(date);

  useEffect(() => {
    const currentDate = new Date();
    const currentMinutes = currentDate.getMinutes();
    const updatedDate = new Date(date.getTime());
    updatedDate.setMinutes(currentMinutes);
    const roundedDownDate = new Date(
      Math.floor(updatedDate.getTime() / (5 * 60 * 1000)) * (5 * 60 * 1000)
    );
    setStartDateTime(roundedDownDate);
    setEndDateTime(new Date(roundedDownDate.getTime() + 60 * 60 * 1000));
  }, [date]);

  function resetStates() {
    setTitle("");
    setLocation("");
    setEventColor(calendarColors.violet);
  }

  function createEvent() {
    const newStartDateTime = startDateTime.toISOString();
    const newEndDateTime = endDateTime.toISOString();

    addEvent({
      title,
      location,
      startDateTime: newStartDateTime,
      endDateTime: newEndDateTime,
      color: eventColor,
    });
    ref.current?.close();
  }

  const snapPoints = useMemo(() => ["50%", "75%"], []);
  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={() => resetStates()}
    >
      <View className="bg-white rounded-t-xl w-full flex items-center justify-start h-full">
        <View className="flex items-center justify-center w-full px-4">
          <View className="flex-row items-center justify-between w-full">
            <TouchableOpacity
              onPress={() => {
                ref.current?.close();
              }}
            >
              <Text className="color-primary text-xl ">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => createEvent()}>
              <Text className="color-primary text-xl ">Add</Text>
            </TouchableOpacity>
          </View>
          <View className="flex items-center justify-center w-full">
            <View className="flex items-center justify-center rounded-xl w-full m-4 bg-offWhite">
              <View className="p-2 pl-4 m-2 w-full h-8 justify-center align-center">
                <TextInput
                  className="w-full h-8"
                  placeholder="Event Title"
                  value={title}
                  placeholderTextColor={colors.grey}
                  onChangeText={(text) => setTitle(text)}
                />
              </View>
              <View className="absolute w-5/6 bg-lightGrey h-0.5 rounded-full" />
              <View className="p-2 pl-4 m-2 w-full h-8 justify-center align-center">
                <TextInput
                  className="w-full h-8"
                  placeholder="Location"
                  placeholderTextColor={colors.grey}
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                />
              </View>
            </View>

            <View className="flex items-center justify-center rounded-xl w-full m-4 bg-offWhite">
              <View className="p-2 pl-4 m-2 w-full h-8 flex-row justify-between align-center">
                <Text className="text-l font-thick color-black">
                  Start Time
                </Text>
                <View className="flex-row items-center justify-between">
                  <DateTimePicker
                    value={startDateTime}
                    mode="date"
                    display="calendar"
                    accentColor={colors.primary}
                    themeVariant="light"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setStartDateTime(selectedDate);
                        if (selectedDate > endDateTime) {
                          setEndDateTime(
                            new Date(selectedDate.getTime() + 60 * 60 * 1000)
                          );
                        }
                      }
                    }}
                  />
                  <DateTimePicker
                    value={startDateTime}
                    mode="time"
                    display="default"
                    accentColor={colors.primary}
                    themeVariant="light"
                    minuteInterval={5}
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setStartDateTime(selectedDate);
                        if (selectedDate > endDateTime) {
                          setEndDateTime(
                            new Date(selectedDate.getTime() + 60 * 60 * 1000)
                          );
                        }
                      }
                    }}
                  />
                </View>
              </View>
              <View className="absolute w-5/6 bg-lightGrey h-0.5 rounded-full" />
              <View className="p-2 pl-4 m-2 w-full h-8 flex-row justify-between align-center">
                <Text className="text-l font-thick color-black">End Time</Text>
                <View className="flex-row items-center justify-between">
                  <DateTimePicker
                    value={endDateTime}
                    mode="date"
                    display="calendar"
                    accentColor={colors.primary}
                    themeVariant="light"
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
                    accentColor={colors.primary}
                    themeVariant="light"
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

            <View className="flex items-center justify-center rounded-xl w-full m-4 bg-offWhite">
              <View className="p-2 pl-4 m-2 w-full h-8 flex-row justify-between align-center">
                <Text className="text-l font-thick color-black">
                  Event Color
                </Text>
                <View className="flex-row items-center justify-between">
                  {Object.values(calendarColors).map((color) => (
                    <TouchableOpacity
                      key={color}
                      onPress={() => setEventColor(color)}
                    >
                      <View
                        className={`w-6 h-6 rounded-full m-1 ${
                          color === eventColor
                            ? "border-2 border-black"
                            : "border-2 border-lightGrey"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
});
