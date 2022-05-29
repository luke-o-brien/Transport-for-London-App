// React Import
import React, { useState , useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useLocation } from "react-router-dom";

// Componant Imports
import Navbar from "./components/Elements/Navbar";

// Page Imports
import Home from "./components/Pages/Home";
import ServiceUpdate from "./components/Pages/ServiceUpdates";
import LiveDepartures from "./components/Pages/LiveDepartures";
import DeparturePage from "./components/Pages/DeparturePage";


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
        </Routes>
      </Router>
    </>
  );
}

export default App