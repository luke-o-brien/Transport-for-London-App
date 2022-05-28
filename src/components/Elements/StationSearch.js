import react from "react";
import styles from "./StationSearch.module.css"

function StationSearch() {

  const [stationdata, setStationData] = react.useState(undefined)

  react.useEffect(()=> {
    async function getStationId() {
      const response = await fetch("https://api.tfl.gov.uk/StopPoint/Search?query=new")
      const data = await response.json()
      setStationData(data.matches)
      console.log(stationdata)

    }
    getStationId()
  }, []);

  return ( 
    stationdata ? stationdata.map((station) => {
      return <div key={station.id}>
        {station.modes.includes("tube") || station.modes.includes("overground") || station.modes.includes("dlr") ? 
          <div className={styles.name_container}>
            <h3 className={styles.name}>{station.name}</h3> <p>{station.modes}</p></div> : null}
      </div>
    }) : <p>loading data</p>
  )

}

export default StationSearch