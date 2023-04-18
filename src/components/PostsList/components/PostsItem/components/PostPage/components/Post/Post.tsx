import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

interface PostProps {
  id: number;
  title: string;
  body: string;
}

const Post: React.FC<PostProps> = ({ id, title, body }) => {
  return (
    <Box
      display="flex"
      padding="20px"
      marginBottom="50px"
      border="1px solid #6f6b6b"
      borderRadius="10px"
      boxShadow="-12px -12px 8px 0px rgba(34, 60, 80, 0.2)"
    >
      <Avatar
        sx={{ bgcolor: "blue", width: "100px", height: "100px", mr: "20px" }}
        aria-label="id"
      >
        {id}
      </Avatar>
      <Box>
        <Typography variant="h4" component="div" mb="15px">
          {title}
        </Typography>
        <Typography variant="h5" component="span" color="text.secondary">
          {body}
        </Typography>
      </Box>
    </Box>
  );
};

export default Post;
