// import PageNav from "./PageNav";
import styles from "./AppNav.module.css"
import { NavLink } from "react-router-dom";

export default function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
          <NavLink to="countries">Countries </NavLink>
        </li>
      </ul>
    </div>
  )
}
