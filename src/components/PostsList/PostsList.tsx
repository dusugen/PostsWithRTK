import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchPosts, selectFilteredPosts } from "../../redux/slices/postSlice";
import { useThunkDispatch } from "../../redux/store";
import Filter from "./Filter/Filter";
import PostsItem from "./components/PostsItem/PostsItem";

const PostsList: React.FC = () => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const filtredPost = useSelector(selectFilteredPosts);

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
        {filtredPost.map((item) => {
          return (
            <PostsItem
              key={item.id}
              id={item.id}
              title={item.title}
              body={item.body}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default PostsList;
