import React from 'react';
import '../styles/noticias.css';
import Novedades from '../components/novedades/novedades';
import Paginacion from '../components/novedades/paginacion';

const Extraescolares = () => {
    return (
        <div>
        <h1 className="text-center mb-0 py-5 fondo">Actividades extraescolares</h1>
        <Novedades/>
        <Paginacion/>
        </div>
    );
};

export default Extraescolares;