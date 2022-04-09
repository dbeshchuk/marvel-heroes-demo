import { useState, useEffect } from "react";
import * as marvelAPI from "../service/marvelApi";
import { useParams } from "react-router-dom";
import { Card, CardMedia, Typography, Tab, Button } from "@mui/material";

import { TabContext, TabList } from '@mui/lab';

import ComicsList from "../components/ComicsList/ComicsList"
import SeriesList from "../components/SeriesList/SeriesList"
import EventsList from "../components/EventsList/EventsList"

import styles from "./HeroPage.module.scss"

import { ArrowBack } from "@mui/icons-material";

interface keyable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const HeroPage = () => {
  const [hero, setHero] = useState<keyable>({})

  const { heroId } = useParams<string>();

  const getHeroesList = async (id : string) => {
    await marvelAPI
      .fetchHeroById(id)
      .then((response) => setHero({...response.data.results[0]}))
  };

  useEffect(() => {
    getHeroesList(heroId as string);
  }, []);

  const [value, setValue] = useState('1');

  const tabChange = (event: React.SyntheticEvent<EventTarget>, newValue: string): void => {
    setValue(newValue);
  };

  return (
    <>
      <Button
        type="button"
        href="/"
        style={{ marginTop: 24 }}
        variant="outlined"
        startIcon={<ArrowBack />}
      >
        Home
      </Button>
      <br />

      {Object.keys(hero).length > 0 &&
        <Card className={styles.container}>
          <CardMedia
            component="img"
            image={`${hero.thumbnail.path}/detail.${hero.thumbnail.extension}`}
            alt={hero.name}
            className={styles.image}
          />

          <div className={styles.info}>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{marginBottom: "10px"}}
              component="h1"
            >
              {hero.name}
            </Typography>
          
            <Typography
              variant="body1"
              color="text.primary"
            >
              {hero.description}
            </Typography>
          </div>
        </Card>
      }

      <TabContext value={value}>
        <TabList onChange={tabChange}
          centered
          sx={{ marginBottom: "14px" }}
        >
          <Tab label="Comics" value="1" />
          <Tab label="Series" value="2" />
          <Tab label="Events" value="3" />
        </TabList>

        <div hidden={value !== "1"}>
          <ComicsList />
        </div>

        <div hidden={value !== "2"}>
          <SeriesList />
        </div>
      
        <div hidden={value !== "3"}>
          <EventsList />
        </div>
      </TabContext>
    </>
  );
};

export default HeroPage;
