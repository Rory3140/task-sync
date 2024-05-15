import React, { useState, useContext } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

export const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const { userData } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("day");

  function incrementDate() {
    if (selectedOption === "month") {
      setDate(new Date(date.setMonth(date.getMonth() + 1)));
    } else {
      setDate(new Date(date.setDate(date.getDate() + 1)));
    }
  }

  function decrementDate() {
    if (selectedOption === "month") {
      setDate(new Date(date.setMonth(date.getMonth() - 1)));
    } else {
      setDate(new Date(date.setDate(date.getDate() - 1)));
    }
  }

  return (
    <SafeAreaView>
      <View
        className="bg-white p-2 h-24 flex justify-between items-center"
        style={{ borderBottomWidth: 0.5, borderBottomColor: colors.lightGrey }}
      >
        <View className="flex items-center justify-centre w-full">
          <SwitchSelector
            options={[
              { label: "Day", value: "day" },
              { label: "Month", value: "month" },
            ]}
            initial={0}
            onPress={(value) => {
              setSelectedOption(value);
            }}
            buttonColor={colors.primary}
            backgroundColor={colors.lightGrey}
            borderColor={colors.lightGrey}
            hasPadding
          />
        </View>

        <View className="flex-row items-center justify-between w-full">
          <TouchableOpacity onPress={decrementDate}>
            <MaterialIcons
              name="keyboard-arrow-left"
              color={colors.primary}
              size={30}
            />
          </TouchableOpacity>
          <Text className="text-xl font-thick color-black">
            {(() => {
              switch (selectedOption) {
                case "day":
                  if (date.toDateString() === new Date().toDateString()) {
                    return "Today";
                  } else {
                    return date.toDateString();
                  }
                case "month":
                  return `${date.toLocaleString("default", {
                    month: "long",
                  })} ${date.getFullYear()}`;
                default:
                  return "";
              }
            })()}
          </Text>
          <TouchableOpacity onPress={incrementDate}>
            <MaterialIcons
              name="keyboard-arrow-right"
              color={colors.primary}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-offwhite p-4 flex justify-center items-center">
        
      </View>
    </SafeAreaView>
  );
};
