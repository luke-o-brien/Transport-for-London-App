import React from "react";
import styles from "./Lines.module.css"

function Lines() {
  const [lineStatus, setLineStatus] = React.useState(undefined) 
  
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
      return <div className={styles[line.id]} key={line.id}>
        <h3 className={styles.line_name}>{line.name}</h3>
        {line.lineStatuses.map((status) => {
          return <div key={line.name}>
            <p className={styles.line_status}>{status.statusSeverityDescription}</p> 
          </div>
        })}
      </div> 
    }) : <p>loading data</p>
  )
}

export default Lines