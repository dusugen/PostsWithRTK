import { Container, Grid, Grow } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PhotosItem from "../../components/simple/PhotosItem";
import ErrorPage from "../../components/simple/errorPage";
import Loader from "../../components/simple/loader";
import { PageHeader } from "../../components/ui/PageHeader";
import { fetchPhotos, selectPhotos } from "../../core/store/slices/albumSlice";
import { useThunkDispatch } from "../../core/store/store";
import { StatusOfRequestEnum } from "../../core/types/enums/statusOfRequestEnum";

const PhotosPage = () => {
  const dispatch = useThunkDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(fetchPhotos(Number(id)));
  }, [dispatch, id]);

  const { data, status, error } = useSelector(selectPhotos);

  return (
    <Grow in={!!data}>
      <Container>
        <PageHeader variant="h2">Photos</PageHeader>

        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
          paddingBottom="30px"
        >
          {status === StatusOfRequestEnum.LOADING && <Loader />}
          {status === StatusOfRequestEnum.ERROR && <ErrorPage error={error} />}
          {status === StatusOfRequestEnum.SUCCESS &&
            data.map((item) => {
              return (
                <Grid item xs={8} sm={4} md={4} key={item.id}>
                  <PhotosItem data={item} />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Grow>
  );
};

export default PhotosPage;
