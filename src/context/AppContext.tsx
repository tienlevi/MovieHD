import { createContext, useState, useEffect } from "react";

interface Context {
  toggleDarkLight: string;
  toggleTheme: () => void;
}

export const AppProvider = createContext({} as Context);

function AppContext({ children }: any) {
  const [toggleDarkLight, setToggleDarkLight] = useState<string>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setToggleDarkLight(storedTheme);
    }
    if (storedTheme === "light") {
      document.body.classList.add("theme-mode");
    }
    document.body.style.backgroundColor =
      storedTheme === "dark" ? "black" : "white";
  }, []);

  const toggleTheme = () => {
    const name = toggleDarkLight === "dark" ? "light" : "dark";
    localStorage.setItem("theme", name);
    setToggleDarkLight(name);
    document.body.style.backgroundColor = name === "dark" ? "black" : "white";
    document.body.classList.toggle("theme-mode");
  };

  return (
    <AppProvider.Provider value={{ toggleDarkLight, toggleTheme }}>
      {children}
    </AppProvider.Provider>
  );
}

export default AppContext;
