import React, { useState, useEffect } from 'react';
import '../styles/centro.css';

const Centro = () => {
    const [equipoDirectivo, setEquipoDirectivo] = useState([]);
    const [instalaciones, setInstalaciones] = useState([]);

    useEffect(() => {
        // Lógica para obtener la lista de miembros del equipo directivo
        const obtenerEquipoDirectivo = async () => {
            try {
                const response = await fetch('http://localhost:5000/equipodirectivo');
                if (response.ok) {
                    const data = await response.json();
                    setEquipoDirectivo(data);
                } else {
                    console.error('Error al obtener la lista de miembros del equipo directivo');
                }
            } catch (error) {
                console.error('Error al obtener la lista de miembros del equipo directivo:', error);
            }
        };

        // Lógica para obtener la lista de instalaciones
        const obtenerInstalaciones = async () => {
            try {
                const response = await fetch('http://localhost:5000/instalaciones');
                if (response.ok) {
                    const data = await response.json();
                    setInstalaciones(data);
                } else {
                    console.error('Error al obtener la lista de instalaciones');
                }
            } catch (error) {
                console.error('Error al obtener la lista de instalaciones:', error);
            }
        };

        obtenerEquipoDirectivo();
        obtenerInstalaciones();
    }, []);

    return (
        <div>
            {/* Equipo Directivo */}
            <div className="container-fluid fondo">
                <h1 className="pt-5 text-center color-titulo">Equipo directivo</h1>
                <div className="row pb-5 justify-content-center align-items-center py-5 mx-auto">
                    {equipoDirectivo.map((miembro) => (
                        <React.Fragment key={miembro.id}>
                            <div className="col-md-4 text-center text-md-end px-5 pb-3">
                                <img
                                    src={`data:image/jpeg;base64,${miembro.foto}`}
                                    alt={miembro.nombre}
                                    className="directora-imagen"
                                />
                            </div>
                            <div className="col-md-8 text-center text-md-start px-5 pb-3">
                                <h2 className="directora-nombre">{miembro.nombre} ({miembro.puesto})</h2>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Instalaciones */}
            <div className="text-center fondo">
                <hr />
                <div className="container">
                    <h1 className="pt-5 color-titulo">Instalaciones</h1>
                    <div className="texto-instalaciones py-5">
                        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                            <div className="carousel-inner">
                                {instalaciones.map((instalacion, index) => (
                                    <div key={instalacion.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img
                                            src={`data:image/jpeg;base64,${instalacion.foto}`}
                                            className="img-fluid img-instalaciones"
                                            alt={instalacion.nombre}
                                        />
                                        <p className="pt-3">{instalacion.nombre}</p>
                                    </div>
                                ))}
                            </div>
                            <a className="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Anterior</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Siguiente</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Centro;