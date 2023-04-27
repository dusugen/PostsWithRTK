import { CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { CustomizePostsAvatar, CustomizedPostCard } from "./styled";

interface PostsItemProps {
  id: number;
  title: string;
  body: string;
}

const PostsItem: FC<PostsItemProps> = memo(({ id, title, body }) => {
  const theme = useTheme();
  return (
    <CustomizedPostCard variant="outlined">
      <Link
        to={`/posts/${id}`}
        style={{ textDecoration: "none", color: theme.palette.text.primary }}
      >
        <CardHeader
          avatar={
            <CustomizePostsAvatar aria-label="id">{id}</CustomizePostsAvatar>
          }
          title={title}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
    </CustomizedPostCard>
  );
});

export default PostsItem;
