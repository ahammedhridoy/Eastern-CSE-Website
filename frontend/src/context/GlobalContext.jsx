"use client";

const { createContext } = require("react");

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
