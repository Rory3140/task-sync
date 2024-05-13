import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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

  const login = (email, password, setPassword) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserToken(userCredential.user.uid);
        AsyncStorage.setItem("userToken", userCredential.user.uid);
        // get user data from firestore

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
          case "auth/network-request-failed":
            error.message = "Network error";
            break;
          default:
            break;
        }
        alert(error.message);
        setPassword("");
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

  const signup = (
    email,
    displayName,
    password,
    setPassword,
    setConfirmPassword
  ) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserToken(userCredential.user.uid);
        AsyncStorage.setItem("userToken", userCredential.user.uid);
        // add user data to firestore

        setIsLoading(false);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            error.message = "Email already in use";
            break;
          case "auth/invalid-email":
            error.message = "Invalid email address";
            break;
          case "auth/weak-password":
            error.message = "Password is too weak";
            break;
          case "auth/internal-error":
            error.message = "Internal error";
            break;
          case "auth/network-request-failed":
            error.message = "Network error";
            break;
          default:
            break;
        }
        alert(error.message);
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
