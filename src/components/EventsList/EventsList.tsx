import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as marvelAPI from "../../service/marvelApi";
import ItemCard from "../ItemCard/ItemCard"

import { LoadingButton } from "@mui/lab";

import styles from "./EventsList.module.scss"

interface keyable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const EventsList = () => {
  const [list, setList] = useState<Array<keyable>>([])

  const [total, setTotal] = useState<number>(-1);
  const [offset, setOffset] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true)
  const [enableBtn, setEnableBtn] = useState<boolean>(true)

  const { heroId } = useParams<string>();

  const getHeroesEvents = async (id: string) => {
    setLoading(true)

    await marvelAPI
      .fetchHeroEvents(id, offset)
      .then((response) => {
        setList([...response.data.results])
        setTotal(response.data.total)
      })
    
    setLoading(false)
  };

  const updateHeroesEvents = async (id: string) => {
    setLoading(true)

    await marvelAPI
      .fetchHeroEvents(id, offset)
      .then((response) => {
        setList([...list, ...response.data.results])
        setTotal(response.data.total)
      })
    
    setLoading(false)
  };

  useEffect(() => {
    getHeroesEvents(heroId as string);
  }, [heroId]);

  useEffect(() => {
    updateHeroesEvents(heroId as string);
  }, [offset]);

  useEffect(() => {
    if (list.length === total) {
      setEnableBtn(false)  
    }
  }, [list, total])

  return (
    <>
      {Object.keys(list).length > 0 &&
        <ul className={styles.list}>
            {list.map((item: keyable) => (
              <ItemCard key={item.id} header={item.title} image={item.thumbnail}/>
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

export default EventsList;