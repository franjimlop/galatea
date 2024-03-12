import React, { useState, useEffect } from 'react';
import './styles/index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import RoutesComponent from './routes';
import RoutesComponentPrivate from './routesPrivate';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import HeaderLogin from './components/header/headerLogin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App fondo">
      {isAuthenticated ? <HeaderLogin /> : <Header />}
      <Routes>
        {RoutesComponent()}
        {isAuthenticated && RoutesComponentPrivate()}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;