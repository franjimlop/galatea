import React, { useState, useEffect } from 'react';
import '../styles/documentos.css';

const Becas = () => {
    const [becas, setBecas] = useState([]);

    useEffect(() => {
        fetch('https://51.124.190.137:5000/becas')
            .then(response => response.json())
            .then(data => setBecas(data))
            .catch(error => console.error('Error al obtener becas:', error));
    }, []);

    return (
        <div className="fondo">
            <div className="container pb-3">
                <h1 className="text-center mb-0 py-5">Becas</h1>
                <ul className="documentos-ul ms-3 mb-5">
                    {becas.map((beca) => (
                        <li key={beca.id} className="documentos-li">
                            <a href={beca.enlace}>{beca.nombre}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Becas;