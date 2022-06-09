import react from "react";
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
      return <div key={pos}>
        {journey.legs.map((legs) => {
          return <>
            <p>{legs.departurePoint.commonName}</p>
            <p>{legs.departureTime}</p>
            <p>{legs.mode.name}</p>
            <p>{legs.arrivalPoint.commonName}</p>
            <p>{legs.arrivalTime}</p>
          </>
        })}
      </div>
    })}
  </> : null

  )
}

export default JourneyResults