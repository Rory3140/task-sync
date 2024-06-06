import React, { createContext, useRef } from "react";

export const RefContext = createContext();

export const RefProvider = ({ children }) => {
  const eventDetailsRef = useRef(null);

  return (
    <RefContext.Provider value={{ eventDetailsRef }}>
      {children}
    </RefContext.Provider>
  );
};
