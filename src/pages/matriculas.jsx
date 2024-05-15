import React, { useState, useEffect } from 'react';
import '../styles/documentos.css';

const Matriculas = () => {
    const [matriculas, setMatriculas] = useState([]);

    useEffect(() => {
        fetch('https://localhost:5000/matriculas')
            .then(response => response.json())
            .then(data => setMatriculas(data))
            .catch(error => console.error('Error al obtener matriculas:', error));
    }, []);

    return (
        <div className="fondo">
            <div className="container pb-3">
                <h1 className="text-center mb-0 py-5">Matrículas</h1>
                {matriculas.map((matricula) => (
                    <p key={matricula.id} className="mb-3">{matricula.texto}</p>
                ))}
            </div>
        </div>
    );
};

export default Matriculas;