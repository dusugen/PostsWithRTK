import { Typography, styled } from "@mui/material";

export const PageHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textAlign: "center",
  margin: "30px 0",
  color: theme.palette.primary.dark,
}));
