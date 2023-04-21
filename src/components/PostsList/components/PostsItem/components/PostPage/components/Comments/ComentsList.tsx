import { Box, List } from "@mui/material";
import { useSelector } from "react-redux";
import {
  addComment,
  fetchComments,
  selectComments,
  selectEditedComment,
  selectPostComment,
} from "../../../../../../../../redux/slices/commentSlice";
import { Comment } from "../../../../../../../../types/comment";
import CommentForm from "./components/CommentForm/CommentForm";
import CommentsItem from "./components/CommentsItem/CommentsItem";
import { PostData } from "../../../../../../../../types/post";
import Skeleton from "../../../../../../../shared/skeleton/Skeleton";
import { StatusOfRequestEnum } from "../../../../../../../../types/enums/statusOfRequestEnum";
import { useEffect } from "react";
import { useThunkDispatch } from "../../../../../../../../redux/store";
import ErrorPage from "../../../../../../../shared/errorPage/ErrorPage";

interface CommentListProps {
  post: PostData | null;
  id: number | undefined;
}

const CommentsList: React.FC<CommentListProps> = ({ post, id }) => {
  const dispatch = useThunkDispatch();
  useEffect(() => {
    const promise = dispatch(fetchComments(Number(id)));
    return () => promise.abort();
  }, [dispatch]);

  const editedComment = useSelector(selectEditedComment);
  const { data, status, error } = useSelector(selectComments);

  const { status: postCommentStatus, error: postCommentError } =
    useSelector(selectPostComment);

  console.log(postCommentStatus, "status");

  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {status === StatusOfRequestEnum.LOADING && <Skeleton />}
        {status === StatusOfRequestEnum.ERROR && <ErrorPage error={error} />}
        {status === StatusOfRequestEnum.SUCCESS &&
          data &&
          data.map((item: Comment) => (
            <CommentsItem key={item.id} styled={false} {...item} />
          ))}
        {editedComment && <CommentsItem {...editedComment} styled={true} />}
      </List>
      {postCommentStatus !== StatusOfRequestEnum.SUCCESS &&
        status !== StatusOfRequestEnum.ERROR && (
          <CommentForm
            id={post?.id}
            idDisabled={postCommentStatus === StatusOfRequestEnum.LOADING}
            status={postCommentStatus}
            error={postCommentError}
          />
        )}
    </Box>
  );
};

export default CommentsList;
