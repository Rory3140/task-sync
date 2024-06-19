import React from "react";
import { View, ActivityIndicator, Image } from "react-native";

import { colors } from "../utils/colors";

export const InitialLoading = () => {
  return (
    <View className="flex justify-center items-center h-full bg-white">
      <View className="flex items-center justify-center p-4">
        <Image
          source={require("../../assets/logo/logo-reversed.png")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );

};