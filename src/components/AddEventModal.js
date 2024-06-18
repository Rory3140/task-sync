import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Switch,
  Keyboard,
} from "react-native";
import BottomSheetModal from "@gorhom/bottom-sheet";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AuthContext } from "../context/AuthContext";
import { DateContext } from "../context/DateContext";
import { RefContext } from "../context/RefContext";

import { calendarColors, colors } from "../utils/colors";

export const AddEventModal = () => {
  const { addEvent, updateEvent } = useContext(AuthContext);
  const { date } = useContext(DateContext);
  const { addEventRef } = useContext(RefContext);
  const bottomSheetRef = useRef(null);

  const [eventId, setEventId] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [eventColor, setEventColor] = useState(calendarColors.violet);
  const [description, setDescription] = useState("");

  const [allDay, setAllDay] = useState(false);
  const [startDateTime, setStartDateTime] = useState(date);
  const [endDateTime, setEndDateTime] = useState(date);

  const items = [
    { label: "Event", value: "event" },
    { label: "To Do Item", value: "toDoItem" },
  ];
  const [category, setCategory] = useState(items[0].value);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    setEventId(null);
    setTitle("");
    setLocation("");
    setDescription("");
    setAllDay(false);
    setCategory(items[0].value);
    setDropdownOpen(false);
    setEventColor(calendarColors.violet);
  }

  function saveEvent() {
    const eventDetails = {
      title,
      location,
      description,
      category: category === "event" && allDay ? "allDayEvent" : category,
      startDateTime: allDay
        ? new Date(startDateTime.setHours(0, 0, 0, 0)).toISOString()
        : startDateTime.toISOString(),
      endDateTime:
        !allDay && category !== "toDoItem" ? endDateTime.toISOString() : "",
      color: eventColor,
      isCompleted: category === "toDoItem" ? false : "",
    };

    if (eventId) {
      updateEvent({ id: eventId, ...eventDetails });
    } else {
      addEvent(eventDetails);
    }
    bottomSheetRef.current?.close();
  }

  useImperativeHandle(addEventRef, () => ({
    expand(event) {
      if (event) {
        setEventId(event.id);
        setTitle(event.title);
        setLocation(event.location);
        setDescription(event.description);
        setEventColor(event.color);
        setCategory(event.category);
        setStartDateTime(new Date(event.startDateTime));
        if (event.endDateTime) {
          setEndDateTime(new Date(event.endDateTime));
        }
        setAllDay(event.category === "allDayEvent");
        if (event.category === "toDoItem") {
          setAllDay(true);
        }
        if (event.category === "allDayEvent") {
          setCategory("event");
        }
      } else {
        resetStates();
      }
      bottomSheetRef.current?.expand();
    },
    close() {
      bottomSheetRef.current?.close();
    },
  }));

  const snapPoints = useMemo(() => ["50%", "100%"], []);
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={() => {
        Keyboard.dismiss();
        resetStates();
      }}
      containerStyle={{ marginTop: 50 }}
    >
      <View className="bg-white rounded-t-xl w-full flex items-center justify-start h-full">
        <View className="flex items-center justify-center w-full px-4">
          <View className="flex-row items-center justify-between w-full">
            <TouchableOpacity
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
            >
              <Text className="color-primary text-xl">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => saveEvent()}>
              <Text className="color-primary text-xl">
                {eventId ? "Update" : "Add"}
              </Text>
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
              <View className="w-5/6 bg-lightGrey h-[1] rounded-full" />
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

            <View className="flex items-center justify-center w-full">
              <View className="flex items-center justify-center rounded-xl w-full m-4 bg-offWhite">
                <View className="p-2 pl-4 m-2 w-full h-16 justify-center align-center">
                  <TextInput
                    className="w-full h-16"
                    placeholder="Event Description"
                    value={description}
                    placeholderTextColor={colors.grey}
                    onChangeText={(text) => {
                      if (text.includes("\n")) {
                        setDescription(text.replace("\n", ""));
                        Keyboard.dismiss();
                      } else {
                        setDescription(text);
                      }
                    }}
                    multiline
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>

            <View className="flex items-center justify-start rounded-xl w-full m-4 bg-offWhite z-10">
              <View className="p-2 pl-4 m-2 w-full h-8 flex-row justify-between items-center">
                <Text className="text-l font-thick color-black">Category</Text>
                <View className="h-6 justify-center align-center">
                  <DropDownPicker
                    items={items}
                    value={category}
                    setValue={setCategory}
                    open={dropdownOpen}
                    setOpen={setDropdownOpen}
                    style={{
                      backgroundColor: colors.lightGrey,
                      borderWidth: 0,
                      minHeight: 0,
                      height: 30,
                      width: 175,
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: colors.lightGrey,
                      borderWidth: 0,
                    }}
                  />
                </View>
              </View>
            </View>

            <View className="flex items-center justify-start rounded-xl w-full m-4 bg-offWhite">
              {category === "toDoItem" ? null : (
                <>
                  <View className="p-2 pl-4 m-2 w-full h-8 flex-row justify-between items-center">
                    <Text className="text-l font-thick color-black">
                      All Day
                    </Text>
                    <Switch
                      trackColor={{
                        false: colors.lightGrey,
                        true: colors.primary,
                      }}
                      thumbColor={colors.white}
                      onValueChange={() => setAllDay(!allDay)}
                      value={allDay}
                    />
                  </View>
                  <View className="w-5/6 bg-lightGrey h-[1] rounded-full" />
                </>
              )}
              {allDay || category === "toDoItem" ? (
                <View className="p-2 pl-4 m-2 w-full h-8 flex-row justify-between items-center">
                  <Text className="text-l font-thick color-black">Date</Text>
                  <View className="flex-row items-center justify-between">
                    <DateTimePicker
                      value={startDateTime}
                      mode="date"
                      display="default"
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
              ) : (
                <>
                  <View className="p-2 pl-4 m-2 w-full h-8 flex-row justify-between items-center">
                    <Text className="text-l font-thick color-black">
                      Start Date
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <DateTimePicker
                        value={startDateTime}
                        mode="datetime"
                        display="default"
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
                  <View className="w-5/6 bg-lightGrey h-[1] rounded-full" />
                  <View className="p-2 pl-4 m-2 w-full h-8 flex-row justify-between items-center">
                    <Text className="text-l font-thick color-black">
                      End Date
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <DateTimePicker
                        value={endDateTime}
                        mode="datetime"
                        display="default"
                        onChange={(event, selectedDate) =>
                          setEndDateTime(selectedDate)
                        }
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
};
