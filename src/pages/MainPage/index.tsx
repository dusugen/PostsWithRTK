import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PostsItem from "../../components/simple/PostItem";
import ErrorPage from "../../components/simple/errorPage";
import Loader from "../../components/simple/loader";
import Filter from "../../components/smart/Filter";
import {
  fetchPosts,
  selectFilteredPosts,
  selectPosts,
} from "../../core/store/slices/postSlice";
import { useThunkDispatch } from "../../core/store/store";
import { StatusOfRequestEnum } from "../../core/types/enums/statusOfRequestEnum";
import { CustomizeMainPageList } from "./styled";

const MainPage: React.FC = () => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filtredPost = useSelector(selectFilteredPosts);

  const { status, error } = useSelector(selectPosts);

  return (
    <Container>
      <Box display="flex" flexDirection="column" gap="20px">
        <Filter />
        <CustomizeMainPageList>
          {status === StatusOfRequestEnum.LOADING && <Loader />}
          {status === StatusOfRequestEnum.ERROR && <ErrorPage error={error} />}
          {status === StatusOfRequestEnum.SUCCESS &&
            filtredPost &&
            filtredPost.map((item) => {
              return (
                <PostsItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  body={item.body}
                />
              );
            })}
        </CustomizeMainPageList>
      </Box>
    </Container>
  );
};

export default MainPage;
