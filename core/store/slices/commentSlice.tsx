import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

import { Comment } from "../types/comment";
import { StatusOfRequestEnum } from "../types/enums/statusOfRequestEnum";
import { RootState } from "../store";
import config from "../config/config.json";

import config from "../../../core/store/slices/";

interface CommentSlice {
  fetchComments: {
    data: Comment[];
    status: StatusOfRequestEnum;
    error: string | null;
  };
  postComment: {
    status: StatusOfRequestEnum;
    error: string | null;
  };
  editedComments: Comment | null;
}

const initialState: CommentSlice = {
  fetchComments: {
    data: [],
    status: StatusOfRequestEnum.IDLE,
    error: null,
  },
  postComment: {
    status: StatusOfRequestEnum.IDLE,
    error: null,
  },
  editedComments: null,
};

export const fetchComments = createAsyncThunk<
  Comment[],
  number,
  { rejectValue: string; state: RootState }
>(
  "comment/fetchComment",
  async function (id, { rejectWithValue, signal }) {
    try {
      const { data } = await axios.get(`${config.apiUrl}/posts/${id}/comments`, {
        signal,
      });
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("Unknown erorr !");
    }
  },
  {
    condition: (_, { getState }) =>
      getState().comment.fetchComments.status !== StatusOfRequestEnum.LOADING,
  }
);

export const addComment = createAsyncThunk<
  Comment,
  { comment: Omit<Comment, "id" | "postId">; postId: number },
  { rejectValue: string }
>(
  "comment/addComment",
  async function ({ comment, postId }, { rejectWithValue }) {
    try {
      const { data } = await axios.post<unknown>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        {
          body: comment,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (isAddCommentResponse(data)) {
        return {
          email: data.body.email,
          name: data.body.name,
          body: data.body.body,
          postId,
          id: data.id,
        };
      }
      return rejectWithValue("Unavailable response from server");
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("Unknown erorr !");
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchComments.status = StatusOfRequestEnum.LOADING;
        state.fetchComments.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.fetchComments.status = StatusOfRequestEnum.SUCCESS;
        state.fetchComments.data = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.fetchComments.status = StatusOfRequestEnum.ERROR;
        state.fetchComments.error = action.payload || "Unknown Error !";
      })
      .addCase(addComment.pending, (state) => {
        state.postComment.status = StatusOfRequestEnum.LOADING;
        state.postComment.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.postComment.status = StatusOfRequestEnum.SUCCESS;
        state.editedComments = action.payload;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.postComment.status = StatusOfRequestEnum.ERROR;
        state.postComment.error = action.payload || "Unknown Error !";
      });
  },
});

const selfSelector = (state: RootState) => state.comment;

export const selectComments = createSelector(
  selfSelector,
  (state) => state.fetchComments
);

export const selectPostComment = createSelector(
  selfSelector,
  (state) => state.postComment
);

export const selectEditedComment = createSelector(
  selfSelector,
  (state) => state.editedComments
);

export default commentSlice.reducer;
