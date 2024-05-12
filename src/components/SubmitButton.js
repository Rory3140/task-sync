import React, { useContext } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

export const SubmitButton = ({ label, onPress }) => {
  const { isLoading } = useContext(AuthContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary p-4 rounded-lg m-2 w-95"
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text
          style={[
            {
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: colors.white,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
