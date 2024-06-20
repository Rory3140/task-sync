import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SvgXml } from "react-native-svg";

import OnboardingBackground from "../../assets/backgrounds/OnboardingBackground.js";
import { colors } from "../utils/colors";

export const Onboarding = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
      <View
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "50%", 
          bottom: 0,
        }}
      >
        <SvgXml xml={OnboardingBackground} width="100%" height="100%" />
      </View>
      <View className="flex-1 justify-center">
        <View className="flex-1 justify-center items-center">
          <Image
            className="w-64 h-64"
            source={require("../../assets/logo/logo-reversed.png")}
          />
        </View>
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            className="flex justify-center items-center bg-secondary px-10 py-2 rounded-full mb-4 w-64"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-primary text-lg font-bold">
              Login or Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex justify-center items-center bg-secondary px-10 py-2 rounded-full mb-4 w-64"
            onPress={() => console.log("Guest")}
          >
            <Text className="text-primary text-lg font-bold">
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
