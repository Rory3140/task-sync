import React, { useContext, useState } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { SubmitButton } from "../components/SubmitButton";
import { InputField } from "../components/InputField";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center bg-white"
      behavior="padding"
    >
      <View className="px-10 justify-center items-center">
        <Text className="text-3xl font-thick color-black mb-6">Register</Text>

        <InputField
          label={"Email"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color={colors.darkGrey}
              style={{ marginRight: 5 }}
            />
          }
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          returnKeyType="done"
        />

        <InputField
          label={"Name"}
          icon={
            <MaterialIcons
              name="person-outline"
              size={20}
              color={colors.darkGrey}
              style={{ marginRight: 5 }}
            />
          }
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
          keyboardType="default"
          returnKeyType="done"
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.darkGrey}
              style={{ marginRight: 5 }}
            />
          }
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputType="password"
          returnKeyType="done"
        />

        <InputField
          label={"Confirm Password"}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.darkGrey}
              style={{ marginRight: 5 }}
            />
          }
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          inputType="password"
          returnKeyType="done"
        />

        <SubmitButton
          label={"Sign Up"}
          onPress={() => {
            if (password !== confirmPassword) {
              alert("Passwords do not match");
              setPassword("");
              setConfirmPassword("");
              return;
            } else {
              signup(
                email,
                displayName,
                password,
                setPassword,
                setConfirmPassword
              );
            }
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
