import React from "react";
import HeroItem from "./HeroItem/HeroItem";
import styles from "./HeroList.module.scss";

interface keyable {
    [key: string]: any  
}

interface Props {
  selectedHeroes: Array<keyable>;
}

const HeroList = ({selectedHeroes} : Props) => {
  return (
    <>
      {selectedHeroes && 
        <ul className={styles.heroList}>
          {selectedHeroes.map((hero : keyable) => (
            <HeroItem key={hero.id} hero={hero}/>
          ))}
        </ul>
      }
    </>
  );
};

export default HeroList;