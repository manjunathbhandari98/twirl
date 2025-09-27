import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeMode = useSelector((state: RootState) => state.theme.themeMode);

  useEffect(() => {
    const root = document.documentElement;

    // remove both first
    root.classList.remove("light", "dark");

    // add the selected one
    root.classList.add(themeMode);
  }, [themeMode]);

  return <>{children}</>;
};

export default ThemeProvider;
