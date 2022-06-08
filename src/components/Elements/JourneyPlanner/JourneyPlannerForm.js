import react from "react"
import { createRoutesFromChildren } from "react-router-dom"
import styles from "./JourneyPlannerForm.module.css"

function JourneyPlannerForm() {

  
  const [stationdata, setStationData] = react.useState(undefined)
  const [name, setName] = react.useState("")
  const [orgin, setOrigin] = react.useState("")
  const [showSuggestions, setShowSuggestions] = react.useState(false);

  async function getStationId(e) {
    const _name = e.target.value
    setName(_name);
    console.log(_name)
    const response = await fetch(`https://api.tfl.gov.uk/StopPoint/Search?query=${_name}`)
    const data = await response.json()
    setStationData(data.matches)
    console.log(stationdata)
    setShowSuggestions(true)
    console.log(showSuggestions)
  }

  function handleclick(e) {
    e.preventDefault();
    console.log("clicked")
    const selected = e.target.value
    const text = e.target.innerHTML
    setOrigin(selected)
    console.log(selected)
    const field = document.getElementById("start") 
    field.value = text
    setName(text)
    setShowSuggestions(false)
    console.log(showSuggestions)
  }

  function submit(e) {
    e.preventDefault();
    console.log("submited");
    //const start = 
    console.log(`the submitted origin is ${orgin}`)
  }

  return (<>
    <p>form</p>
    <form className={styles.form}>
      <label>
        <input id="start" className={styles.TextInput} onChange={ getStationId } value={name} placeholder="eltham"></input>
      </label>
      <div id="suggestions" className={styles.stationSuggestions}>
        {stationdata && showSuggestions ? stationdata.slice(0, 5).map((station) => {
          return <div id="suggest" key={station.id}>
            {station.modes.includes("tube") || station.modes.includes("dlr") || station.modes.includes("elizabeth-line") || station.modes.includes("national-rail") ? 
              <div className={styles.suggestionContainer}>
                <button value={station.icsId} onClick={ handleclick } className={styles.Suggestion}>{(station.name).replace("Underground Station", "")}</button>
              </div> : null}
          </div>
        }) : null}  
      </div>
      <input onClick={submit} type="submit"></input>
    </form>
  </>
  )
}

export default JourneyPlannerForm