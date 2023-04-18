import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchPostById,
  selectPostById,
} from "../../../../../../redux/slices/postSlice";
import { useThunkDispatch } from "../../../../../../redux/store";
import Post from "./components/Post/Post";
import Comments from "./components/Comments/Coments";

const PostPage = () => {
  const { id } = useParams();

  const dispatch = useThunkDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(Number(id)));
    }
  }, []);

  const post = useSelector(selectPostById);

  return (
    <Container maxWidth="md">
      <Typography variant="h2" textAlign="center" margin="30px 0">
        Post #{post?.id}
      </Typography>
      {post && <Post id={post?.id} title={post?.title} body={post?.body} />}
      <Comments />
    </Container>
  );
};

export default PostPage;
