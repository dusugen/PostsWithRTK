import { Box, List } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectComments,
  selectEditedComment,
} from "../../../../../../../../redux/slices/commentSlice";
import { Comment } from "../../../../../../../../types/comment";
import CommentForm from "./components/CommentForm/CommentForm";
import CommentsItem from "./components/CommentsItem/CommentsItem";
import { PostData } from "../../../../../../../../types/post";

interface CommentListProps {
  post: PostData | null;
}

const CommentsList: React.FC<CommentListProps> = ({ post }) => {
  const editedComment = useSelector(selectEditedComment);
  const comments = useSelector(selectComments);

  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {comments &&
          comments.map((item: Comment) => {
            return <CommentsItem key={item.id} styled={false} {...item} />;
          })}
        {editedComment && <CommentsItem {...editedComment} styled={true}/>}
      </List>
      {!editedComment && <CommentForm id={post?.id} />}
    </Box>
  );
};

export default CommentsList;
