import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "300px",
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default Loader;
