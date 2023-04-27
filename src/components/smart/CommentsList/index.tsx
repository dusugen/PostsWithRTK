import { Box, Grow, List } from "@mui/material";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchComments,
  selectComments,
  selectEditedComment,
  selectPostComment,
} from "../../../core/store/slices/commentSlice";
import { useThunkDispatch } from "../../../core/store/store";
import { Comment } from "../../../core/types/comment";
import { StatusOfRequestEnum } from "../../../core/types/enums/statusOfRequestEnum";
import { PostData } from "../../../core/types/post";
import CommentsItem from "../../simple/CommentsItem";
import ErrorPage from "../../simple/errorPage";
import Skeleton from "../../simple/skeleton";
import CommentForm from "../CommentForm";

interface CommentListProps {
  post: PostData | null;
  id: number | undefined;
}

const CommentsList: React.FC<CommentListProps> = ({ post, id }) => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    const promise = dispatch(fetchComments(Number(id)));
    return () => promise.abort();
  }, [dispatch, id]);

  const editedComment = useSelector(selectEditedComment);
  const { data, status, error } = useSelector(selectComments);

  const { status: postCommentStatus, error: postCommentError } =
    useSelector(selectPostComment);

  const isFormVisible =
    postCommentStatus !== StatusOfRequestEnum.SUCCESS &&
    status !== StatusOfRequestEnum.ERROR &&
    !editedComment;

  return (
    <Grow in={!!data} unmountOnExit>
      <Box width="100%">
        <List sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {status === StatusOfRequestEnum.LOADING && <Skeleton />}
          {status === StatusOfRequestEnum.ERROR && <ErrorPage error={error} />}
          {status === StatusOfRequestEnum.SUCCESS &&
            data &&
            data.map((item: Comment) => (
              <CommentsItem key={item.id} highlightBorder={false} item={item} />
            ))}
          {editedComment && (
            <Grow
              unmountOnExit
              in={!!editedComment}
              style={{ transformOrigin: "0 0 0" }}
              {...(!!editedComment ? { timeout: 1500 } : {})}
            >
              <div>
                <CommentsItem item={editedComment} highlightBorder={true} />
              </div>
            </Grow>
          )}
        </List>
        <Grow
          mountOnEnter
          unmountOnExit
          in={isFormVisible}
          style={{ transformOrigin: "0 0 0" }}
          {...(isFormVisible ? { timeout: 100 } : {})}
        >
          <CommentForm
            id={post?.id}
            idDisabled={postCommentStatus === StatusOfRequestEnum.LOADING}
            status={postCommentStatus}
            error={postCommentError}
          />
        </Grow>
      </Box>
    </Grow>
  );
};

export default memo(CommentsList);
