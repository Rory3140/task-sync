import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { RefContext } from "../context/RefContext";
import { AuthContext } from "../context/AuthContext";
import { colors } from "../utils/colors";
import { getCategory } from "../utils/functions";

export const Event = ({ event, height }) => {
  const { eventDetailsRef, addEventRef } = useContext(RefContext);
  const { updateCompleted } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (event.category === "toDoItem") {
      setIsChecked(event.isCompleted);
    }
  }, [event]);

  if (height == null) {
    if (event.category === "event") {
      height = 60;
    } else {
      height = 30;
    }
  }

  const adjustedCategory = getCategory(event);

  function handlePress() {
    addEventRef.current?.close();
    eventDetailsRef.current?.expand(event);
  }

  function handleChecked() {
    setIsChecked(!isChecked);
    updateCompleted(event, !isChecked);
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
        <>
          {event.category === "allDayEvent" ? (
            <View className="flex justify-center align-center p-1 w-3/4">
              <View className="flex-row items-center justify-start w-full">
                <Text
                  className="text-sm font-thick mr-2"
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
          ) : (
            <View className="flex justify-center align-center w-3/4">
                <View className="flex-row items-center justify-start w-3/4 overflow-hidden">
                  <BouncyCheckbox
                    size={25}
                    style={{ padding: 5 }}
                    fillColor={colors.primary}
                    unFillColor={event.color}
                    text={event.title}
                    iconStyle={{
                      borderColor: colors.primary,
                      width: 20,
                      height: 20,
                    }}
                    innerIconStyle={{ width: 20, height: 20 }}
                    textStyle={{ color: colors.black }}
                    ellipsizeMode="tail"
                    isChecked={isChecked}
                    onPress={handleChecked}
                  />
                </View>
            </View>
          )}
        </>
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
