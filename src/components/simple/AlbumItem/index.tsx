import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { Album } from "../../../core/types/album";

interface AlbumItemProps {
  data: Album;
  musicImg: string;
}

const AlbumItem: FC<AlbumItemProps> = ({ data, musicImg }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200, backgroundSize: "cover" }}
        image={musicImg}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Album # {data.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/albums/${data.id}`}>
          <Button size="small">Inside</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default memo(AlbumItem);
