import react from "react"
import styles from "./JourneyPlannerForm.module.css"
import JourneyResults from "./JourneyPlannerResults"

function JourneyPlannerForm() {

  // Origin states
  const [originStationdata, setOriginStationData] = react.useState(undefined)
  const [OriginName, setOriginName] = react.useState("")
  const [origin, setOrigin] = react.useState("")
  const [showOriginSuggestions, setShowOriginSuggestions] = react.useState(false);

  // Destination States
  const [destStationdata, setDestStationData] = react.useState(undefined)
  const [destName, setDestName] = react.useState("")
  const [dest, setDest] = react.useState("")
  const [showDestSuggestions, setShowDestSuggestions] = react.useState(false);
  // Time States

  const [time, setTime] = react.useState(undefined)
  const [results, setresults] = react.useState(false)

  async function getOriginId(e) {
    const _originName = e.target.value
    setOriginName(_originName);
    console.log(_originName)
    const response = await fetch(`https://api.tfl.gov.uk/StopPoint/Search?query=${_originName}`)
    const data = await response.json()
    setOriginStationData(data.matches)
    console.log(originStationdata)
    setShowOriginSuggestions(true)
    console.log(showOriginSuggestions)
    setresults(false)
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
    setOriginName(text)
    setShowOriginSuggestions(false)
    console.log(showOriginSuggestions)
  }

  async function getDestId(e) {
    const _destName = e.target.value
    setDestName(_destName);
    console.log(_destName)
    const response = await fetch(`https://api.tfl.gov.uk/StopPoint/Search?query=${_destName}`)
    const data = await response.json()
    setDestStationData(data.matches)
    console.log(destStationdata)
    setShowDestSuggestions(true)
    console.log(showDestSuggestions)
    setresults(false)
  }

  function desthandleclick(e) {
    e.preventDefault();
    console.log("clicked")
    const destselected = e.target.value
    const desttext = e.target.innerHTML
    setDest(destselected)
    console.log(destselected)
    const field = document.getElementById("start") 
    field.value = desttext
    setDestName(desttext)
    setShowDestSuggestions(false)
    console.log(showOriginSuggestions)
  }

  function getTime(e) {
    const time = e.target.value
    console.log(time)
    setTime(time)
  }
  function submit(e) {
    e.preventDefault();
    console.log("submited");
    //const start = 
    console.log(`the submitted origin is ${origin}`)
    setresults(true)
  }

  return (<>
    <form onSubmit={submit} className={styles.form}>
      <div className={styles.formContent}>
        <div className={styles.formTextFields}>
          <label>
            <input id="start" required className={styles.TextInput} onChange={ getOriginId } value={OriginName} placeholder="Where from?"></input>
          </label>
          <div id="suggestions" className={styles.stationSuggestions}>
            {originStationdata && showOriginSuggestions ? originStationdata.slice(0, 5).map((station) => {
              return <div id="suggest" key={station.id}>
                {station.modes.includes("tube") || station.modes.includes("dlr") || station.modes.includes("elizabeth-line") || station.modes.includes("national-rail") ? 
                  <div className={styles.suggestionContainer}>
                    <button value={station.icsId} onClick={ handleclick } className={styles.Suggestion}>{(station.name).replace("Underground Station", "")}</button>
                  </div> : null}
              </div>
            }) : null}  
          </div>
          <label>
            <input id="start"  required className={styles.TextInput} onChange={ getDestId} value={destName} placeholder="Where to?"></input>
          </label>
          <div id="suggestions" className={styles.stationSuggestions}>
            {destStationdata && showDestSuggestions ? destStationdata.slice(0, 5).map((station) => {
              return <div id="suggest" key={station.id}>
                {station.modes.includes("tube") || station.modes.includes("dlr") || station.modes.includes("elizabeth-line") || station.modes.includes("national-rail") ? 
                  <div className={styles.suggestionContainer}>
                    <button value={station.icsId} onClick={ desthandleclick } className={styles.Suggestion}>{(station.name).replace("Underground Station", "")}</button>
                  </div> : null}
              </div>
            }) : null}  
          </div>
        </div>
        <div className={styles.Formboxes}>
          <input required className={styles.timeInput} type="time" id="time" onChange={getTime}></input>
          <input className={styles.submit} type="submit"></input>
        </div>
      </div>
    </form>
    {results ?
      <div>
        <JourneyResults origin={origin} dest={dest} time={time} />
      </div> : null}
  </>
  )
}

export default JourneyPlannerForm