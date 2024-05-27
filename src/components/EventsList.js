import React from "react";
import { View } from "react-native";

import { Event } from "../components/Event";

import { getEventsByMonth } from "../utils/functions";

export const EventsList = ({ date }) => {
  const events = getEventsByMonth(date);

  return (
    <View>
      {events.map((event, index) => {
        return <Event key={index} event={event} />;
      })}
    </View>
  );
};
