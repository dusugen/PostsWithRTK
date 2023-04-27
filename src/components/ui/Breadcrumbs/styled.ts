import { Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const CustomizedLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  fontSize: "20px",
});

export const CustomizedLastItem = styled(Typography)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.grey[500]}`,
  color: "inherit",
  fontSize: "20px",
  lineHeight: "inherit",
}));
