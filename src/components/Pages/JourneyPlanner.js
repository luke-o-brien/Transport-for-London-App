import react from "react";
import { useState } from "react/cjs/react.production.min";
import JourneyPlannerForm from "../Elements/JourneyPlanner/JourneyPlannerForm";

function JourneyPlanner() {

  // //const [journeyData, setJourneyData] = react.useState(undefined)
  
  // react.useEffect(() => {
  //   async function getJourneyData() {
  //     const response = await fetch("https://api.tfl.gov.uk/Journey/JourneyResults/910GELTHAM/to/910GFELTHAM")
  //     const data = await response.json()
  //     const _journeyData = data
  //    // setJourneyData(_journeyData)
  //     console.log(_journeyData)
  //   }
  //   getJourneyData()
  // }, []);



  return ( <>
    <p>Plan your Journey</p>
    <JourneyPlannerForm />
  </>
  )
}

export default JourneyPlanner