import React, { useState, useEffect } from 'react';
import '../styles/documentos.css';

const Calendario = () => {
    const [calendarios, setCalendarios] = useState([]);

    useEffect(() => {
        const obtenerCalendarios = async () => {
            try {
                const response = await fetch('https://51.124.190.137:5000/calendarios');
                if (response.ok) {
                    const data = await response.json();
                    setCalendarios(data);
                } else {
                    console.error('Error al obtener calendario');
                }
            } catch (error) {
                console.error('Error al obtener calendario:', error);
            }
        };
        obtenerCalendarios();
    }, []);
    
    return (
        <div className="fondo">
            <div className="container pb-3 text-center">
                {calendarios.map((calendario) => (
                    <div key={calendario.id}>
                        <h1 className="mb-0 py-5">{calendario.nombre}</h1>
                        <img src={`data:image;base64,${calendario.foto}`} className="img-fluid" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendario;