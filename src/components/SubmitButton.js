import React, { useContext } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

export const SubmitButton = ({ label, onPress }) => {
  const { isLoading } = useContext(AuthContext);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading}
      onPress={onPress}
      className="bg-primary p-4 rounded-lg m-2 w-full h-14 justify-center items-center"
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text className="text-center text-md font-bold text-white">
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
