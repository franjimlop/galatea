import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const [imagenes, setImagenes] = useState([]);
    const [indiceActivo, setIndiceActivo] = useState(0);

    useEffect(() => {
        const obtenerImagenes = async () => {
            try {
                const response = await fetch('https://51.124.190.137:5000/imagenes');
                if (response.ok) {
                    const data = await response.json();
                    setImagenes(data);
                } else {
                    console.error('Error al obtener la lista de imágenes');
                }
            } catch (error) {
                console.error('Error al obtener la lista de imágenes:', error);
            }
        };

        obtenerImagenes();
    }, []);

    const manejarCambioSlide = (indice) => {
        setIndiceActivo(indice);
    };

    return (
        <div className="text-center navega">
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
                <div className="carousel-inner">
                    {imagenes.map((imagen, index) => (
                        <div key={imagen.id} className={`carousel-item ${index === indiceActivo ? 'active' : ''}`}>
                            <img src={`data:image/jpeg;base64,${imagen.foto}`} className="img-fluid img-instalaciones" alt={imagen.nombre} />
                            <div className="carousel-caption">
                                <h1>¡Bienvenidos al IESO La Galatea!</h1>
                            </div>
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev" onClick={() => manejarCambioSlide((indiceActivo - 1 + imagenes.length) % imagenes.length)}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </a>
                <a className="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next" onClick={() => manejarCambioSlide((indiceActivo + 1) % imagenes.length)}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </a>
            </div>
        </div>
    );
};

export default Carousel;