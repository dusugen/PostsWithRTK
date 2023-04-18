import { Box, TextField, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  changeFilterValue,
  selectFiltredValue,
} from "../../../redux/slices/postSlice";
import { useThunkDispatch } from "../../../redux/store";

const Filter = () => {
  const dispatch = useThunkDispatch();
  const filtredValue = useSelector(selectFiltredValue);

  const onFilterChange = useCallback((value: string) => {
    dispatch(changeFilterValue(value));
  }, []);

  return (
    <Box mb={"40px"}>
      <Typography textAlign={"center"} mb={"20px"} variant="h2">
        Filter
      </Typography>
      <TextField
        sx={{ width: "100%" }}
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
