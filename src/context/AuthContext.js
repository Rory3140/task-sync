import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "../../firebase.config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const usersRef = collection(db, "users");

  // Fetch the data from AsyncStorage when the app starts
  useEffect(() => {
    setInitializing(true);
    AsyncStorage.getItem("userToken")
      .then((token) => {
        if (!token) {
          setInitializing(false);
          return;
        }

        setUserToken(token);
        getDoc(doc(usersRef, token))
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data());
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      })
      .then(() => {
        setTimeout(() => {
          setInitializing(false);
        }, 1000);
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
          dates: [],
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
          dates: [],
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

  const addEvent = (date, event) => {
    const newDate = {
      date: date.toISOString(),
      event: event,
    };

    setUserData({
      ...userData,
      dates: [...userData.dates, newDate],
    });
    AsyncStorage.setItem("userData", JSON.stringify(userData));

    // Update user data in firestore
    updateDoc(doc(usersRef, userToken), {
      dates: [...userData.dates, newDate],
    })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userData,
        isLoading,
        initializing,
        login,
        logout,
        signup,
        addEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
