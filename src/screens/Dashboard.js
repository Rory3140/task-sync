import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { SubmitButton } from "../components/SubmitButton";
import { AuthContext } from "../context/AuthContext";

export const Dashboard = () => {
  const { userToken, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text className="text-2xl font-bold text-center">Dashboard</Text>
      <Text className="text-center">User Token: {userToken}</Text>
      <SubmitButton label={"Logout"} onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
