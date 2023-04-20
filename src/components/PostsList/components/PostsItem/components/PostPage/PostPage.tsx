import { Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchComments,
  selectEditedComment,
} from "../../../../../../redux/slices/commentSlice";
import {
  fetchPostById,
  selectPostById,
} from "../../../../../../redux/slices/postSlice";
import { useThunkDispatch } from "../../../../../../redux/store";
import { StatusOfRequestEnum } from "../../../../../../types/enums/statusOfRequestEnum";
import CommentsList from "./components/Comments/ComentsList";
import Post from "./components/Post/Post";

const PostPage = () => {
  const { id } = useParams();

  const dispatch = useThunkDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(Number(id)));
      dispatch(fetchComments(Number(id)));
    }
  }, [dispatch, id]);

  const { post, status, error } = useSelector(selectPostById);
  const editedComment = useSelector(selectEditedComment);

  return (
    <Container maxWidth="md" sx={{ paddingBottom: "100px" }}>
      <Typography
        variant="h2"
        fontWeight="500"
        textAlign="center"
        margin="30px 0"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        Post #{id}
        <Link to="/">
          <Button variant="outlined">back</Button>
        </Link>
      </Typography>
      {status === StatusOfRequestEnum.SUCCESS && post && <Post post={post} />}

      <CommentsList post={post} />
    </Container>
  );
};

export default PostPage;
