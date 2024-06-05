import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { AuthContext } from "../context/AuthContext";

export const EventDetails = ({ route }) => {
  const { event } = route.params;

  const { deleteEvent } = useContext(AuthContext);

  return (
    <View className="flex justify-center align-center p-4 w-full">
      <View className="flex justify-center align-center p-4 bg-white rounded-lg shadow-lg w-full">
        <Text className="text-xl font-bold">{event.title}</Text>
        <Text className="text-lg">{event.location}</Text>
        <View className="w-full bg-lightGrey h-0.5 rounded-full my-2" />
        <Text className="text-sm">
          from{" "}
          {new Date(event.startDateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          {new Date(event.startDateTime).toDateString()}
        </Text>
        <Text className="text-sm">
          to{" "}
          {new Date(event.endDateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          {new Date(event.endDateTime).toDateString()}
        </Text>
      </View>
      <View className="flex-row justify-around w-full mt-4">
        <TouchableOpacity>
          <Text className="text-lg font-bold color-primary">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteEvent(event.id)}>
          <Text className="text-lg font-bold color-primary">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
