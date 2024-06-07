import React, { createContext, useRef } from "react";

export const RefContext = createContext();

export const RefProvider = ({ children }) => {
  const eventDetailsRef = useRef(null);
    const addEventRef = useRef(null);

  return (
    <RefContext.Provider value={{ eventDetailsRef, addEventRef }}>
      {children}
    </RefContext.Provider>
  );
};
