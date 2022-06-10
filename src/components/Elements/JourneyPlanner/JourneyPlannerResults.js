import react from "react";
import styles from "./JourneyPlannerResults.module.css"
function JourneyResults(props) {

  const content = props
  console.log(content)
  const origin = props["origin"]

  const [journeyData, setJourneyData] = react.useState(undefined)
  
  react.useEffect(() => {
    async function getJourneyData() {
      const response = await fetch(`https://api.tfl.gov.uk/Journey/JourneyResults/${origin}/to/910GELTHAM`)
      const data = await response.json()
      const _journeyData = data
      setJourneyData(_journeyData)
      console.log(_journeyData)
    }
    getJourneyData()
  }, []);

  return (journeyData ? <>
    {journeyData.journeys.slice(0, 1).map((journey, pos) => {
      return <div key={pos} className={styles.ResultsDiv}>
        {(journey.duration > 60) ? <p>Duration {Math.floor(journey.duration / 60)} Hours {journey.duration % 60} Mins</p> : <p>{journey.duration} Minutes</p>}
        <p>{journey.arrivalDateTime.split("T")[1].split(":").slice(0,-1).join(":")}</p>
        <p>{journey.startDateTime.split("T")[1].split(":").slice(0,-1).join(":")}</p>
        {journey.legs.map((legs, pos) => {
          return <div key={pos} className={styles.LegContainer}>
            <p className={styles.details}>{legs.departurePoint.commonName}</p> 
            <p className={styles.details}>{(legs.departureTime.split("T")[1].split(":").slice(0,-1).join(":"))}</p>
            <p className={styles.details}>{legs.mode.name}</p>
            <p className={styles.details}>{legs.routeOptions[0].directions}</p>
            <p className={styles.details}>{legs.routeOptions[0].name}</p>
            <p className={styles.details}>{legs.duration} Minutes</p>
            {legs.path.stopPoints.map((stops) => {
              return <p className={styles.stops} key={stops.name}>{stops.name}</p>
            })}
            <p className={styles.details}>{legs.arrivalPoint.commonName}</p>
            <p className={styles.details}>{(legs.arrivalTime.split("T")[1].split(":").slice(0,-1).join(":"))}</p>
          </div>
        })}
      </div>
    })}
  </> : null

  )
}

export default JourneyResults