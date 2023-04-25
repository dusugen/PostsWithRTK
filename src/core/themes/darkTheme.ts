import { ThemeOptions, createTheme } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#07fdd9",
    },
    secondary: {
      main: "#ff8f03",
    },
    info: {
      main: "#0288d1",
    },
  },
};

export const darkTheme = createTheme(themeOptions);
