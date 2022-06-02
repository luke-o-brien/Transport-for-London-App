
import react from "react";
import { useLocation, Link } from "react-router-dom"
import styles from "./DeparturePage.module.css"

const DeparturePage = (props) => {

  const [modeData, setModeData] = react.useState(undefined)
  const location = useLocation();
  const state = location.state;
  console.log(state);
    
  react.useEffect(() => {
    async function getStationData() {
      const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${state}`)
      const data = await response.json()
      const _modeData = data
      console.log(data)
      setModeData(_modeData)
    }
    getStationData()
  }, []);

  function handleClick(e) {
    console.log("clicked")
    const optionText = e.target.value
    console.log(optionText)

    async function getLiveDepartures() {
      const resp = await fetch(`https://api.tfl.gov.uk/Line/${optionText}/Arrivals/${state}`)
      const departureData = await resp.json()
      const departures = departureData
      console.log(departures)
    }
    getLiveDepartures()
  }

  return ( modeData ?
    <div>
      <h2 className={styles.stationName}>{modeData.commonName}</h2>
      <p>{state}</p>
      <div className={styles.availableLineContainer}>
        {modeData.lineModeGroups.map((line) => {
          return <>
            {line.lineIdentifier.map((linename) => {
              return line.modeName === "tube" ? <button value={linename} onClick={handleClick} >{linename}</button> : null
            })}
          </>
        })}
      </div>
      <div className={styles.mapContainer}>
        <p>{modeData.lat}</p>
        <p>{modeData.lon}</p>
      </div>
      <div className={styles.facilityContainer}>
        {modeData.additionalProperties.map((things) => {
          return things.key === "Zone" || things.key === "WiFi" || things.key === "Toilets" ?
            <div className={styles.facilityItem} key={things.key} >
              <div className={styles.key}>
                <p>{things.key}:</p>
              </div>
              <div className={styles.value}>
                <p>{things.value}</p> 
              </div>
            </div> : <></>

}) } </div>
    </div> : <p>waiting on data</p>
  )
}

export default DeparturePage

// Furniture-Deal-Sacrifice-Tailor