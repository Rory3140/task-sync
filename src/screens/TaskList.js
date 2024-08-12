import React, { useState, useRef, useEffect, useContext } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import { Event } from "../components/Event";
import { colors } from "../utils/colors";
import { getAllTasksByDate } from "../utils/functions";

export const TaskList = ({ navigation }) => {
  const scrollViewRef = useRef(null);

  const tasksByDay = getAllTasksByDate();

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [tasksByDay]);

  return (
    <SafeAreaView className="flex-1 bg-offwhite">
      <ScrollView className="bg-offWhite p-4 flex-1 w-full" ref={scrollViewRef}>
        <View>
          {tasksByDay.map((tasksOnDay, dayIndex) => {
            if (tasksOnDay.length === 0) {
              return null;
            }

            return (
              <View key={dayIndex}>
                <View>
                  <Text className="text-center font-bold text-lg mt-4 ">
                    {new Date(tasksOnDay.date).toDateString()}
                  </Text>
                  <View className="w-full bg-lightGrey h-0.5 rounded-full mb-2" />
                </View>
                {tasksOnDay.tasks.map((event, eventIndex) => (
                  <Event
                    key={eventIndex}
                    event={event}
                    navigation={navigation}
                  />
                ))}
              </View>
            );
          })}
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};
