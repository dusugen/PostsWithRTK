import { Box, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import { CustomizeCommentsAvatar, CustomizedItem, ItemProps } from "./styled";
import { Comment } from "../../../core/types/comment";

type CommentsItemProps = {
  item: Comment;
} & ItemProps;

const CommentsItem: React.FC<CommentsItemProps> = ({
  highlightBorder,
  item,
}) => {
  return (
    <CustomizedItem highlightBorder={highlightBorder}>
      <ListItemAvatar>
        <CustomizeCommentsAvatar>
          {item.name[0].toUpperCase()}
        </CustomizeCommentsAvatar>
      </ListItemAvatar>
      <ListItemText
        primary={`email : ${item.email}`}
        secondary={
          <>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body1"
              color="text.primary"
            >
              Name : {item.name}
            </Typography>
            {item.body}
          </>
        }
      />
    </CustomizedItem>
  );
};

export default CommentsItem;
