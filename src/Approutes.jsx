import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AnalysisLayout from './layouts/AnalysisLayout';

const Approutes = () => {
  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/analysis" element={<AnalysisLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Approutes