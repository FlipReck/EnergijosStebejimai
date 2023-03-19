import React, {useEffect, useState} from 'react'
import Home from './pages/home'
import Data from './pages/data'
import GraphPage from './pages/graphPage'
import SensorForm from './pages/NewSensorEntry'
import { Routes, Route } from "react-router-dom";
import Accommondation from './pages/accommodation';
import AccommondationList from './pages/accommondationList';
import AccommondationForm from './pages/accommondationForm';

function App(){

  return (
  <>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/data" element={<Data />} />
      <Route exact path="/graph" element={<GraphPage />} />
      <Route exact path="/sensorForm" element={<SensorForm />} />
      <Route path="accommodation">
            <Route index element={<AccommondationList />} />
            <Route path=":id" element={<Accommondation />} />
            <Route path="new" element={<AccommondationForm />} />
          </Route>
      <Route path="*" element={<p>Page Not Found</p>}></Route>
    </Routes>
  </>
  )
}

export default App