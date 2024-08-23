import React, { useState } from "react";

interface ThemeContextData {
  theme: string;
  toggleTheme: (newTheme: string) => void;
}

export const ThemeContext = React.createContext<ThemeContextData>({
  theme: "light",
  toggleTheme: () => {},
});

export interface IThemeProviderProps {
  children: React.ReactNode;
}

// Create a ThemeProvider component to provide the context value to child components
export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const lsTheme = localStorage.getItem("theme");

  const [theme, setTheme] = useState(lsTheme || "light");

  // Function to toggle the theme between light and dark
  const toggleTheme = (newTheme: string) => {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme == "light" ? "lightTheme" : "darkTheme"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
