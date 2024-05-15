import React, { useState, useEffect } from 'react';

const Proyectos = () => {
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        fetch('https://localhost:5000/proyectos')
            .then(response => response.json())
            .then(data => setProyectos(data))
            .catch(error => console.error('Error al obtener proyectos:', error));
    }, []);

    return (
        <div className="fondo">
            <div className="container pb-3">
                {proyectos.map((proyecto) => (
                    <div key={proyecto.id}>
                        <h1 className="text-center mb-0 py-5">{proyecto.titulo}</h1>
                        <p className="texto-consejo fs-5">{proyecto.texto}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Proyectos;