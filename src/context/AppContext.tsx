import { createContext, useState, useEffect } from "react";

interface Context {
  theme: string;
  toggleTheme: () => void;
}

export const AppProvider = createContext({} as Context);

function AppContext({ children }: any) {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
    if (storedTheme === "light") {
      document.body.classList.add("theme-mode");
    }
    document.body.style.backgroundColor =
      storedTheme === "dark" ? "black" : "white";
  }, []);

  const toggleTheme = () => {
    const name = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", name);
    setTheme(name);
    document.body.style.backgroundColor = name === "dark" ? "black" : "white";
    document.body.classList.toggle("theme-mode");
  };

  return (
    <AppProvider.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppProvider.Provider>
  );
}

export default AppContext;
