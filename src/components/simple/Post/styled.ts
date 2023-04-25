import { Avatar, Box, styled } from "@mui/material";

export const PostWrapper = styled(Box)`
  display: flex;
  padding: 20px;
  margin-bottom: 50px;
  border: 1px solid #6f6b6b;
  border-radius: 10px;
  box-shadow: -12px -12px 8px 0px rgba(34, 60, 80, 0.2);
`;

export const PostAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: "100px",
  height: "100px",
  marginRight: "20px",
}));
