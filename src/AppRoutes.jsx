import React, {Suspense} from 'react'
import { Routes, Route } from 'react-router-dom';
import {AnalyticsLoadable} from "./loadables/Analytics.jsx";
import {HomeLoadable} from "./loadables/Home.jsx";
import {SettingsLoadable} from "./loadables/Settings.jsx";


const AppRoutes = () => {
  return (
      <Suspense fallback={null}>
          <Routes>
              <Route path="/" element={<HomeLoadable/>}/>
              <Route path="/analytics" element={<AnalyticsLoadable/>}/>
              <Route path="/settings" element={<SettingsLoadable/>}/>
          </Routes>
      </Suspense>
  )
}

export default AppRoutes