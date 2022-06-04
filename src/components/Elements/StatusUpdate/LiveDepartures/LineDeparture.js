import react from "react";
import { useLocation, Link } from "react-router-dom"
import styles from "./LineDeparture.module.css"

const LineDeparture = (props) => {
  const [departures, setDepartures] = react.useState(undefined)


  const content = props
  console.log(content)
  const line = props["line"]
  const station = props["atco"]
  console.log(station)
  console.log(line)

  const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  react.useEffect(() => {
    async function getLiveDepartures() {
      if (line === null) {
        console.log("no params")
      } else if (line === "bakerloo" || line === "central" || line === "victoria" || line === "jubilee") {
        const resp = await fetch(`https://api.tfl.gov.uk/Line/${line}/Arrivals/${station}`)
        const departureData = await resp.json()
        const departure = departureData
        console.log(departure)
        setDepartures(departure)
      }  
    }
    getLiveDepartures()
  }, [line, station]);

  return ( 
    departures ? 
      <div className={styles[line]}>
        <h3 className={styles.lineTitle} >{capitalizeFirst(line)}</h3>
        {departures.map((line) => {
          return <div key={line.vehicleId} className={styles.serviceDiv} >
            <p>{line.platformName}</p>
            <p>{(line.destinationName).replace("Underground Station", "")} </p>
            <p>{Math.floor(line.timeToStation / 60)} Mins</p>
          </div>
        })} : <></>
      </div> : null 
  )

}

export default LineDeparture