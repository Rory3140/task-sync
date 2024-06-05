import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { EventsList } from "../components/EventsList";
import { Timetable } from "../components/Timetable";
import { AddEventModal } from "../components/AddEventModal";

import { colors } from "../utils/colors";

export const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("day");
  const [blockHeight, setBlockHeight] = useState(0);
  const [datePickerHeight, setDatePickerHeight] = useState(0);

  const addEventRef = useRef(null);
  const scrollViewRef = useRef(null);

  const animatedHeight = useSharedValue(95);

  useEffect(() => {
    if (
      selectedOption === "day" &&
      date.toDateString() === new Date().toDateString()
    ) {
      if (blockHeight > 0) {
        setTimeout(() => {
          const currentHour = new Date().getHours();
          const scrollToPosition = currentHour * blockHeight;
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              y: scrollToPosition,
              animated: false,
            });
          }
        }, 10);
      }
    }
  }, [date, blockHeight, selectedOption]);

  useEffect(() => {
    addEventRef.current?.close();
  }, [selectedOption]);

  const handlePress = () => {
    animatedHeight.value = withTiming(
      animatedHeight.value === 95 ? 95 + datePickerHeight : 95,
      {
        duration: 300,
      }
    );
  };

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
    <SafeAreaView className="flex-1 bg-offwhite">
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
          <TouchableOpacity onPress={() => handlePress()}>
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
            <TouchableOpacity onPress={() => handlePress()}>
              <Ionicons name="close" color={colors.primary} size={30} />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      <ScrollView className="bg-offWhite p-4 flex-1 w-full" ref={scrollViewRef}>
        {selectedOption === "day" ? (
          <Timetable
            date={date}
            blockHeight={blockHeight}
            setBlockHeight={setBlockHeight}
          />
        ) : (
          <EventsList date={date} />
        )}
        <View className="h-24" />
      </ScrollView>

      <View className="bg-white p-4 pb-6 rounded-t-xl flex items-center justify-between w-full absolute bottom-0 shadow-xl">
        <TouchableOpacity
          className="bg-secondary py-2 px-10 rounded-full m-2 flex-row items-center justify-around"
          onPress={() => addEventRef.current?.expand()}
        >
          <Ionicons name="add" color={colors.primary} size={40} />
          <Text className="text-xl font-thick color-primary">Add Event</Text>
        </TouchableOpacity>
      </View>
      <AddEventModal ref={addEventRef} date={date} />
    </SafeAreaView>
  );
};
