
import react from "react";
import { useLocation } from "react-router-dom"
import styles from "./DeparturePage.module.css"
import LineDeparture from "../Elements/StatusUpdate/LiveDepartures/LineDeparture.js";

const DeparturePage = () => {
  const [show, setshow] = react.useState("show")
  const [modeData, setModeData] = react.useState(undefined)
  const [displayLine, setDisplayLine] = react.useState(undefined)
  const [stationATCO, setStationATCO] = react.useState(undefined)
  const location = useLocation();
  const state = location.state;

  console.log(state);
    
  react.useEffect(() => {
    async function getStationData() {
      const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${state}`)
      const data = await response.json()
      const _modeData = data
      console.log(data)
      console.dir(data)
      setModeData(_modeData)
      console.log(data.lineGroup.lineIdentifier)
    }
    getStationData()
  }, []);

  function handleClick(e) {
    
    console.log("clicked")
    const optionTextcase = e.target.innerHTML
    const optionText = optionTextcase.charAt(0).toLowerCase() + optionTextcase.slice(1);
    const optionValue = e.target.value
    console.log(optionValue)
    setStationATCO(optionValue)
    console.log(optionText)
    setDisplayLine(optionText)
    setshow(optionText)
    console.log(show)
  }

  return ( modeData ?
    <div>
      <h2 className={styles.stationName}>{(modeData.commonName).replace("Underground Station", "")}</h2>
      <div className={styles.availableLineContainer}>
        {modeData.lineGroup.map((line) => {
          return line.lineIdentifier.map((linename) => {
            return linename === "bakerloo" || linename === "central" || linename === "circle" || linename === "district" || linename === "hammersmith-city" || linename === "jubilee" || linename === "metropolitan" || linename === "northern" || linename === "piccadilly" || linename === "victoria" || linename === "dlr" || linename === "london-overground" ? 
              <button key={line.stationAtcoCode} className={styles.availableLine} value={line.stationAtcoCode} onClick={handleClick} >{linename.charAt(0).toUpperCase() + linename.slice(1)}</button> 
              : null
          })
        })}
      </div>
      <div>
        <LineDeparture  line={displayLine} atco={stationATCO}/>
      </div>
      {/* <div className={styles.mapContainer}>
        <p>{modeData.lat}</p>
        <p>{modeData.lon}</p>
      </div> */}
      {/* <div className={styles.facilityContainer}>
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

        }) } </div> */}
    </div> : <p>waiting on data</p>
  )
}

export default DeparturePage

// Furniture-Deal-Sacrifice-Tailor