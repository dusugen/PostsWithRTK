import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface PostsItemProps {
  id: number;
  title: string;
  body: string;
}

const PostsItem: React.FC<PostsItemProps> = ({ id, title, body }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 345, height: 200, mb: "20px" }}>
      <Link to={`/${id}`}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "blue" }} aria-label="id">
              {id}
            </Avatar>
          }
          title={title}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostsItem;
