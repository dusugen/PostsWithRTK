import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { StatusOfRequestEnum } from "../../types/enums/statusOfRequestEnum";
import { Post } from "../../types/post";
import { RootState } from "../store";

interface PostSlice {
  filterValue: string;
  fetchPosts: {
    post: Post[] | null;
    status: StatusOfRequestEnum;
    error: string | null;
  };
  fetchPostById: {
    id: number | null;
    post: Post | null;
    status: StatusOfRequestEnum;
    error: string | null;
  };
}

const initialState: PostSlice = {
  filterValue: "",
  fetchPosts: {
    post: null,
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
  Post[],
  void,
  { rejectValue: string; state: RootState }
>("post/fetchPosts", async function (_, { rejectWithValue }) {
  try {
    const { data } = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts?_limit=20"
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) return rejectWithValue(error.message);
    return rejectWithValue("Unknown erorr !");
  }
});

export const fetchPostById = createAsyncThunk<
  Post,
  number,
  { rejectValue: string; state: RootState }
>("post/fetchPostById", async function (id, { rejectWithValue }) {
  try {
    const { data } = await axios.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
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
      state.filterValue = action.payload;
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

export const selectFilteredPosts = createSelector(selfSelector, (state) => {
  if (state.fetchPosts.post) {
    return state.fetchPosts.post.filter((item) =>
      item.title.includes(state.filterValue)
    );
  }
});

export const selectFiltredValue = createSelector(
  selfSelector,
  (state) => state.filterValue
);

export const selectPostById = createSelector(
  selfSelector,
  (state) => state.fetchPostById.post
);

export const { changeFilterValue } = postSlice.actions;
export default postSlice.reducer;
