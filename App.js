import React from "react";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "react-native";

import { AuthProvider } from "./src/context/AuthContext";
import { DateProvider } from "./src/context/DateContext";
import { RefProvider } from "./src/context/RefContext";
import { AppNav } from "./src/navigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <DateProvider>
        <RefProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <StatusBar barStyle="dark-content" />
              <AppNav />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </RefProvider>
      </DateProvider>
    </AuthProvider>
  );
}
