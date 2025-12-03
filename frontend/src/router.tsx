import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import PropertyFormPage from './pages/PropertyFormPage';
import Navbar from './components/Navbar';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/property/new" element={<PropertyFormPage />} />
        <Route path="/property/edit/:id" element={<PropertyFormPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;