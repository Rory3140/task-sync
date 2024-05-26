import React from "react";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "react-native";

import { AuthProvider } from "./src/context/AuthContext";
import { AppNav } from "./src/navigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <MenuProvider>
            <StatusBar barStyle="dark-content" />
            <AppNav />
          </MenuProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
