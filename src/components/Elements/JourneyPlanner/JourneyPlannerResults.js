import react from "react";
import styles from "./JourneyPlannerResults.module.css"
function JourneyResults(props) {

  const content = props
  console.log(content)
  const origin = props["origin"]
  const dest = props["dest"]
  const time = props["time"].replace(":", "")

  const [journeyData, setJourneyData] = react.useState(undefined)
  const [showStopPoints, setShowStopPoints] = react.useState(false)
  const [showRouteDetail, setShowRouteDetail] = react.useState(false)
  const [activeIndex, setActiveIndex] = react.useState(null)
  const [activeIndexStops, setActiveIndexStops] = react.useState(null)
  const [stopsArrow, setStopsArrow] = react.useState(false)
  const [arrow, setArrow] = react.useState(false)

  function showRouteDetails(index) {
    console.log(index)
    setActiveIndex(index)
    setShowRouteDetail(!showRouteDetail)
    setArrow(!arrow)
  }
  
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

  function showStops(pos) {
    console.log(pos)
    setActiveIndexStops(pos)
    setShowStopPoints(!showStopPoints)
    setStopsArrow(!stopsArrow)
  }

  

  return (journeyData ? <>
    {journeyData.journeys.slice(0, 5).map((journey, index) => {
      return <div key={index} className={styles.ResultsDiv}>
        <div className={styles.ResultsDivContent}>
          <div className={styles.JourneyTimes}>
            <p>{journey.startDateTime.split("T")[1].split(":").slice(0,-1).join(":")} - {journey.arrivalDateTime.split("T")[1].split(":").slice(0,-1).join(":")}</p>
            {(journey.duration > 60) ? <p>{Math.floor(journey.duration / 60)} hr {journey.duration / 60} mins</p> : <p> {journey.duration} min </p>}
          </div>
          <a className={styles.routeDetailsButton} onClick={() => showRouteDetails(index)}>View Route<i className={ arrow ?  "fa-solid fa-angle-up" : "fa-solid fa-angle-down" }></i></a>
        </div>
        
        {journey.legs.map((legs, pos) => {
          return (activeIndex === index) && showRouteDetail ? 
            <div key={pos} className={`${styles.back} ${legs.mode.name === "walking" || legs.mode.name === "bus" || legs.mode.name === "coach" ? styles[legs.mode.name] : styles[legs.routeOptions[0].name.replace(/\s/g,"-")]}`}>
              <div className={styles.legDetailsContainer}>
                {/* <p className={styles.details}>{legs.mode.name.replace("-", " " )}</p> */}
                <div className={styles.legOriginDetails}>
                  <p className={styles.timeAD}>{(legs.departureTime.split("T")[1].split(":").slice(0,-1).join(":"))}</p>
                  <p className={styles.detailsDepArr}>{legs.departurePoint.commonName.replace("Underground Station", "")}</p> 
                </div>
                <div className={styles.legdetails}>
                  <p className={styles.details}>{legs.routeOptions[0].name}</p>
                  <p className={styles.details}>Towards {legs.routeOptions[0].directions}</p>
                  <p className={styles.detailstime}>{legs.duration} Min</p>
                  {legs.path.stopPoints.length > 1 ? <p className={styles.stopsButton} onClick={() => showStops(pos)}>View Stops<i className={ stopsArrow ?  "fa-solid fa-angle-up" : "fa-solid fa-angle-down" }></i></p>  : null}
                  {(activeIndexStops === pos) && showStopPoints ? <div className={styles.stopsContainer}> {legs.path.stopPoints.slice(0,-1).map((stops) => {
                    return <li className={styles.stops} key={stops.name}>{stops.name}</li>
                  })} </div> : null}
                </div>
                
                <div className={styles.legDestDetails}>
                  <p className={styles.timeAD}>{(legs.arrivalTime.split("T")[1].split(":").slice(0,-1).join(":"))}</p>
                  <p className={styles.detailsDepArr}>{legs.arrivalPoint.commonName.replace("Underground Station", "")}</p>
                </div>
              </div>
            </div> : null
        })}
      
      </div>
    })}
  </> : <><div className={styles.loaderContainer}><div className={styles.loader}></div></div><div>loading..</div></>

  )
}

export default JourneyResults