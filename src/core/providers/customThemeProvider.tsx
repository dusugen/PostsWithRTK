import { GlobalStyles, ThemeProvider } from "@mui/material";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { darkTheme } from "../themes/darkTheme";
import { lightTheme } from "../themes/lightTheme";
import { Theme, getTheme } from "../utils/getTheme";

export const ThemeContext = createContext({ toggleColorMode: () => {} });

export const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const currentTheme = getTheme();

  const [mode, setMode] = useState<Theme>(currentTheme);
  const theme = mode === "light" ? lightTheme : darkTheme;
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    setMode(currentTheme);
  }, []); // 1st render take from LS

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]); // set to LSч

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
        />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
