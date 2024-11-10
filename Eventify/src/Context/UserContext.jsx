import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};
