import { Link } from "react-router-dom";
import styles from "./CityItem.module.css"
import { useCities } from "../Contexts/CityContext";
/* eslint-disable react/prop-types*/
export default function CityItem({city}) {
    console.log(city);
    const {cityName, emoji, date, id,position} = city
    const {currentCity,deleteCity} = useCities()

    function handleClick(e) {
      e.preventDefault();
      deleteCity(id)

    }
  return (
    <li >
        <Link className={`${styles.cityItem} ${id===currentCity.id?styles['cityItem--active']: '' }`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{date}</time>
            <button className={styles.deleteBtn} onClick={handleClick} >&times;</button>
        </Link>
    </li>
  )
}
