import { Avatar, Box, ListItem, styled } from "@mui/material";

export type ItemProps = {
  highlightBorder: boolean;
};

export const CustomizedItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "highlightBorder",
})<ItemProps>(({ highlightBorder, theme }) => ({
  borderSize: highlightBorder ? "3px" : "1px",
  borderColor: highlightBorder
    ? theme.palette.success.main
    : theme.palette.grey[300],
  borderStyle: "solid",
  alignItems: "flex-start",
  borderRadius: "10px",
  marginBottom: "10px",
}));

export const CustomizeCommentsAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  maxWidth: "70px",
  maxHeight: "70px",
  marginRight: "20px",
}));
