import React, { useState, useEffect } from 'react';
import './styles/index.css';
import Routes from './routes';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import HeaderLogin from './components/header/headerLogin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App fondo">
      {isAuthenticated ? <HeaderLogin /> : <HeaderLogin />}
      <Routes />
      <Footer />
    </div>
  );
}

export default App;