import React, { useState, useRef, useEffect, useContext } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

import { DateContext } from "../context/DateContext";
import { RefContext } from "../context/RefContext";
import { DateSelector } from "../components/DateSelector";
import { AllDayEvents } from "../components/AllDayEvents";
import { Timetable } from "../components/Timetable";
import { EventsList } from "../components/EventsList";
import { colors } from "../utils/colors";

export const Calendar = () => {
  const { date, setDate } = useContext(DateContext);
  const { addEventRef } = useContext(RefContext);

  const [selectedOption, setSelectedOption] = useState("day");
  const [blockHeight, setBlockHeight] = useState(0);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    addEventRef.current?.close();
  }, [date, selectedOption]);

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
        }, 0);
      }
    }
  }, [date, blockHeight, selectedOption]);

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

  const onPanGestureHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      if (translationX > 50) {
        decrementDate();
      } else if (translationX < -50) {
        incrementDate();
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-offwhite">
        <DateSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          incrementDate={incrementDate}
          decrementDate={decrementDate}
        />
        {selectedOption === "day" && <AllDayEvents />}

        <PanGestureHandler
          onHandlerStateChange={onPanGestureHandlerStateChange}
        >
          <ScrollView
            className="bg-offWhite p-4 flex-1 w-full"
            ref={scrollViewRef}
          >
            {selectedOption === "day" ? (
              <Timetable
                date={date}
                blockHeight={blockHeight}
                setBlockHeight={setBlockHeight}
              />
            ) : (
              <EventsList setSelectedOption={setSelectedOption} />
            )}
            <View className="h-24" />
          </ScrollView>
        </PanGestureHandler>

        <View className="bg-white pb-6 rounded-t-xl flex items-center justify-between w-full absolute bottom-0 shadow-xl">
          <TouchableOpacity
            className="bg-secondary py-2 px-10 rounded-full m-2 flex-row items-center justify-around"
            onPress={() => addEventRef.current?.expand()}
          >
            <Ionicons name="add" color={colors.primary} size={40} />
            <Text className="text-xl font-thick color-primary">Add Event</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
