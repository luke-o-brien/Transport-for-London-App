
import react from "react";
import { useLocation, Link } from "react-router-dom"
import styles from "./DeparturePage.module.css"
import LineDeparture from "../Elements/StatusUpdate/LiveDepartures/LineDeparture.js";

const DeparturePage = (props) => {
  const [show, setshow] = react.useState("show")
  const [modeData, setModeData] = react.useState(undefined)
  const [departures, setDepartures] = react.useState(undefined)
  const [station, setStation] = react.useState(undefined)
  const location = useLocation();
  const state = location.state;

  console.log(state);
    
  react.useEffect(() => {
    setStation(state)
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
    const optionText = e.target.innerHTML
    const optionValue = e.target.value
    console.log(optionValue)
    console.log(optionText)
    setshow(optionText)
    console.log(show)

    async function getLiveDepartures() {
      const resp = await fetch(`https://api.tfl.gov.uk/Line/${optionText}/Arrivals/${optionValue}`)
      const departureData = await resp.json()
      const departure = departureData
      setDepartures(departure)
    }
    getLiveDepartures()
  }

  return ( modeData ?
    <div>
      <h2 className={styles.stationName}>{modeData.commonName}</h2>
      <div className={styles.availableLineContainer}>
        {modeData.lineGroup.map((line) => {
          return <>
            {line.lineIdentifier.map((linename) => {
              return linename === "bakerloo" || linename === "central" || linename === "circle" || linename === "district" || linename === "hammersmith-city" || linename === "jubilee" || linename === "metropolitan" || linename === "northern" || linename === "piccadilly" || linename === "victoria" ? 
                <button value={line.stationAtcoCode} onClick={handleClick} >{linename}</button> : null
            })}
          </>
        })}
      </div>
      <div>
        <LineDeparture data={departures} state={station}/>
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