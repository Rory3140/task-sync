import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../../firebase.config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const usersRef = collection(db, "users");

  // Fetch the data from AsyncStorage when the app starts
  useEffect(() => {
    AsyncStorage.getItem("userToken").then((token) => {
      setUserToken(token);
    });
    AsyncStorage.getItem("userData").then((data) => {
      setUserData(JSON.parse(data));
    });
  }, []);

  const login = (email, password, setPassword) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserToken(userCredential.user.uid);
        AsyncStorage.setItem("userToken", userCredential.user.uid);

        // Get user data from firestore
        getDoc(doc(usersRef, userCredential.user.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data());
              AsyncStorage.setItem("userData", JSON.stringify(docSnap.data()));
            }
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("Error getting document:", error);
            setIsLoading(false);
          });
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
      AsyncStorage.removeItem("userData");
      setUserData(null);

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

        // Add user data to firestore
        setDoc(doc(usersRef, userCredential.user.uid), {
          email: email,
          displayName: displayName,
        })
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            setIsLoading(false);
          });
        // Set user data locally
        setUserData({
          email: email,
          displayName: displayName,
        });
        AsyncStorage.setItem("userData", JSON.stringify(userData));
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
        userData,
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
