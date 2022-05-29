import react from "react";
import { Link } from "react-router-dom";
import styles from "./StationSearch.module.css"

function StationSearch() {

  const [stationdata, setStationData] = react.useState(undefined)
  const [name, setName] = react.useState("")
  //const [title, setTitle] = useState('')
  
  
  


  async function getStationId(e) {
    const _name = e.target.value
    setName(_name);
    console.log(_name)
    const response = await fetch(`https://api.tfl.gov.uk/StopPoint/Search?query=${_name}`)
    const data = await response.json()
    setStationData(data.matches)
    console.log(stationdata)

  
  }
  return ( <>
    <div>
      <input className={styles.inputField} onChange={ getStationId }  value={name} placeholder="Enter Station eg. Oxford Circus" />
    </div>  
    <div className={styles.resultsContainer}>
      {stationdata ? stationdata.map((station) => {
        return <div key={station.id}>
          <Link to={`/Live-Departures/${station.name}`}>
            {station.modes.includes("tube") || station.modes.includes("overground") || station.modes.includes("dlr") || station.modes.includes("elizabeth-line") ? 
              <div className={styles.name_container}>
                <h3 className={styles.name}>{station.name}</h3>
              </div> : null}
          </Link>
        </div>
      }) : <p className={styles.startTyping}>Start Typing to display Stations</p>}
    </div>
  </>
  )

}

export default StationSearch