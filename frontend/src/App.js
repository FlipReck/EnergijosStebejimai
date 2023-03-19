import React, {useEffect, useState} from 'react'
import Home from './pages/home'
import Data from './pages/data'
import GraphPage from './pages/graphPage'
import SensorForm from './pages/NewSensorEntry'
import DayForm from './pages/dayForm'
import TimeForm from './pages/timeForm'
import { Routes, Route } from "react-router-dom";

function App(){

  return (
  <>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/data" element={<Data />} />
      <Route exact path="/graph" element={<GraphPage />} />
      <Route exact path="/sensorForm" element={<SensorForm />} />
      <Route exact path="/dayForm" element={<DayForm />} />
      <Route exact path="/timeForm" element={<TimeForm />} />
      <Route path="*" element={<p>Page Not Found</p>}></Route>
    </Routes>
  </>
  )
}

export default App