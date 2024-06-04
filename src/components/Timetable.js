import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import { Event } from "../components/Event";

import { getEventsByDay } from "../utils/functions";
import { colors } from "../utils/colors";

function groupOverlappingEvents(events) {
  const groups = [];

  events.forEach((event) => {
    let added = false;
    for (let group of groups) {
      if (group.some((e) => checkOverlap(e, event))) {
        group.push(event);
        added = true;
        break;
      }
    }
    if (!added) {
      groups.push([event]);
    }
  });

  return groups;
}

function checkOverlap(event1, event2) {
  const start1 = new Date(event1.startDateTime);
  const end1 = new Date(event1.endDateTime);
  const start2 = new Date(event2.startDateTime);
  const end2 = new Date(event2.endDateTime);
  return start1 < end2 && start2 < end1;
}

const EventWrapper = ({ event, blockHeight, width, left }) => {
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
      className="absolute opacity-80"
      style={{
        top: eventTop,
        height: eventHeight,
        width: `${width}%`,
        left: `${left}%`,
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

  const groups = groupOverlappingEvents(events);

  const adjustedEvents = groups.flatMap((group) => {
    const numberOfColumns = group.length;
    return group.map((event, index) => {
      const column = index % numberOfColumns;
      const columnWidth = 100 / numberOfColumns;
      const leftPosition = column * columnWidth;

      return {
        ...event,
        width: columnWidth,
        left: leftPosition,
      };
    });
  });

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
        {adjustedEvents.map((event, index) => (
          <EventWrapper
            key={index}
            event={event}
            blockHeight={blockHeight}
            width={event.width}
            left={event.left}
          />
        ))}
      </View>
    </View>
  );
};