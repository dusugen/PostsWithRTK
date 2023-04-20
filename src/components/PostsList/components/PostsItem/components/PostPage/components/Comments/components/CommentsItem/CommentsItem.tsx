import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

interface CommentsItemProps {
  userId?: number;
  id: number;
  name: string;
  email: string;
  body: string;
  styled: boolean;
}

const CommentsItem: React.FC<CommentsItemProps> = ({
  styled,
  name,
  email,
  body,
}) => {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        border: `${styled ? 5 : 1}px solid ${styled ? "green" : "gray"}`,
        borderRadius: "10px",
        mb: "10px",
      }}
    >
      <ListItemAvatar>
        <Avatar
          alt="Remy Sharp"
          sx={{
            bgcolor: "darkcyan",
            width: "70px",
            height: "70px",
            mr: "20px",
          }}
        >
          {name[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`email : ${email}`}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "block" }}
              component="span"
              variant="body1"
              color="text.primary"
            >
              Name : {name}
            </Typography>
            {body}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default CommentsItem;
