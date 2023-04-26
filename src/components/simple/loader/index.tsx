import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="300px"
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default Loader;
