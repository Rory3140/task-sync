import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const Event = ({ event, height }) => {

    function handlePress() {
    }

  return (
    <TouchableOpacity
      className="flex flex-row justify-between align-center w-full p-2 mb-2 rounded-lg border-l-4 border-solid"
      style={{
        height: height || 60,
        backgroundColor: event.color,
      }}
      onPress={handlePress}
    >
      <View className="flex flex-col justify-start align-center p-1 w-3/4">
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
      <View className="flex justify-start align-center">
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
      </View>
    </TouchableOpacity>
  );
};
