import React, {Suspense} from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import {AnalyticsLoadable} from "./loadables/Analytics.jsx";
import {HomeLoadable} from "./loadables/Home.jsx";


const AppRoutes = () => {
  return (
      <Suspense fallback={null}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomeLoadable/>}/>
                  <Route path="/analytics" element={<AnalyticsLoadable/>}/>
              </Routes>
          </BrowserRouter>
      </Suspense>
  )
}

export default AppRoutes