import React from 'react';
import './styles/index.css';
import Routes from './routes';
import Footer from './components/footer/footer';
import Header from './components/header/header';

function App() {
  return (
    <div className="App fondo">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;