import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import ThemeButton from "../../ui/ThemeButton";
import React from "react";

const Header = React.memo(() => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
              Posts
            </Typography>
            <ThemeButton />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
});

export default Header;
