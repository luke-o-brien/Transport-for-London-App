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
    <div>
      <h2 className={styles.SUtitle}>Service Updates</h2>
      <div className={styles.menuList}>
        <a className={styles.menuListItem} onClick={handleClick}>TFL Lines</a>
        <a className={styles.menuListItem} onClick={handleClick}>River</a>
        <a className={styles.menuListItem} onClick={handleClick}>Bus</a>
      </div>
      {option === "TFL Lines" ? 
        <Lines /> : option === "River" ? <RiverLines /> : option === "Cable Car" ? <CableCar /> : option === "Bus" ? <Bus /> : <p> Please select an option above to view Service Status</p> }
    </div>
  );
}

export default ServiceUpdate