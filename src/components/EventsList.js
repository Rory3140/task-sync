import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { DateContext } from "../context/DateContext";
import { Event } from "./Event";
import { getEventsByMonth } from "../utils/functions";

export const EventsList = ({ navigation, setSelectedOption }) => {
  const { date, setDate } = useContext(DateContext);
  const eventsByDay = getEventsByMonth(date);

  function handlePress(date) {
    setDate(date);
    setSelectedOption("day");
  }

  return (
    <View>
      {eventsByDay.map((eventsOnDay, dayIndex) => {
        if (eventsOnDay.length === 0) {
          return null;
        }

        return (
          <View key={dayIndex}>
            <TouchableOpacity
              onPress={() => {
                handlePress(
                  new Date(date.getFullYear(), date.getMonth(), dayIndex)
                );
              }}
            >
              <Text className="text-center font-bold text-lg mt-4 ">
                {new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  dayIndex
                ).toDateString()}
              </Text>
              <View className="w-full bg-lightGrey h-0.5 rounded-full mb-2" />
            </TouchableOpacity>
            {eventsOnDay.map((event, eventIndex) => (
              <Event key={eventIndex} event={event} navigation={navigation} />
            ))}
          </View>
        );
      })}
    </View>
  );
};
