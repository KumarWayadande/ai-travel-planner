import { Children, createContext, useState } from "react";

export const userContext = createContext({
  checkIsLoggedIn: () => {},
  setUserLoggedIn: (value) => {},
  isLoggedIn: false,
});

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );

  const checkIsLoggedIn = () => {
    const userData = localStorage.getItem("user");
    if (userData) return true;
    else return false;
  };

  const setUserLoggedIn = (value) => {
    setIsLoggedIn(value);
  };

  const userContextValue = {
    isLoggedIn,
    setUserLoggedIn,
    checkIsLoggedIn,
  };

  return (
    <userContext.Provider value={userContextValue}>
      {children}
    </userContext.Provider>
  );
}
