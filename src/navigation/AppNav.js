import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { AuthContext } from "../context/AuthContext";

import { InitialLoading } from "../screens/InitialLoading";

export const AppNav = () => {
  const { userToken, userData, initializing } = useContext(AuthContext);

  if (initializing) {
    return <InitialLoading />;
  }

  return (
    <NavigationContainer>
      {userToken !== null && userData !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
