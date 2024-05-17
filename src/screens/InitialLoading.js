import React from "react";
import { View, ActivityIndicator } from "react-native";

import { colors } from "../utils/colors";

export const InitialLoading = () => {
  return (
    <View className="flex justify-center items-center h-full bg-offwhite">
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );

};