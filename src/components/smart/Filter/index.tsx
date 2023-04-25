import { Box, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  changeFilterValue,
  selectFiltredValue,
} from "../../../core/store/slices/postSlice";
import { useThunkDispatch } from "../../../core/store/store";
import { PageHeader } from "../../ui/PageHeader";

const Filter = () => {
  const dispatch = useThunkDispatch();
  const filtredValue = useSelector(selectFiltredValue);

  const onFilterChange = useCallback(
    (value: string) => {
      dispatch(changeFilterValue(value));
    },
    [dispatch]
  );

  return (
    <Box display="flex" flexDirection="column" position="relative">
      <Box display="flex" alignItems="center" justifyContent="center">
        <PageHeader variant="h2" color="info.light">
          Filter
        </PageHeader>
      </Box>
      <TextField
        variant="outlined"
        value={filtredValue}
        label="Search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onFilterChange(e.target.value)
        }
      ></TextField>
    </Box>
  );
};

export default Filter;