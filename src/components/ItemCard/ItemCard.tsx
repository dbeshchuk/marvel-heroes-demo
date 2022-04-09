import React from "react";
import styles from "./ItemCard.module.scss"

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface keyable {
  [key: string]: string;
}

interface Props {
  header: string;
  image: keyable;
}

const ItemCard = ({ header, image }: Props) => {
  return (
    <li>
      <Card className={styles.itemCard}>
        <CardMedia
          component="img"
          image={`${image.path}/standard_fantastic.${image.extension}`}
          alt={header}
        />
            
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {header}
          </Typography>
        </CardContent>
      </Card>
    </li>
  );
};

export default ItemCard;