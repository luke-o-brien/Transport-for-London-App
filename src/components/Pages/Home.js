import styles from "./Home.module.css"
import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className={styles.background}>
      <h1 className={styles.mainTtle} >London Transport Planner</h1>
      <div className={styles.homeContent}>
        <Link to="/Service-updates" style={{ textDecoration: "none" }}>
          <div className={styles.navigationDivService}>
            <h2 className={styles.navigation_title}>Service Status</h2>
          </div>
        </Link>
        <Link to="/Live-Departures" style={{ textDecoration: "none" }} >
          <div className={styles.navigation_div}>
            <h2 className={styles.navigation_title}>Live Departure Boards</h2>
          </div>
        </Link>
        <Link to="/Journey-planner" style={{ textDecoration: "none" }}>
          <div className={styles.navigationDivJourney} style={{ textDecoration: "none" }}>
            <h2 className={styles.navigation_title}>Journey Planner</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home
