import react from "react";
import React from "react";

function Lines() {
  const [lineStatus, setLineStatus] = react.useState(undefined) 
  
  React.useEffect(() => {
    async function GetServiceData() {
      const response = await fetch("https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail,tram,elizabeth-line/status/")
      const data = await response.json()
      console.log(data)
      setLineStatus(data)
    }
    GetServiceData()
  }, []);



  return (  
    lineStatus ? lineStatus.map((line) => {
      return <div key={line.id}>
        <h3>{line.name}</h3>
        <h3>{line.statusSeverity}</h3>
        {line.lineStatuses.map((status) => {
          return <div key={line.lineId}>
            <h4>{status.statusSeverityDescription}</h4> 
          </div>
        })}
      </div> 
    }) : <p>loading data</p>
  )
}

export default Lines