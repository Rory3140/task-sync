import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setUserToken("secret-token");
    }, 1000);
  };

  const logout = () => {
    setUserToken(null);
  }

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
