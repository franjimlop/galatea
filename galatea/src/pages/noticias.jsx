import React from 'react';
import '../styles/noticias.css';
import Novedades from '../components/novedades/extraescolares';
import Paginacion from '../components/novedades/paginacion';

const Noticias = () => {
    return (
        <div>
        <Novedades/>
        <Paginacion/>
        </div>
    );
};

export default Noticias;