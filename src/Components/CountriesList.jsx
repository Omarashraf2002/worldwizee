import { useCities } from "../Contexts/CityContext"
import CountryItem from "./CountryItem"
import styles from "./CountryList.module.css"
import Message from "./Message"
import Spinner from "./Spinner"

/*eslint-disable react/prop-types */
export default function CountryList() {
  const {cities, isLoading} = useCities()

    if (isLoading) return <Spinner />
    if(!cities.length) return <Message message='Add your first city by clicking on the map' />

    const countries = cities.reduce((arr,city)=> 
       { if(!arr.map(el=>el.country).includes(city.country))
            return[...arr,{country: city.country, emoji:city.emoji}] 
            else return arr}
        , [])
    return (
      <div className={styles.countryList}>
        {countries.map(country => <CountryItem country={country} key={country.id}/> )}
      </div>
    )
  }
  