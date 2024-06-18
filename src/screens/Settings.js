import React, { useContext } from "react";
import { Text, View } from "react-native";

import { SubmitButton } from "../components/SubmitButton";
import { AuthContext } from "../context/AuthContext";

export const Settings = () => {
  const { userToken, logout } = useContext(AuthContext);

  return (
    <View className="bg-offwhite p-4 h-full flex justify-center items-center">
      <SubmitButton label={"Logout"} onPress={logout} />
    </View>
  );
};
