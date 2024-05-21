import React from "react";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";
import { StatusBar } from "react-native";

import { AuthProvider } from "./src/context/AuthContext";
import { AppNav } from "./src/navigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <StatusBar barStyle="dark-content" />
        <AppNav />
      </MenuProvider>
    </AuthProvider>
  );
}
