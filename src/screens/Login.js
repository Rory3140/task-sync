import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Login
        </Text>

        <InputField
          label={"Email"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          returnKeyType="done"
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputType="password"
          returnKeyType="done"
        />

        <Button
          label={"Login"}
          onPress={() => {
            login(email, password, setPassword);
          }}
        />

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: colors.primary, fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </KeyboardAvoidingView>
  );
};
