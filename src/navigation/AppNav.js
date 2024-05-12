import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { AuthContext } from "../context/AuthContext";

export const AppNav = () => {
  const { userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
