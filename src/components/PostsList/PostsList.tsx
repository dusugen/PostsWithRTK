import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchPosts,
  selectFilteredPosts,
  selectPosts,
} from "../../redux/slices/postSlice";
import { useThunkDispatch } from "../../redux/store";
import Filter from "./Filter/Filter";
import PostsItem from "./components/PostsItem/PostsItem";
import Loader from "../../shared/loader/Loader";
import { StatusOfRequestEnum } from "../../types/enums/statusOfRequestEnum";

const PostsList: React.FC = () => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const filtredPost = useSelector(selectFilteredPosts);

  const {status,error,post} = useSelector(selectPosts);

  return (
    <Container>
      <Filter />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "revent",
        }}
      >
        {status === StatusOfRequestEnum.LOADING ? (
          <Loader />
        ) : status === StatusOfRequestEnum.ERROR ? (
          error
        ) : status === StatusOfRequestEnum.SUCCESS && filtredPost ? (
          filtredPost.map((item) => {
            return (
              <PostsItem
                key={item.id}
                id={item.id}
                title={item.title}
                body={item.body}
              />
            );
          })
        ) : null}
      </Box>
    </Container>
  );
};

export default PostsList;
