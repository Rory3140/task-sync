import React from "react";
import { View, Text } from "react-native";

import { Event } from "./Event";
import { getEventsByMonth } from "../utils/functions";

export const EventsList = ({ date, navigation }) => {
  const eventsByDay = getEventsByMonth(date);

  return (
    <View>
      {eventsByDay.map((eventsOnDay, dayIndex) => {
        if (eventsOnDay.length === 0) {
          return null;
        }

        return (
          <View key={dayIndex}>
            <Text className="text-center font-bold text-lg mt-4 ">
              {new Date(
                date.getFullYear(),
                date.getMonth(),
                dayIndex
              ).toDateString()}
            </Text>
            <View className="w-full bg-lightGrey h-0.5 rounded-full mb-2" />
            {eventsOnDay.map((event, eventIndex) => (
              <Event key={eventIndex} event={event} navigation={navigation} />
            ))}
          </View>
        );
      })}
    </View>
  );
};
