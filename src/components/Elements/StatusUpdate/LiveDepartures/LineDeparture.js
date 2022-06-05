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


  react.useEffect(() => {
    async function getLiveDepartures() {
      if (line === null) {
        console.log("no params")
      } else if (line === "bakerloo" || line === "central" || line === "victoria" || line === "jubilee" || line === "district" || line === "circle" || line === "metropolitan" || line === "northern" || line === "piccadilly" || line === "hammersmith-city" || line === "dlr" || line === "overground") {
        const resp = await fetch(`https://api.tfl.gov.uk/Line/${line}/Arrivals/${station}`)
        const departureData = await resp.json()
        const departure = departureData
        const sortProperty = "timeToStation";
        const sorted = departure.sort((a, b) => a[sortProperty] -  b[sortProperty]);
        console.log(sorted)
        setDepartures(sorted)
      }  
    }
    getLiveDepartures()
  }, [line, station]);

  return ( 
    departures ? 
      <div className={styles[line]}>
        { line === "dlr" ? <h3 className={styles.lineTitle}>{(line).toUpperCase()}</h3> : <h3 className={styles.lineTitle} >{(line).charAt(0).toUpperCase() + line.slice(1)}</h3>}
        {departures.slice(0, 5).map((service) => {
          return <div key={service.id} className={styles.serviceDiv} >
            { line === "dlr" ? <p>{service.destinationName}</p> : <p>{service.towards} </p>}
            <p>{Math.floor(service.timeToStation / 60)} Mins</p>
          </div>
        })} : <></>
      </div> : null 
  )

}

export default LineDeparture