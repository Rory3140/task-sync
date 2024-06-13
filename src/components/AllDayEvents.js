import React, { useState, useContext } from "react";
import { ScrollView, View } from "react-native";

import { DateContext } from "../context/DateContext";
import { Event } from "../components/Event";
import { colors } from "../utils/colors";
import { getAllDayEventsByDay } from "../utils/functions";

export const AllDayEvents = ({}) => {
  const { date } = useContext(DateContext);
  const allDayEvents = getAllDayEventsByDay(date);

  if (allDayEvents.length === 0) {
    return null;
  }

  return (
    <View className="bg-white border-b-0.5 border-lightGrey w-full max-h-24 pt-1">
      <ScrollView className="px-1">
        {allDayEvents.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </ScrollView>
    </View>
  );
};
