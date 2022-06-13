// React Import
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Componant Imports
import Navbar from "./components/Elements/Navbar";

// Page Imports
import Home from "./components/Pages/Home";
import ServiceUpdate from "./components/Pages/ServiceUpdates";
import LiveDepartures from "./components/Pages/LiveDepartures";
import DeparturePage from "./components/Pages/DeparturePage";
import JourneyPlanner from "./components/Pages/JourneyPlanner";


function App() {
  return (
    <>
      <Router >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Live-Departures" element={<LiveDepartures />} />
          <Route path="/Live-Departures/:linename" element={<DeparturePage />} />
          <Route path="/Service-updates" element={<ServiceUpdate/>} />
          <Route path="/journey-planner" element={< JourneyPlanner />} />
        </Routes>
      </Router>
    </>
  );
}

export default App