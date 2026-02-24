import React, {Suspense} from 'react'
import { Routes, Route } from 'react-router-dom';
import {AnalyticsLoadable} from "./loadables/Analytics.jsx";
import {HomeLoadable} from "./loadables/Home.jsx";


const AppRoutes = () => {
  return (
      <Suspense fallback={null}>
          <Routes>
              <Route path="/" element={<HomeLoadable/>}/>
              <Route path="/analytics" element={<AnalyticsLoadable/>}/>
          </Routes>
      </Suspense>
  )
}

export default AppRoutes