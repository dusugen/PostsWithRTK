import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FC } from "react";
import { Photo } from "../../../core/types/photo";

interface PhotosItemProps {
  data: Photo;
}

const PhotosItem: FC<PhotosItemProps> = ({ data }) => {
  return (
    <Card sx={{ height: "250px" }}>
      <CardMedia sx={{ height: 140 }} image={data.url} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.title.split(" ")[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PhotosItem;
