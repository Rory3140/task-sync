import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export const InputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
  style,
  returnKeyType,
}) => {
  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 30,
        },
      ]}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          value={value}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
