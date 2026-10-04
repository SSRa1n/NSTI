import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { DataProvider } from "@/core/dataprovider";

import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css'

import Home from './pages/home/Home'
import Results from './pages/results/Results'
import Share from './pages/share/share'
import Potential from './pages/potential/Potential'


function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <HashRouter>
      <DataProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/share" element={<Share />} />
          <Route path="/potential" element={<Potential />} />
        </Routes>
      </DataProvider>
    </HashRouter>
  )
}

export default App
