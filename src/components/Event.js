import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { RefContext } from "../context/RefContext";

import { getCategory } from "../utils/functions";

export const Event = ({ event, height }) => {
  const { eventDetailsRef } = useContext(RefContext);

  if (height == null) {
    if (event.category === "event") {
      height = 60;
    } else {
      height = 40;
    }
  }

  const adjustedCategory = getCategory(event);

  function handlePress() {
    eventDetailsRef.current?.expand(event);
  }

  return (
    <TouchableOpacity
      className="flex flex-row justify-between align-center w-full px-2 mb-2 rounded-lg border-l-4 border-solid flex-wrap overflow-hidden"
      style={{
        height: height,
        backgroundColor: event.color,
      }}
      onPress={handlePress}
    >
      {event.category === "event" ? (
        <View className="flex justify-start align-center p-1 w-3/4">
          <Text
            className="text-xl font-thick"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {event.title}
          </Text>
          <Text
            className="text-sm font-thin"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {event.location}
          </Text>
        </View>
      ) : (
        <View className="flex justify-start align-center p-1 w-3/4">
          <View className="flex-row items-center justify-start w-full">
            <Text
              className="text-xl font-thick mr-2"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {event.title}
            </Text>
            <Text
              className="text-sm font-thin"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {event.location}
            </Text>
          </View>
        </View>
      )}
      <View className="flex justify-start align-center py-1">
        {event.category === "event" ? (
          <>
            <Text className="text-sm ">
              {new Date(event.startDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Text className="text-sm">
              {new Date(event.endDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </>
        ) : (
          <Text className="text-sm">{adjustedCategory}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
