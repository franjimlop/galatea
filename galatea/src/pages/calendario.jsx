import React from 'react';
import '../styles/documentos.css';

const Calendario = () => {
    return (
        <div className="fondo">
            <div className="container pb-3 text-center">
                <h1 className="mb-0 py-5">Calendario Escolar</h1>
                <img src={process.env.PUBLIC_URL + '/images/calendario.jpg'} className="img-fluid" alt="Calendario Escolar" />
                <h1 className="mb-0 py-5">Calendario Evaluaciones</h1>
                <ul className="text-start ms-3">
                    <li>Primer trimestre: 14 y 15 de diciembre</li>
                    <li>Segundo trimestre: 14 y 15 de marzo</li>
                    <li>Evaluación final: 14 y 15 de junio</li>
                </ul>
            </div>
        </div>
    );
};

export default Calendario;