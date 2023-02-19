import React, {useEffect, useState} from 'react'
import Home from './pages/home'
import { Routes, Route } from "react-router-dom";

function App(){

  return (
  <>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<p>Page Not Found</p>}></Route>
    </Routes>
  </>
  )
}

export default App