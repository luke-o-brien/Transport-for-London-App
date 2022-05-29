import React from "react";
import styles from "./Lines.module.css"

function Lines() {
  const [lineStatus, setLineStatus] = React.useState(undefined) 
  const [isShown, setIsShown] = React.useState(false)

  function handleClick() {
    setIsShown(!isShown)
  }
  
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
          return <div className={styles.statusSeverityContainer} key={line.name}>
            {/* if Line is running with good service [status 10] or is shut for night [status 20] display no more info*/}
            {/* if Line is running with problems [any other status code] display caution icon and clickablemore details a element */}
            {status.statusSeverity === 10 || status.statusSeverity === 20 ? 
              <p className={styles.line_status}>{status.statusSeverityDescription}</p> : <p className={styles.line_status}>{status.statusSeverityDescription}<i onClick={handleClick} className="fa-solid fa-circle-info"></i></p>}
            {/* show reason for problem unless the line is closed [status 20] as the information is given in the h3 element */}
            {(isShown && status.statusSeverity !== 20) && <p>{status.reason}</p>}
          </div>
        })}
      </div> 
    }) : <p>loading data</p>
  )
}

export default Lines

//<i class="fa-solid fa-circle-info"></i>