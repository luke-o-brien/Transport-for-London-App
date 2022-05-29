
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

  return (
    <><p>Departure Page</p>
      <p>{state}</p>
    </>
  )
}

export default DeparturePage