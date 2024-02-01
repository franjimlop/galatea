import React from 'react';
import '../styles/noticias.css';
import ExtraescolaresComponent from '../components/novedades/extraescolares';
import Paginacion from '../components/novedades/paginacion';

const Extraescolares = () => {
    return (
        <div>
        <ExtraescolaresComponent/>
        <Paginacion/>
        </div>
    );
};

export default Extraescolares;