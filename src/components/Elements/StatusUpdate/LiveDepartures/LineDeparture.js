import react from "react";
import { useLocation, Link } from "react-router-dom"

const LineDeparture = (props) => {

  const content = props
  console.log(content)
  const array = props["data"]
  const station = props["state"]
  console.log(station)
  console.log(array)
  console.dir(array)

  return <>
    <p>a</p>

  </>
}

export default LineDeparture