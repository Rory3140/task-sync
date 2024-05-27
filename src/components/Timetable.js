import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import { Event } from "../components/Event";

import { getEventsByDay } from "../utils/functions";
import { colors } from "../utils/colors";

const EventWrapper = ({ event, blockHeight }) => {
  const { startDateTime, endDateTime } = event;

  const startHours = new Date(startDateTime).getHours();
  const startMinutes = new Date(startDateTime).getMinutes();
  const endHours = new Date(endDateTime).getHours();
  const endMinutes = new Date(endDateTime).getMinutes();

  const eventDuration =
    (endHours - startHours) * 60 + (endMinutes - startMinutes);

  const eventHeight = (eventDuration / 60) * blockHeight;

  const eventTop = (startHours * 60 + startMinutes) * (blockHeight / 60);

  return (
    <View
      className="absolute opacity-80 w-full"
      style={{
        top: eventTop,
      }}
    >
      <Event event={event} height={eventHeight} />
    </View>
  );
};

export const Timetable = ({ date, blockHeight, setBlockHeight }) => {
  const [currentTimePosition, setCurrentTimePosition] = useState(null);

  const events = getEventsByDay(date);

  useEffect(() => {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    const currentPosition =
      currentHours * blockHeight + (currentMinutes / 60) * blockHeight;

    // Check if the provided date is today
    const isToday =
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();

    if (isToday) {
      setCurrentTimePosition(currentPosition);
    } else {
      setCurrentTimePosition(null);
    }
  }, [date, blockHeight]);

  return (
    <View className="w-full h-full">
      {[...Array(24)].map((_, index) => (
        <View
          key={index}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setBlockHeight(height);
          }}
          className="flex-column items-center justify-start w-full h-16"
        >
          <View className="flex-row items-start justify-between w-full h-4">
            <View className="w-1/6 flex-row items-center justify-start">
              <Text className="color-black">{`${index
                .toString()
                .padStart(2, "0")}:00`}</Text>
            </View>
            <View className="w-5/6 bg-lightGrey h-0.5 rounded-full" />
          </View>
        </View>
      ))}
      {currentTimePosition !== null && (
        <View
          className="absolute w-5/6 h-0.5 bg-primary rounded-full right-0 z-10"
          style={{ top: currentTimePosition }}
        />
      )}
      <View className="absolute right-0 w-5/6 h-full">
        {events.map((event, index) => {
          return (
            <EventWrapper key={index} event={event} blockHeight={blockHeight} />
          );
        })}
      </View>
    </View>
  );
};
