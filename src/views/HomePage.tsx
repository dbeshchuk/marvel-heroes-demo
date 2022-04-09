import { useState, useEffect } from "react";
import * as marvelAPI from "../service/marvelApi";
import HeroList from "../components/HeroList/HeroList"
import Filter from "../components/Filter/Filter"
import { LoadingButton } from "@mui/lab";

interface keyable {
  [key: string]: number | string;
}

const HomePage = () => {
  const [filter, setFilter] = useState<string>("");
  const [selectedHeroes, setSelectedHeroes] = useState<Array<keyable>>([]);
  
  const [total, setTotal] = useState<number>(-1);
  const [offset, setOffset] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true)
  const [enableBtn, setEnableBtn] = useState<boolean>(true)

  const getHeroesList = async () => {
    setEnableBtn(true) 
    setLoading(true)

    await marvelAPI
      .fetchHeroesList(filter, offset)
      .then((response) => {
        setSelectedHeroes([...response.data.results])
        setTotal(response.data.total)
      })
    
    setLoading(false)
  };

  const updateHeroesList = async () => {
    setLoading(true)

    await marvelAPI
      .fetchHeroesList(filter, offset)
      .then((response) => {
        setSelectedHeroes([...selectedHeroes, ...response.data.results])
        setTotal(response.data.total)
      })
    
    setLoading(false)
  };

  const changeFilter = (filter: string) => {
    setFilter(filter);
  };

  const submitForm = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault()
    
    setOffset(0);
    setSelectedHeroes([])
    getHeroesList();
  };

  useEffect(() => {
    updateHeroesList();
  }, [offset]);

  useEffect(() => {
    if (selectedHeroes.length === total) {
      setEnableBtn(false)  
    }
  }, [selectedHeroes, total])

  return (
    <>
      <Filter
        filter={filter}
        change={changeFilter}
        submit={submitForm}
      />

      {selectedHeroes.length > 0 && 
        <ul>
          <HeroList selectedHeroes={selectedHeroes}/>
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

export default HomePage;