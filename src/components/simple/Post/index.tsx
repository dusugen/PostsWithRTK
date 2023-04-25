import { Box, Typography } from "@mui/material";
import React from "react";
import { PostData } from "../../../core/types/post";
import { PostAvatar, PostWrapper } from "./styled";

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <PostWrapper
      display="flex"
      padding="20px"
      marginBottom="50px"
      border="1px solid #6f6b6b"
      borderRadius="10px"
      boxShadow="-12px -12px 8px 0px rgba(34, 60, 80, 0.2)"
    >
      <PostAvatar>{post.id}</PostAvatar>
      <Box>
        <Typography variant="h4" component="div" mb="15px">
          {post.title}
        </Typography>
        <Typography variant="h5" component="span" color="text.secondary">
          {post.body}
        </Typography>
      </Box>
    </PostWrapper>
  );
};

export default Post;
