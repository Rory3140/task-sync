import React from "react";
import { StatusBar } from "react-native";

import { AuthProvider } from "./src/context/AuthContext";
import { AppNav } from "./src/navigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <AppNav />
    </AuthProvider>
  );
}
