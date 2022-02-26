import React from "react";
import styles from "./HeroItem.module.scss"

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

interface keyable {
    [key: string]: any  
}

interface Props {
  hero: keyable;
}

const HeroItem = ({ hero }: Props) => {
  return (
    <li>
      <Link
        to={`/${hero.id}`}
        style={{ textDecoration: "none" }}
      >
        <Card className={styles.heroItem}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={`${hero.thumbnail.path}/standard_fantastic.${hero.thumbnail.extension}`}
              alt={hero.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {hero.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </li>
  );
};

export default HeroItem;