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
  post: Post[];
  status: StatusOfRequestEnum;
  error: string | null | undefined;
}

const initialState: PostSlice = {
  filterValue: "",
  post: [],
  status: StatusOfRequestEnum.IDLE,
  error: null,
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
        state.status = StatusOfRequestEnum.LOADING;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = StatusOfRequestEnum.SUCCESS;
        state.post = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = StatusOfRequestEnum.ERROR;
        state.error = action.payload;
      });
  },
});

export const { changeFilterValue } = postSlice.actions;

const selfSelector = (state: RootState) => state.post;

export const selectFilteredPosts = createSelector(selfSelector, (state) => {
  return state.post.filter((item) => item.title.includes(state.filterValue));
});

export const selectFiltredValue = createSelector(
  selfSelector,
  (state) => state.filterValue
);

export default postSlice.reducer;
