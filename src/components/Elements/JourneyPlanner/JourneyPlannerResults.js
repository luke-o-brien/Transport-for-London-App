import react from "react";
import styles from "./JourneyPlannerResults.module.css"
function JourneyResults(props) {

  const content = props
  console.log(content)
  const origin = props["origin"]
  const dest = props["dest"]
  const time = props["time"].replace(":", "")
  console.log(time)

  const [journeyData, setJourneyData] = react.useState(undefined)
  const [showStopPoints, setShowStopPoints] = react.useState(false)
  const [showRouteDetail, setShowRouteDetail] = react.useState(false)
  
  react.useEffect(() => {
    async function getJourneyData() {
      const response = await fetch(`https://api.tfl.gov.uk/Journey/JourneyResults/${origin}/to/${dest}?&time=${time}`)
      const data = await response.json()
      const _journeyData = data
      setJourneyData(_journeyData)
      console.log(_journeyData)
    }
    getJourneyData()
  }, []);

  function showStops() {
    setShowStopPoints(!showStopPoints)
  }

  function showRouteDetails() {
    setShowRouteDetail(!showRouteDetail)
  }

  return (journeyData ? <>
    {journeyData.journeys.slice(0, 3).map((journey, pos) => {
      return <div key={pos} className={styles.ResultsDiv}>
        <div className={styles.ResultsDivContent}>
          <div className={styles.JourneyTimes}>
            <p>{journey.startDateTime.split("T")[1].split(":").slice(0,-1).join(":")} - {journey.arrivalDateTime.split("T")[1].split(":").slice(0,-1).join(":")}</p>
            {(journey.duration > 60) ? <p>{Math.floor(journey.duration / 60)} hr {journey.duration % 60} Mins</p> : <p>( {journey.duration} min )</p>}
          </div>
          <a className={styles.routeDetailsButton} onClick={showRouteDetails} >View Route Details<i className="fa-solid fa-angle-down"></i></a>
        </div>
        
        { showRouteDetail && journey.legs.map((legs, pos) => {
          return <div key={pos} className={`${styles.back} ${legs.mode.name === "walking" || legs.mode.name === "bus" || legs.mode.name === "coach" ? styles[legs.mode.name] : styles[legs.routeOptions[0].name.replace(/\s/g,"-")]}`}>
            <div className={styles.legDetailsContainer}>
              {/* <p className={styles.details}>{legs.mode.name.replace("-", " " )}</p> */}
              <p className={styles.detailsDepArr}>{legs.departurePoint.commonName}</p> 
              <p className={styles.details}>{(legs.departureTime.split("T")[1].split(":").slice(0,-1).join(":"))}</p>
              <div>
                <p className={styles.details}>{legs.routeOptions[0].name}</p>
                <p className={styles.details}>{legs.routeOptions[0].directions}</p>
                <p className={styles.details}>{legs.duration} Min</p>
              </div>
              {legs.path.stopPoints.length > 1 ? <a className={styles.details} onClick={showStops}>View Stops<i className="fa-solid fa-angle-down"></i></a>  : null}
              {showStopPoints ? legs.path.stopPoints.slice(0,-1).map((stops) => {
                return <p className={styles.stops} key={stops.name}>{stops.name}</p>
              }) : null}
              <p className={styles.detailsDepArr}>{legs.arrivalPoint.commonName}</p>
              <p className={styles.details}>{(legs.arrivalTime.split("T")[1].split(":").slice(0,-1).join(":"))}</p>
            </div>
          </div>
        })}
      
      </div>
    })}
  </> : null

  )
}

export default JourneyResults