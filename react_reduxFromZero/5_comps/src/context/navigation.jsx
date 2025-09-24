import { createContext, useEffect, useState } from "react";

const navigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // To cause application to rerender when user clicks back and forward buttons
  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  return (
    <navigationContext.Provider value={{ navigate, currentPath }}>
      {children}
    </navigationContext.Provider>
  );
};

export default navigationContext;
