import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useThunkDispatch } from "../../../../../../../../redux/store";
import { useParams } from "react-router-dom";
import {
  fetchComments,
  selectComments,
} from "../../../../../../../../redux/slices/commentSlice";
import { useSelector } from "react-redux";

const Comments = () => {
  const { id } = useParams();
  console.log(id, "idid");
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(fetchComments(Number(id)));
  }, []);

  const comments = useSelector(selectComments);
  console.log(comments, "comments");

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default Comments;
