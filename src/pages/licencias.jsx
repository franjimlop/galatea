import React, { useState, useEffect } from 'react';
import '../styles/documentos.css';

const Licencias = () => {
    const [licencias, setLicencias] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/licencias')
            .then(response => response.json())
            .then(data => setLicencias(data))
            .catch(error => console.error('Error al obtener licencias:', error));
    }, []);

    return (
        <div className="fondo">
            <div className="container pb-3">
                <h1 className="text-center mb-0 py-5">Licencias Digitales</h1>
                {licencias.map((licencia) => (
                    <p key={licencia.id} className="mb-3">{licencia.texto}</p>
                ))}
            </div>
        </div>
    );
};

export default Licencias;