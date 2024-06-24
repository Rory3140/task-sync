import React, { createContext, useState } from "react";

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [listView, setListView] = useState(true);

  return (
    <DateContext.Provider value={{ date, setDate, listView, setListView }}>
      {children}
    </DateContext.Provider>
  );
};
