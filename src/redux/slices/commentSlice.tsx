import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { StatusOfRequestEnum } from "../../types/enums/statusOfRequestEnum";
import { Comments } from "../../types/comments";
import { RootState } from "../store";

interface commentSlice {
  data: Comments[] | null;
  status: StatusOfRequestEnum;
  error: string | null;
}

const initialState: commentSlice = {
  data: null,
  status: StatusOfRequestEnum.IDLE,
  error: null,
};

export const fetchComments = createAsyncThunk<
  Comments[],
  number,
  { rejectValue: string }
>("comment/fetchComment", async function (id, { rejectWithValue }) {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) return rejectWithValue(error.message);
    return rejectWithValue("Unknown erorr !");
  }
});

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = StatusOfRequestEnum.LOADING;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = StatusOfRequestEnum.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = StatusOfRequestEnum.ERROR;
        state.error = action.payload || "Unknown Error !";
      });
  },
});

const selfSelector = (state: RootState) => state.comment;

export const selectComments = createSelector(selfSelector, (state) => state.data);

export default commentSlice.reducer;
