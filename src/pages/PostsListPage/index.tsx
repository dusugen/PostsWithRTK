import { Box, Container, Grid, Grow } from "@mui/material";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import PostsItem from "../../components/simple/PostItem";
import ErrorPage from "../../components/simple/errorPage";
import Loader from "../../components/simple/loader";
import Search from "../../components/smart/Search";
import {
  fetchPosts,
  selectFilteredPosts,
  selectPosts,
} from "../../core/store/slices/postSlice";
import { useThunkDispatch } from "../../core/store/store";
import { StatusOfRequestEnum } from "../../core/types/enums/statusOfRequestEnum";

const MainPage: React.FC = () => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filtredPost = useSelector(selectFilteredPosts);

  const { status, error } = useSelector(selectPosts);

  return (
    <Container>
      <Grow in={!!filtredPost}>
        <Box display="flex" flexDirection="column" gap="20px">
          <Search />

          <Grid
            container
            spacing={{ xs: 1, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {status === StatusOfRequestEnum.LOADING && <Loader />}
            {status === StatusOfRequestEnum.ERROR && (
              <ErrorPage error={error} />
            )}
            {status === StatusOfRequestEnum.SUCCESS &&
              filtredPost &&
              filtredPost.map((item) => {
                return (
                    <Grid item xs={2} sm={4} md={4} key={item.id}>
                      <PostsItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        body={item.body}
                      />
                    </Grid>
                );
              })}
          </Grid>
        </Box>
      </Grow>
    </Container>
  );
};

export default memo(MainPage);
