// createContext
import { createContext } from "react";

// create teh context
export const AppContext = createContext();

// wrapper : global states, provider, value
export const AppContextWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
