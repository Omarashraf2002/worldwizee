
import { useCities } from "../Contexts/CityContext"
import CityItem from "./CityItem"
import styles from "./CityList.module.css"
import Message from "./Message"
import Spinner from "./Spinner"

/*eslint-disable react/prop-types */
export default function CityList() {
  const {cities, isLoading} = useCities()
  if (isLoading) return <Spinner />
  if(!cities.length) return <Message message='Add your first city by clicking on the map' />
  return (
    <div className={styles.cityList}>
      {cities.map(city => <CityItem city={city} key={city.id} /> )}
    </div>
  )
}
