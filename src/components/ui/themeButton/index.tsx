import { FormControlLabel, FormGroup, useTheme } from "@mui/material";
import { FC, memo, useContext } from "react";
import { ThemeContext } from "../../../core/providers/customThemeProvider";
import { ThemeSwitch } from "./styled";

const ThemeButton:FC = () => {
  const theme = useTheme();

  const changeMode = useContext(ThemeContext);

  return (
    <FormGroup>
      <FormControlLabel
        control={<ThemeSwitch />}
        label={theme.palette.mode === "dark" ? "" : ""}
        checked={theme.palette.mode === "dark"}
        onClick={() => changeMode.toggleColorMode()}
      />
    </FormGroup>
  );
};
export default memo(ThemeButton);
