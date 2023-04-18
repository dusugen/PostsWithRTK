import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice"
import { useDispatch } from "react-redux";

const combinedReducer = combineReducers({
    post : postReducer,
})

export const store = configureStore({
    reducer: combinedReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();