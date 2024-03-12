import React, { useState, useEffect } from 'react';
import '../styles/departamentos.css';
import '../styles/documentos.css';
import NovedadesLenguasExtranjeras from '../components/novedades/novedadesLenguasExtranjeras';

const LenguaExtranjera = () => {
    const [enlaces, setEnlaces] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/enlaces')
            .then(response => response.json())
            .then(data => setEnlaces(data))
            .catch(error => console.error('Error al obtener enlaces:', error));
    }, []);

    return (
        <div className='fondo'>
            <div className="container text-center pt-3">
                <div className="row py-2 color-titulo borde-departamento align-items-center">
                    <div className="col-3"><img src={process.env.PUBLIC_URL + '/images/extranjero.png'} className="img-fluid p-1" alt="Departamento" /></div>
                    <div className="col-9"><h2>Departamento de Lenguas Extranjeras</h2></div>
                </div>
                {enlaces.filter(enlace => enlace.departamento === 'extranjera').length > 0 && (
                    <div className="py-3">
                        <h3>Enlaces de interés:</h3>
                        <ul className='documentos-ul'>
                            {enlaces.filter(enlace => enlace.departamento === 'extranjera').map(enlace => (
                                <li key={enlace.id} className="documentos-li">
                                    <a href={enlace.enlace}>{enlace.nombre}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <NovedadesLenguasExtranjeras/>
        </div>
    );
};

export default LenguaExtranjera;