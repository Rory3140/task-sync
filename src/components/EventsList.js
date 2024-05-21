import React from "react";
import { View } from "react-native";

import { Event } from "../components/Event";

import { getEvents } from "../utils/functions";

export const EventsList = ({ date, selectedOption }) => {
  const events = getEvents(date, selectedOption);

  return (
    <View>
      {events.map((event, index) => {
        return <Event key={index} event={event} />;
      })}
    </View>
  );
};
