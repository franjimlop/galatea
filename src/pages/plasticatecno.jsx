import React from 'react';
import '../styles/departamentos.css';
import Paginacion from '../components/novedades/paginacion';
import Novedades from '../components/novedades/novedades';

const PlasticaTecnologia = () => {
    return (
        <div className='fondo'>
            <div className="container text-center pt-3">
                <div className="row py-2 color-titulo borde-departamento align-items-center">
                    <div className="col-3"><img src={process.env.PUBLIC_URL + '/images/plastica.png'} className="img-fluid p-1" alt="Departamento" /></div>
                    <div className="col-9"><h2>Departamento de Plástica y Tecnología</h2></div>
                </div>
                <div className="py-3">
                    <h3>Enlaces de interés:</h3>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <Novedades />
            <Paginacion />
        </div>
    );
};

export default PlasticaTecnologia;