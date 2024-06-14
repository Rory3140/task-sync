import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "../utils/colors";

export const Onboarding = ({ navigation }) => {
  return <View className="flex-1 justify-center bg-white">
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl font-bold text-center text-gray-800">Welcome to the App</Text>
    </View>
    <View className="flex-1 justify-center items-center">
      <MaterialIcons name="insert-emoticon" size={100} color={colors.primary} />
    </View>
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        className="bg-primary px-10 py-2 rounded-full"
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-white text-lg font-bold">Get Started</Text>
      </TouchableOpacity>
    </View>
  </View>;
};
