import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice"
import commentReducer from "./slices/commentSlice"
import { useDispatch } from "react-redux";

const combinedReducer = combineReducers({
    post : postReducer,
    comment: commentReducer,
})

export const store = configureStore({
    reducer: combinedReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
