import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { PostData } from "../../../../../../../../types/post";

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
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
        {post.id}
      </Avatar>
      <Box>
        <Typography variant="h4" component="div" mb="15px">
          {post.title}
        </Typography>
        <Typography variant="h5" component="span" color="text.secondary">
          {post.body}
        </Typography>
      </Box>
    </Box>
  );
};

export default Post;
