import { FormControlLabel, FormGroup, useTheme } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../../core/providers/customThemeProvider";
import { MaterialUISwitch } from "./styled";

const ThemeButton = () => {
  const theme = useTheme();

  const changeMode = useContext(ThemeContext);

  return (
    <FormGroup>
      <FormControlLabel
        control={<MaterialUISwitch />}
        label={theme.palette.mode === "dark" ? "" : ""}
        checked={theme.palette.mode === "dark"}
        onClick={() => changeMode.toggleColorMode()}
      />
    </FormGroup>
  );
};

export default ThemeButton;
