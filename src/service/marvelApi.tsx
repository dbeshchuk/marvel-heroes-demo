import axios from "axios";

const BASE_URL = "https://gateway.marvel.com/v1/";
const API_KEY = "e5a3723ba28fd78bb5e2790b4bc46b09";

async function mainFetch(url : string) {
  try {
    const { data } = await axios.get(url);
    
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error)
  }
}

export function fetchHeroesList(name: string, offset: number) {
  if (name === '') {
    return mainFetch(`${BASE_URL}public/characters?offset=${offset}&apikey=${API_KEY}`);
  }

  return mainFetch(`${BASE_URL}public/characters?offset=${offset}&nameStartsWith=${name}&apikey=${API_KEY}`);
}

export function fetchHeroById(id : string) {
  return mainFetch(`${BASE_URL}public/characters/${id}?apikey=${API_KEY}`);
}

export function fetchHeroComics(id : string, offset: number) {
  return mainFetch(`${BASE_URL}public/characters/${id}/comics?offset=${offset}&apikey=${API_KEY}`);
}

export function fetchHeroSeries(id : string, offset: number) {
  return mainFetch(`${BASE_URL}public/characters/${id}/series?offset=${offset}&apikey=${API_KEY}`);
}

export function fetchHeroEvents(id : string, offset: number) {
  return mainFetch(`${BASE_URL}public/characters/${id}/events?offset=${offset}&apikey=${API_KEY}`);
}
