import { Box, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  changeFilterValue,
  selectSearchedValue,
} from "../../../core/store/slices/postSlice";
import { useThunkDispatch } from "../../../core/store/store";
import { PageHeader } from "../../ui/PageHeader";

const Search = React.memo(() => {
  const dispatch = useThunkDispatch();
  const searchedValue = useSelector(selectSearchedValue);

  const onFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeFilterValue(e.target.value));
    },
    [dispatch]
  );

  return (
    <Box display="flex" flexDirection="column" position="relative">
      <Box display="flex" alignItems="center" justifyContent="center">
        <PageHeader variant="h2">
          Posts
        </PageHeader>
      </Box>
      <TextField
        variant="outlined"
        value={searchedValue}
        label="Search"
        onChange={onFilterChange}
      ></TextField>
    </Box>
  );
});

export default Search;
