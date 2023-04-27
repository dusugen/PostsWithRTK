import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { StatusOfRequestEnum } from "../../types/enums/statusOfRequestEnum";
import { PostData } from "../../types/post";
import { RootState } from "../store";
import config from "../../config/config.json";

interface PostSlice {
  searchedValue: string;
  fetchPosts: {
    post: PostData[];
    status: StatusOfRequestEnum;
    error: string | null;
  };
  fetchPostById: {
    id: number | null;
    post: PostData | null;
    status: StatusOfRequestEnum;
    error: string | null;
  };
}

const initialState: PostSlice = {
  searchedValue: "",
  fetchPosts: {
    post: [],
    status: StatusOfRequestEnum.IDLE,
    error: null,
  },
  fetchPostById: {
    id: null,
    post: null,
    status: StatusOfRequestEnum.IDLE,
    error: null,
  },
};

export const fetchPosts = createAsyncThunk<
  PostData[],
  void,
  { rejectValue: string; state: RootState }
>("post/fetchPosts", async function (_, { rejectWithValue }) {
  try {
    const { data } = await axios.get<PostData[]>(`${config.apiUrl}/posts?_limit=20`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) return rejectWithValue(error.message);
    return rejectWithValue("Unknown erorr !");
  }
});

export const fetchPostById = createAsyncThunk<
  PostData,
  number,
  { rejectValue: string; state: RootState }
>("post/fetchPostById", async function (id, { rejectWithValue }) {
  try {
    const { data } = await axios.get<PostData>(`${config.apiUrl}/posts/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) return rejectWithValue(error.message);
    return rejectWithValue("Unknown erorr !");
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    changeFilterValue(state, action) {
      state.searchedValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchPosts.status = StatusOfRequestEnum.LOADING;
        state.fetchPosts.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchPosts.status = StatusOfRequestEnum.SUCCESS;
        state.fetchPosts.post = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchPosts.status = StatusOfRequestEnum.ERROR;
        state.fetchPosts.error = action.payload || "Unknown Error !";
      })
      .addCase(fetchPostById.pending, (state) => {
        state.fetchPostById.status = StatusOfRequestEnum.LOADING;
        state.fetchPostById.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.fetchPostById.status = StatusOfRequestEnum.SUCCESS;
        state.fetchPostById.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.fetchPostById.status = StatusOfRequestEnum.ERROR;
        state.fetchPostById.error = action.payload || "Unknown Error !";
      });
  },
});

const selfSelector = (state: RootState) => state.post;

export const selectPosts = createSelector(
  selfSelector,
  (state) => state.fetchPosts
);

export const selectFilteredPosts = createSelector(selfSelector, (state) => {
  if (state.fetchPosts.post) {
    return state.fetchPosts.post.filter((item) =>
      item.title.includes(state.searchedValue)
    );
  }
});

export const selectSearchedValue = createSelector(
  selfSelector,
  (state) => state.searchedValue
);

export const selectPostById = createSelector(
  selfSelector,
  (state) => state.fetchPostById
);

export const { changeFilterValue } = postSlice.actions;
export default postSlice.reducer;
