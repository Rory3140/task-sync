import { useRef } from "react";
import { StyleSheet, View, Button } from "react-native";
import { AddEventModal } from "../components/AddEventModal";

export default function TabOneScreen() {
  const bottomSheetRef = useRef(null);
  const handlePresentModalPress = () => bottomSheetRef.current?.present();

  return (
    <View style={styles.container}>
      <AddEventModal ref={bottomSheetRef} date={new Date()} />
      <Button title="Present Modal" onPress={handlePresentModalPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    // flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    color: "#fff",
  },
  input: {
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    color: "#fff",
  },
});
