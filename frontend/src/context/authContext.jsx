"use client";
import Cookies from "js-cookie";

const { createContext } = require("react");

export const authContext = createContext();

export const authContextProvider = ({ children }) => {
  const user = Cookies.get("user");
  console.log(user);

  return (
    <authContext.Provider value={{ user }}>{children}</authContext.Provider>
  );
};
