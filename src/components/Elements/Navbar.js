import React from "react"
import { Link } from "react-router-dom"



function Navbar () {
  return (
    <header>
      <nav>
        <Link to="/">
          Home
        </Link>
        <Link to="/Live-Departures">
          Live Departures
        </Link>
        <Link to="/Service-updates">
          Service Updates
        </Link>
      </nav>
    </header>
  )
}

export default Navbar