import React from "react"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"



function Navbar () {

  const [hamburgerMenu , setHamburgerMenu] = React.useState(false)

  function handleClick() {
    setHamburgerMenu(!hamburgerMenu)
  }
  return (
    <>
      <div className={styles.hamburgerContainer}>
        <i className="fa-solid fa-bars fa-2x" onClick={handleClick} ></i>
      </div>
      <nav className={ hamburgerMenu ? styles.navbarActive : styles.navbar}>
        <div className={styles.exititem}>
          <i className="fa-solid fa-x fa-2x" onClick={handleClick} ></i>
        </div>
        <div className={hamburgerMenu ? styles.navcontentActive : styles.navcontent}>
          <Link to="/" className={styles.navbar_item} onClick={handleClick}>
          Home
          </Link>
          <Link to="/Live-Departures" className={styles.navbar_item} onClick={handleClick}>
          Live Departures
          </Link>
          <Link to="/Service-updates" className={styles.navbar_item} onClick={handleClick}>
          Service Updates
          </Link>
          <Link to="/Journey-planner" className={styles.navbar_item} onClick={handleClick}>
          Journey Planner
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar