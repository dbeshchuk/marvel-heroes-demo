import React from "react";
import styles from "./Filter.module.scss"
import { TextField, IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

interface Props {
  filter: string;
  change: (filter: string) => void;
  submit(evt: React.FormEvent<HTMLFormElement>): void;
}

const Filter = ({ filter, change, submit }: Props) => (
  <div className={styles.filterContainer}>
    <form onSubmit={submit}>
      <TextField
      type="text"
      placeholder="Search"
      name="filter"
      value={filter}
      onChange={e => change(e.target.value)}
      className={styles.filter}
      size="small"
      InputProps={{
        endAdornment: (
          <IconButton
            type="submit"
            className="SearchForm-button"
            edge="end"
          >
            <SearchIcon />
          </IconButton>
        ),
        }}
      />
    </form>
  </div>
);

export default Filter;