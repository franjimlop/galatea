import React from 'react';
import '../styles/centro.css';

const Centro = () => {
    return (
        <div>
            {/* Equipo Directivo */}
            <div className="container-fluid fondo">
                <h1 className="pt-5 text-center color-titulo">Equipo directivo</h1>
                <div className="row pb-5 justify-content-center align-items-center py-5 mx-auto">
                    {/* Directora */}
                    <div className="col-md-4 text-center text-md-end px-5 pb-3">
                        <img
                            src="images/directora.png"
                            style={{ maxHeight: '7rem' }}
                            className="img-fluid rounded-circle directora-imagen mb-3"
                            alt="Directora"
                        />
                    </div>
                    <div className="col-md-8 text-center text-md-start px-5 pb-3">
                        <h2 className="directora-nombre">Mª José Villarrubia Lázaro (Directora)</h2>
                    </div>

                    {/* Secretaria */}
                    <div className="col-md-4 text-center text-md-end px-5 pb-3">
                        <img
                            src="images/directora.png"
                            style={{ maxHeight: '7rem' }}
                            className="img-fluid rounded-circle directora-imagen mb-3"
                            alt="Secretaria"
                        />
                    </div>
                    <div className="col-md-8 text-center text-md-start px-5 pb-3">
                        <h2 className="directora-nombre">Ana de la Torre Molina (Secretaria)</h2>
                    </div>

                    {/* Jefe de estudios */}
                    <div className="col-md-4 text-center text-md-end px-5 pb-3">
                        <img
                            src="images/directora.png"
                            style={{ maxHeight: '7rem' }}
                            className="img-fluid rounded-circle directora-imagen mb-3"
                            alt="Jefe de estudios"
                        />
                    </div>
                    <div className="col-md-8 text-center text-md-start px-5 pb-3">
                        <h2 className="directora-nombre">Javier Muñoz Olmo (Jefe de estudios)</h2>
                    </div>

                    {/* Jefa de estudios adjunta */}
                    <div className="col-md-4 text-center text-md-end px-5 pb-3">
                        <img
                            src="images/directora.png"
                            style={{ maxHeight: '7rem' }}
                            className="img-fluid rounded-circle directora-imagen mb-3"
                            alt="Jefa de estudios adjunta"
                        />
                    </div>
                    <div className="col-md-8 text-center text-md-start px-5 pb-3">
                        <h2 className="directora-nombre">Aranzazu Dopico Puerto (Jefa de estudios adjunta)</h2>
                    </div>
                </div>
            </div>

            {/* Instalaciones */}
            <div className="text-center fondo">
                <hr />
                <div className="container">
                    <h1 className="pt-5 color-titulo">Instalaciones</h1>
                    <div className="texto-instalaciones py-5">
                        <p className="px-5 text-start mb-5">
                            El centro educativo cuenta con un total de X aulas, X laboratorios, una sala de música y diversas
                            instalaciones deportivas.
                            En estas instalaciones, el cuerpo docente ofrece sus asignaturas con un amplio conjunto de recursos
                            y el equipamiento más avanzado disponible,
                            garantizando así un entorno óptimo para la enseñanza
                        </p>
                        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="images/instituto.jpeg" className="img-fluid img-instalaciones" alt="Pistas Deportivas" />
                                    <p className="pt-3">Pistas Deportivas</p>
                                </div>
                                <div className="carousel-item">
                                    <img src="images/musica.jpg" className="img-fluid img-instalaciones" alt="Aula de música" />
                                    <p className="pt-3">Aula de música</p>
                                </div>
                                <div className="carousel-item">
                                    <img src="images/laboratorio.jpg" className="img-fluid img-instalaciones" alt="Laboratorio" />
                                    <p className="pt-3">Laboratorio</p>
                                </div>
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