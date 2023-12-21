import React from 'react';
import '../styles/noticias.css';
import Novedades from '../components/novedades/novedades';
import Paginacion from '../components/novedades/paginacion';

const Complementarias = () => {
    return (
        <div>
        <h1 className="text-center mb-0 py-5 fondo">Actividades complementarias</h1>
        <Novedades/>
        <Paginacion/>
        </div>
    );
};

export default Complementarias;