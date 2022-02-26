import { useState, useEffect } from "react";
import * as marvelAPI from "../service/marvelApi";
import HeroList from "../components/HeroList/HeroList"
import Filter from "../components/Filter/Filter"
import { Button } from "@mui/material";

interface keyable {
    [key: string]: any  
}

const HomePage = () => {
  const [filter, setFilter] = useState<string>("");
  const [selectedHeroes, setSelectedHeroes] = useState<Array<keyable>>([]);
  const [offset, setOffset] = useState<number>(0);

  const getHeroesList = async () => {
    await marvelAPI
      .fetchHeroesList(filter, offset)
      .then((response) => setSelectedHeroes([...selectedHeroes, ...response.data.results]))
  };

  const changeFilter = (filter: string) => {
    setFilter(filter);
  };

  useEffect(() => {
    getHeroesList();
  }, [filter, offset]);

  useEffect(() => {
    setOffset(0)
  }, [filter]);

  return (
    <>
      <Filter
        filter={filter}
        change={changeFilter}
      />

      {selectedHeroes.length > 0 && 
        <ul>
          <HeroList selectedHeroes={selectedHeroes}/>
        </ul>
      }

      <Button onClick={() => setOffset(offset + 20)}>
        Load more
      </Button>
    </>
  );
};

export default HomePage;