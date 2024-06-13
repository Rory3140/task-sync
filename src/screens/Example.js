import { useRef } from "react";
import { StyleSheet, View, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { colors } from "../utils/colors";


export default function TabOneScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <BouncyCheckbox
        size={25}
        fillColor={colors.primary}
        unFillColor={colors.white}
        text="Custom Checkbox"
        iconStyle={{ borderColor: colors.primary }}
        isChecked={true}
        onPress={(isChecked) => {
          console.log(isChecked);
        }}
      />
    </View>
  );
}
