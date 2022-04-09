import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as marvelAPI from "../../service/marvelApi";
import ItemCard from "../ItemCard/ItemCard"

import { LoadingButton } from "@mui/lab";

import styles from "./ComicsList.module.scss"

interface keyable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const ComicsList = () => {
  const [comics, setComics] = useState<Array<object>>([])

  const [total, setTotal] = useState<number>(-1);
  const [offset, setOffset] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true)
  const [enableBtn, setEnableBtn] = useState<boolean>(true)

  const { heroId } = useParams<string>();

  const getHeroesComics = async (id: string) => {
    setLoading(true)

    await marvelAPI
      .fetchHeroComics(id, offset)
      .then((response) => {
        setComics([...response.data.results])
        setTotal(response.data.total)
      })
    
    setLoading(false)
  };

  const updateHeroesComics = async (id: string) => {
    setLoading(true)

    await marvelAPI
      .fetchHeroComics(id, offset)
      .then((response) => setComics([...comics, ...response.data.results]))
    
    setLoading(false)
  };

  useEffect(() => {
    getHeroesComics(heroId as string);
  }, [heroId]);

  useEffect(() => {
    updateHeroesComics(heroId as string);
  }, [offset]);

  useEffect(() => {
    if (comics.length === total) {
      setEnableBtn(false)  
    }
  }, [comics, total])

  return (
    <>
      {Object.keys(comics).length > 0 &&
        <ul className={styles.list}>
            {comics.map((comics: keyable) => (
              <ItemCard key={comics.id} header={comics.title} image={comics.thumbnail}/>
            ))}
        </ul>
      }

      {enableBtn &&
        <LoadingButton
          loading={loading}
          variant="contained"
          sx={{marginBottom: "24px"}}
          onClick={() => setOffset(offset + 20)}
        >
          Load more
        </LoadingButton>
      }
    </>
  );
};

export default ComicsList;