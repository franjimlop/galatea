import React from 'react';
import '../styles/noticias.css';
import ComplementariasComponent from '../components/novedades/complementarias';
import Paginacion from '../components/novedades/paginacion';

const Complementarias = () => {
    return (
        <div>
        <ComplementariasComponent/>
        <Paginacion/>
        </div>
    );
};

export default Complementarias;