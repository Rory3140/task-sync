import { StyleSheet, Text, View } from "react-native";

export const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text className="text-4xl text-blue-500">Hello, world!</Text>
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
