import { Avatar, Card, styled } from "@mui/material";

export const CustomizedPostCard = styled(Card)({
  height: "200px",
});

export const CustomizePostsAvatar = styled(Avatar)(({ theme }) => ({
  width: "50px",
  height: "50px",
  backgroundColor: theme.palette.secondary.main,
  textDecoration: "none",
}));
