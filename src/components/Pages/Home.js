import styles from "./Home.module.css"
import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <h1>Transport for London Information</h1>
      <Link to="/Service-updates" >
        <div className={styles.navigation_div}>
          <h2 className={styles.navigation_title}>Service Status</h2>
        </div>
      </Link>
      <Link to="/Live-Departures" >
        <div className={styles.navigation_div}>
          <h2 className={styles.navigation_title}>Live Departure Boards</h2>
        </div>
      </Link>

    </>
  );
}

export default Home
