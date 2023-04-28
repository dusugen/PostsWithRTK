import { Box, Container, Grid, Grow } from "@mui/material";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import AlbumItem from "../../components/simple/AlbumItem";
import ErrorPage from "../../components/simple/errorPage";
import Loader from "../../components/simple/loader";
import { PageHeader } from "../../components/ui/PageHeader";
import { fetchAlbums, selectAlbums } from "../../core/store/slices/albumSlice";
import { useThunkDispatch } from "../../core/store/store";
import { StatusOfRequestEnum } from "../../core/types/enums/statusOfRequestEnum";
import { musicImg } from "../../core/utils/songsImg";

const AlbumsPage: FC = () => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    const promise = dispatch(fetchAlbums());
    return () => promise.abort();
  }, [dispatch]);

  const { data, status, error } = useSelector(selectAlbums);

  return (
    <Grow in={!!data}>
      <Container>
        <Box display="flex" flexDirection="column" gap="20px">
          <PageHeader variant="h2">Albums</PageHeader>
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
              data.map((item, index) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={item.id}>
                    <AlbumItem data={item} musicImg={musicImg[index]} />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Container>
    </Grow>
  );
};

export default AlbumsPage;
