import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import config from "../../config/config.json";
import { Album } from "../../types/album";
import { StatusOfRequestEnum } from "../../types/enums/statusOfRequestEnum";
import { RootState } from "../store";
import { Photo } from "../../types/photo";

interface AlbumsSlice {
  fetchAlbums: {
    data: Album[];
    status: StatusOfRequestEnum;
    error: string | null;
  };
  fetchPhotos: {
    data: Photo[];
    status: StatusOfRequestEnum;
    error: string | null;
  };
}

const initialState: AlbumsSlice = {
  fetchAlbums: {
    data: [],
    status: StatusOfRequestEnum.IDLE,
    error: null,
  },
  fetchPhotos: {
    data: [],
    status: StatusOfRequestEnum.IDLE,
    error: null,
  },
};

export const fetchAlbums = createAsyncThunk<
  Album[],
  void,
  { rejectValue: string; state: RootState }
>(
  "album/fetchAlbums",
  async function (_, { rejectWithValue, signal }) {
    try {
      const { data } = await axios.get<Album[]>(
        `${config.apiUrl}/albums?_limit=6`,
        {
          signal,
        }
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("Unknown erorr !");
    }
  },
  {
    condition: (_, { getState }) =>
      getState().album.fetchAlbums.status !== StatusOfRequestEnum.LOADING,
  }
);

export const fetchPhotos = createAsyncThunk<
  Photo[],
  number,
  { rejectValue: string; state: RootState }
>(
  "photo/fetchPhoto",
  async function (id, { rejectWithValue, signal }) {
    try {
      const { data } = await axios.get<Photo[]>(
        `${config.apiUrl}/albums/${id}/photos?_limit=12`,
        { signal }
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("Unknown erorr !");
    }
  },
  {
    condition: (_, { getState }) =>
      getState().album.fetchPhotos.status !== StatusOfRequestEnum.LOADING,
  }
);

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.fetchAlbums.status = StatusOfRequestEnum.LOADING;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.fetchAlbums.status = StatusOfRequestEnum.SUCCESS;
        state.fetchAlbums.data = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.fetchAlbums.status = StatusOfRequestEnum.ERROR;
        state.fetchAlbums.error = action.payload || "Unknown Error";
      })
      .addCase(fetchPhotos.pending, (state) => {
        state.fetchPhotos.status = StatusOfRequestEnum.LOADING;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.fetchPhotos.status = StatusOfRequestEnum.SUCCESS;
        state.fetchPhotos.data = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.fetchPhotos.status = StatusOfRequestEnum.ERROR;
        state.fetchPhotos.error = action.payload || "Unknown Error !";
      });
  },
});

const selfSelector = (state: RootState) => state.album;

export const selectAlbums = createSelector(
  selfSelector,
  (state) => state.fetchAlbums
);

export const selectPhotos = createSelector(
  selfSelector,
  (state) => state.fetchPhotos
);

export default albumsSlice.reducer;
