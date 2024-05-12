import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase.config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  // Fetch the data from AsyncStorage when the app starts
  useEffect(() => {
    AsyncStorage.getItem("userToken").then((token) => {
      setUserToken(token);
    });
  }, []);

  const login = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserToken(userCredential.user.uid);
        AsyncStorage.setItem("userToken", userCredential.user.uid);
        setIsLoading(false);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-login-credentials":
            error.message = "Incorrect email or password";
            break;
          case "auth/invalid-email":
            error.message = "Invalid email address";
            break;
          case "auth/missing-password":
            error.message = "Incorrect password";
            break;
          case "auth/internal-error":
            error.message = "Internal error";
            break;
          default:
            break;
        }
        alert(error.message);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      AsyncStorage.removeItem("userToken");
      setUserToken(null);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
