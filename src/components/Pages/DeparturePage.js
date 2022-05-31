
import react from "react";
import { useLocation, Link } from "react-router-dom"

const DeparturePage = (props) => {

  const [modeData, setModeData] = react.useState(undefined)
  const location = useLocation();
  const state = location.state;
  console.log(state);
    
  react.useEffect(() => {
    async function getStationData() {
      const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${state}`)
      const data = await response.json()
      const _modeData = data
      console.log(data)
      setModeData(_modeData)
    }
    getStationData()
  }, []);

  return ( modeData ?
    <div>
      <p>{modeData.commonName}</p>
      <p>{state}</p>
      <p>{modeData.lat}</p>
      {modeData.additionalProperties.map((things) => {
        return  things.key === "Lifts" || things.key === "Zone" || things.key === "WiFi" || things.key === "Toilets" ?
        <div key={things.key} >
          <p>{things.key}</p>
          <p>{things.value}</p> 
        </div> : <></>

}) }
    </div> : <p>waiting on data</p>
  )
}

export default DeparturePage