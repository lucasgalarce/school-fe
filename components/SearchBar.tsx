import { Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

interface SearchInterface {
  fetchTableData: (name?: string) => {};
  label: string;
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);
  return debouncedValue;
}

const SearchCourse: React.FC<SearchInterface> = ({ fetchTableData, label }) => {
  const [searchValue, setSearchValue] = useState("");
  const queryDebouncedValue = useDebounce(searchValue, 300);

  useEffect(() => {
    fetchTableData(queryDebouncedValue);
  }, [queryDebouncedValue]);

  return (
    <Grid item style={{ paddingBottom: 5, paddingLeft: 20 }}>
      <TextField
        label={label}
        name="name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ width: "220px" }}
        required
      />
    </Grid>
  );
};

export default SearchCourse;
