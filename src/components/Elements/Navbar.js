import React from "react"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"



function Navbar () {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.navbar_item}>
          Home
        </Link>
        <Link to="/Live-Departures" className={styles.navbar_item}>
          Live Departures
        </Link>
        <Link to="/Service-updates" className={styles.navbar_item}>
          Service Updates
        </Link>
      </nav>
    </header>
  )
}

export default Navbar