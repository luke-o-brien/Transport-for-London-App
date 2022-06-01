
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

  return ( modeData ?
    <div>
      <h2 className={styles.stationName}>{modeData.commonName}</h2>
      <p>{state}</p>
      {modeData.lines.map((line) => {
        return <div key={line.id}>
          <p>{line.name}:</p>
        </div>
      })}
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