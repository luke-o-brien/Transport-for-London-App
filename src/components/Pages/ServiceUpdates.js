import React from "react";
import Lines from "../Elements/StatusUpdate/Lines"
import RiverLines from "../Elements/StatusUpdate/RiverLines"
import CableCar from "../Elements/StatusUpdate/cableCar"
import Bus from "../Elements/StatusUpdate/Bus";
import styles from "./ServiceUpdate.module.css"

function ServiceUpdate() {

  const [option, setOption] = React.useState(undefined)

  function handleClick(e) {
    console.log("clicked")
    const optionText = e.target.innerHTML
    console.log(optionText)
    setOption(optionText)
}

  return (
    <>
      <h1>Service Updates</h1>
      <div className={styles.buttonContainer}>
        <ul className={styles.menuList}>
          <li className={styles.menuListItem} onClick={handleClick}>TFL Lines</li>
          <li className={styles.menuListItem} onClick={handleClick}>River</li>
          <li className={styles.menuListItem} onClick={handleClick}>Bus</li>
          <li className={styles.menuListItem} onClick={handleClick}>Cable Car</li>
          
          
        </ul>
      </div>
      {option === "TFL Lines" ? 
        <Lines /> : option === "River" ? <RiverLines /> : option === "Cable Car" ? <CableCar /> : option === "Bus" ? <Bus /> : <p> Please select an option above to view Service Status</p> }
    </>
  );
}

export default ServiceUpdate