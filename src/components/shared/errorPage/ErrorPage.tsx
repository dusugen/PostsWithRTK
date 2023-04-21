import { Box, Typography } from "@mui/material";
import React from "react";

interface ErrorProps {
  error: string | null;
}

const ErrorPage: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "100px",
        maxWidth: "750px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h2">
        <Typography fontSize="100px">😕</Typography>
        <br />
        {error}
      </Typography>
    </Box>
  );
};

export default ErrorPage;
