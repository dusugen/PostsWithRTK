import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { FC, memo } from "react";
import HeaderLogo from "../../ui/HeaderLogo";
import ThemeButton from "../../ui/themeButton";

const Header: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }} position="sticky" top="0">
      <AppBar position="static">
        <Container>
          <Toolbar sx={{ padding: "0 !important" }}>
            <HeaderLogo />
            <Typography
              variant="h2"
              component="div"
              sx={{ flexGrow: 1 }}
              fontWeight="500"
            >
              Posts App
            </Typography>
            <ThemeButton />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default memo(Header);
