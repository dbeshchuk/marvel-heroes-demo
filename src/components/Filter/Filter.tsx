import React from "react";
import styles from "./Filter.module.scss"
import { TextField } from "@mui/material";

interface Props {
  filter: string;
  change: (filter: string) => void;
}

const Filter = ({ filter, change }: Props) => (
  <div className={styles.filterContainer}>
    <TextField
      type="text"
      placeholder="Search"
      name="filter"
      value={filter}
      onChange={e => change(e.target.value)}
      className={styles.filter}
      size="small"
    />
  </div>
);

export default Filter;