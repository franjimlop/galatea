import React, { useState, useEffect } from 'react';
import '../styles/documentos.css';

const Documentos = () => {
    const [documentos, setDocumentos] = useState([]);

    useEffect(() => {
        // Obtener los documentos desde el backend
        fetch('http://localhost:5000/documentos')
            .then(response => response.json())
            .then(data => setDocumentos(data))
            .catch(error => console.error('Error al obtener documentos:', error));
    }, []);

    return (
        <div className="fondo">
            <div className="container pb-3">
                <h1 className="text-center mb-0 py-5">Documentos</h1>
                <ul className="ms-3 mb-5 documentos-ul">
                    {documentos.map((documento) => (
                        <li key={documento.id} className="documentos-li">
                            <a href={`data:application/pdf;base64,${documento.archivo}`} download={documento.nombre}>{documento.nombre}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Documentos;