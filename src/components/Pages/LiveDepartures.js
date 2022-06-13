import StationSearch from "../Elements/StationSearch";
import styles from "./LiveDepartures.module.css"
function LiveDepartures() {

  
  return (
    <>
      <h1 className={styles.LDtitle}>Live Departures</h1>
      <StationSearch />
    </>
  );
}

export default LiveDepartures