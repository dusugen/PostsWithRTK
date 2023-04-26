import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Post from "../../components/simple/Post";
import ErrorPage from "../../components/simple/errorPage";
import Loader from "../../components/simple/loader";
import CommentsList from "../../components/smart/CommentsList";
import { PageHeader } from "../../components/ui/PageHeader";
import {
  fetchPostById,
  selectPostById,
} from "../../core/store/slices/postSlice";
import { useThunkDispatch } from "../../core/store/store";
import { StatusOfRequestEnum } from "../../core/types/enums/statusOfRequestEnum";
import { PostPageWrapper } from "./styled";

const PostPage = React.memo(() => {
  const { id } = useParams();

  const dispatch = useThunkDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(Number(id)));
    }
  }, [dispatch, id]);

  const { post, status, error } = useSelector(selectPostById);

  return (
    <PostPageWrapper maxWidth="md">
      <PageHeader display="flex" justifyContent="space-between" variant="h2">
        Post #{id}
        <Link to="/">
          <Button variant="outlined">back</Button>
        </Link>
      </PageHeader>
      {status === StatusOfRequestEnum.LOADING && <Loader />}
      {status === StatusOfRequestEnum.ERROR && <ErrorPage error={error} />}
      {status === StatusOfRequestEnum.SUCCESS && post && (
        <>
          <Post post={post} />
          <CommentsList post={post} id={Number(id)} />
        </>
      )}
    </PostPageWrapper>
  );
});

export default PostPage;
